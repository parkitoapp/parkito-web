import type { ServiceDetailData } from "@/types";
import Image from "next/image";
import ServiceBanner from "@/components/services/ServiceBanner";
import HomeCards from "@/components/HomeCards";
import ServiceEventsSection from "@/components/services/ServiceEventsSection";
import { shuttleCards } from "@/data/homeCards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ServiceFaq from "./ServiceFaq";

/**
 * Server component — receives the full payload for a service detail page.
 *
 * Available on `service`:
 *  - Core:           id, slug, type, city, title, subtitle, description,
 *                    coverImage, sortOrder, createdAt, updatedAt
 *  - City image:     cityImage — public URL for the city hero from the
 *                    "website" Supabase bucket (`${slugify(city)}.webp`).
 *                    Used inline below as the fixed full-page background.
 *  - Gallery:        images[] { id, url, altText, sortOrder }
 *  - FAQs:           faqs[]   { id, question, answer, sortOrder }
 *  - Shuttle type:   shuttleDetails | null
 *                      { frequencyMinutes, operatingStart, operatingEnd, operatingDays }
 *  - Carwash type:   carwashDetails | null
 *                      { address, latitude, longitude, operatingStart, operatingEnd,
 *                        operatingDays, acceptsBooking }
 *  - Events:         events[] { id, title, destination, eventDate, departureTime,
 *                               returnTime, departureAddress, arrivalAddress,
 *                               frequencyMinutes, minPersons, maxPersons,
 *                               priceCents, stripePaymentLink, spotsAvailable,
 *                               sortOrder, timeslots[] }
 *
 * Keep this file a Server Component. Anything that needs browser state
 * (booking forms, gallery carousels, maps) should be extracted into a child
 * `"use client"` component and receive the data it needs via props.
 */
export default function ServiceDetail({
  service,
}: {
  service: ServiceDetailData;
}) {
  return (
    // `isolate` creates a new stacking context so the fixed background's
    // `-z-10` is clamped to THIS subtree. The whole ServiceDetail then
    // composites as a single z-auto layer in the root layout, which means
    // siblings that come after it in the DOM (the Footer) paint on top —
    // bg, text and all — as requested.
    <div className="relative isolate min-h-screen overflow-x-clip">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src={service.cityImage}
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative z-10">
        <ServiceBanner
          city={service.city}
          start_address={service.events[0]?.departureAddress ?? ""}
          image={service.coverImage ?? ""}
          service_name={service.title}
          className=""
        />
        <div className="bg-transparent flex flex-col py-16 w-full">
          <div className="flex items-center justify-center w-[90%] md:w-[80%] mx-auto bg-background rounded-lg flex-col p-6 gap-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl text-center text-primary dark:text-accent break-words">Lo sappiamo, trovare parcheggio a <span className="text-lime-400 dark:text-lime-200">{service.city}</span> è quasi impossibile. </h3>
            <p className="text-xl sm:text-2xl md:text-3xl italic text-primary dark:text-accent text-center break-words">Per questo abbiamo creato il servizio <span className="text-lime-400 dark:text-lime-200 font-bold">Parcheggio + Navetta!</span></p>
          </div>
        </div>
        <div className="bg-primary flex flex-col w-full p-6 md:p-8 gap-16">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold w-full text-center text-accent break-words">Come funziona?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-10">
            <HomeCards cards={shuttleCards} />
          </div>

          <Button variant={"outline"} size="lg" className="uppercase mx-auto dark:bg-accent dark:text-accent-foreground hover:scale-110 transition-all duration-300" asChild>
            <Link href={"#events"}> Scopri il servizio</Link>
          </Button>
        </div>
        <div id="events" className="py-16 bg-background">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold w-full text-center text-primary dark:text-accent break-words px-4">Prossimi eventi</h3>
          <ServiceEventsSection events={service.events} />
        </div>
        <ServiceFaq faqs={service.faqs} />
      </div>
    </div>
  );
}
