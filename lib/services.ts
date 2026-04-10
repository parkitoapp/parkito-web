import "server-only";

import { cache } from "react";
import { supabaseServer } from "@/lib/supabaseServer";
import { slugify } from "@/lib/slugify";
import { enforceRateLimit } from "@/lib/rate-limit";
import {
  ServiceType,
  ServiceDetailData,
  ServiceEvent,
  ServiceEventTimeslot,
} from "@/types";

const CITY_IMAGE_BUCKET = "website";

/**
 * Build the public URL for a city hero image in the "website" bucket.
 * Naming convention: slugified city name + ".webp" (e.g. "Torino" → "torino.webp").
 *
 * This does NOT verify the file exists — Supabase's `getPublicUrl` is a pure
 * URL constructor with no network call. If the file is missing the URL will
 * 404 at load time, so the UI must handle `onError` fallback. We skip the
 * existence-check (`storage.list`) on purpose: it would cost a full bucket
 * listing per request, and we removed caching.
 */
function buildCityImageUrl(city: string): string {
  const citySlug = slugify(city);
  const { data } = supabaseServer.storage
    .from(CITY_IMAGE_BUCKET)
    .getPublicUrl(`${citySlug}.webp`);
  return data.publicUrl;
}

const FALLBACK_IMAGE = "/homePic.webp";

type SrvServiceRow = {
  id: string;
  slug: string;
  type: string;
  city: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  cover_image: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type SrvImageRow = {
  id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
};

type SrvFaqRow = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

type SrvShuttleRow = {
  frequency_minutes: number | null;
  operating_start: string;
  operating_end: string;
  operating_days: string | null;
};

type SrvCarwashRow = {
  address: string;
  latitude: number | null;
  longitude: number | null;
  operating_start: string;
  operating_end: string;
  operating_days: string | null;
  accepts_booking: boolean;
};

type SrvEventRow = {
  id: string;
  title: string;
  destination: string;
  event_date: string;
  departure_time: string;
  return_time: string | null;
  departure_address: string;
  arrival_address: string;
  frequency_minutes: number | null;
  min_persons: number;
  max_persons: number;
  price_cents: number;
  stripe_payment_link: string;
  spots_available: number | null;
  sort_order: number;
};

type SrvTimeslotRow = {
  id: string;
  event_id: string;
  departure_time: string;
  spots_available: number | null;
};

export async function getServices(): Promise<ServiceType[]> {
  // SECURITY: rate-limit per client IP to protect the public /servizi route
  // from abuse. 30 requests/minute per IP is generous for a browsing page.
  await enforceRateLimit("services", { limit: 30, windowMs: 60_000 });

  const { data, error } = await supabaseServer
    .from("srv_services")
    .select(
      "id, slug, type, city, title, subtitle, description, cover_image, is_active, sort_order"
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Error fetching srv_services: ${error.message}`);
  }

  const rows = (data ?? []) as SrvServiceRow[];

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    type: row.type,
    city: row.city,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    image: row.cover_image || FALLBACK_IMAGE,
    fallbackImage: FALLBACK_IMAGE,
    url: `/servizi/${row.slug}`,
  }));
}

/**
 * Fetch the full detail payload for a single service by slug.
 *
 * Returns `null` if the slug doesn't match any active service.
 *
 * SECURITY:
 *  - Rate-limited per client IP.
 *  - `srv_reservations` (customer PII: email, phone, plate) is intentionally
 *    NEVER queried here. It's protected by a `service_role`-only RLS policy.
 *
 * Wrapped in React `cache()` so `generateMetadata` and the page render share
 * one result within a single request (equivalent to request-scoped memoization
 * — does NOT persist across requests).
 */
export const getService = cache(
  async (slug: string): Promise<ServiceDetailData | null> => {
    await enforceRateLimit("service-detail", { limit: 120, windowMs: 60_000 });

    const { data: svc, error: svcErr } = await supabaseServer
      .from("srv_services")
      .select(
        "id, slug, type, city, title, subtitle, description, cover_image, is_active, sort_order, created_at, updated_at"
      )
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle<SrvServiceRow>();

    if (svcErr) {
      throw new Error(`Error fetching srv_services: ${svcErr.message}`);
    }
    if (!svc) return null;

    // Parallel fetch all related data — one row lookup per join table.
    const [imagesRes, faqsRes, shuttleRes, carwashRes, eventsRes] =
      await Promise.all([
        supabaseServer
          .from("srv_images")
          .select("id, url, alt_text, sort_order")
          .eq("service_id", svc.id)
          .order("sort_order", { ascending: true }),
        supabaseServer
          .from("srv_faqs")
          .select("id, question, answer, sort_order")
          .eq("service_id", svc.id)
          .order("sort_order", { ascending: true }),
        supabaseServer
          .from("srv_shuttle_details")
          .select(
            "frequency_minutes, operating_start, operating_end, operating_days"
          )
          .eq("service_id", svc.id)
          .maybeSingle<SrvShuttleRow>(),
        supabaseServer
          .from("srv_carwash_details")
          .select(
            "address, latitude, longitude, operating_start, operating_end, operating_days, accepts_booking"
          )
          .eq("service_id", svc.id)
          .maybeSingle<SrvCarwashRow>(),
        supabaseServer
          .from("srv_events")
          .select(
            "id, title, destination, event_date, departure_time, return_time, departure_address, arrival_address, frequency_minutes, min_persons, max_persons, price_cents, stripe_payment_link, spots_available, sort_order"
          )
          .eq("service_id", svc.id)
          .eq("is_active", true)
          .order("event_date", { ascending: true })
          .order("sort_order", { ascending: true }),
      ]);

    const errs = [
      imagesRes.error,
      faqsRes.error,
      shuttleRes.error,
      carwashRes.error,
      eventsRes.error,
    ].filter((e): e is NonNullable<typeof e> => Boolean(e));
    if (errs.length > 0) {
      throw new Error(
        `Error fetching service details: ${errs.map((e) => e.message).join("; ")}`
      );
    }

    const eventRows = (eventsRes.data ?? []) as SrvEventRow[];

    // Batch-fetch all timeslots for all events in one query, then group by event.
    const timeslotsByEvent = new Map<string, ServiceEventTimeslot[]>();
    if (eventRows.length > 0) {
      const eventIds = eventRows.map((e) => e.id);
      const { data: tsData, error: tsErr } = await supabaseServer
        .from("srv_event_timeslots")
        .select("id, event_id, departure_time, spots_available")
        .in("event_id", eventIds)
        .order("departure_time", { ascending: true });

      if (tsErr) {
        throw new Error(`Error fetching srv_event_timeslots: ${tsErr.message}`);
      }

      for (const ts of (tsData ?? []) as SrvTimeslotRow[]) {
        const list = timeslotsByEvent.get(ts.event_id) ?? [];
        list.push({
          id: ts.id,
          departureTime: ts.departure_time,
          spotsAvailable: ts.spots_available,
        });
        timeslotsByEvent.set(ts.event_id, list);
      }
    }

    const events: ServiceEvent[] = eventRows.map((e) => ({
      id: e.id,
      title: e.title,
      destination: e.destination,
      eventDate: e.event_date,
      departureTime: e.departure_time,
      returnTime: e.return_time,
      departureAddress: e.departure_address,
      arrivalAddress: e.arrival_address,
      frequencyMinutes: e.frequency_minutes,
      minPersons: e.min_persons,
      maxPersons: e.max_persons,
      priceCents: e.price_cents,
      stripePaymentLink: e.stripe_payment_link,
      spotsAvailable: e.spots_available,
      sortOrder: e.sort_order,
      timeslots: timeslotsByEvent.get(e.id) ?? [],
    }));

    return {
      id: svc.id,
      slug: svc.slug,
      type: svc.type,
      city: svc.city,
      title: svc.title,
      subtitle: svc.subtitle,
      description: svc.description,
      coverImage: svc.cover_image,
      sortOrder: svc.sort_order,
      createdAt: svc.created_at,
      updatedAt: svc.updated_at,
      cityImage: buildCityImageUrl(svc.city),
      images: ((imagesRes.data ?? []) as SrvImageRow[]).map((i) => ({
        id: i.id,
        url: i.url,
        altText: i.alt_text,
        sortOrder: i.sort_order,
      })),
      faqs: ((faqsRes.data ?? []) as SrvFaqRow[]).map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
        sortOrder: f.sort_order,
      })),
      shuttleDetails: shuttleRes.data
        ? {
          frequencyMinutes: shuttleRes.data.frequency_minutes,
          operatingStart: shuttleRes.data.operating_start,
          operatingEnd: shuttleRes.data.operating_end,
          operatingDays: shuttleRes.data.operating_days,
        }
        : null,
      carwashDetails: carwashRes.data
        ? {
          address: carwashRes.data.address,
          latitude: carwashRes.data.latitude,
          longitude: carwashRes.data.longitude,
          operatingStart: carwashRes.data.operating_start,
          operatingEnd: carwashRes.data.operating_end,
          operatingDays: carwashRes.data.operating_days,
          acceptsBooking: carwashRes.data.accepts_booking,
        }
        : null,
      events,
    };
  }
);
