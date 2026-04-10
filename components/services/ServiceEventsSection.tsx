"use client";

import { useMemo, useState } from "react";
import type { ServiceEvent } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ServiceEventsSectionProps = {
  events: ServiceEvent[];
};

type MonthGroup = {
  /** "YYYY-MM" — stable sort key. */
  key: string;
  /** "Aprile 2026" capitalized label. */
  label: string;
  events: ServiceEvent[];
};

const MONTHS_PER_PAGE = 3;

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const monthFormatter = new Intl.DateTimeFormat("it-IT", {
  month: "long",
  year: "numeric",
});

function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Parse a "YYYY-MM-DD" string as a local date. Passing the string directly to
 * `new Date()` would interpret it as UTC midnight, which can shift the weekday
 * in negative-offset locales.
 */
function parseEventDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

function formatItalianDate(isoDate: string): string {
  return capitalize(dateFormatter.format(parseEventDate(isoDate)));
}

function formatItalianMonth(isoDate: string): string {
  return capitalize(monthFormatter.format(parseEventDate(isoDate)));
}

function groupEventsByMonth(events: ServiceEvent[]): MonthGroup[] {
  const groups = new Map<string, MonthGroup>();

  for (const event of events) {
    // Defensive: skip malformed rows rather than crashing the page.
    if (!event.eventDate || event.eventDate.length < 7) continue;
    const key = event.eventDate.slice(0, 7); // "YYYY-MM"

    let group = groups.get(key);
    if (!group) {
      group = {
        key,
        label: formatItalianMonth(event.eventDate),
        events: [],
      };
      groups.set(key, group);
    }
    group.events.push(event);
  }

  // Sort events within each month by date, then departure time.
  for (const group of groups.values()) {
    group.events.sort((a, b) => {
      if (a.eventDate !== b.eventDate) {
        return a.eventDate < b.eventDate ? -1 : 1;
      }
      const aTime = a.departureTime ?? "";
      const bTime = b.departureTime ?? "";
      if (aTime === bTime) return 0;
      return aTime < bTime ? -1 : 1;
    });
  }

  return Array.from(groups.values()).sort((a, b) =>
    a.key < b.key ? -1 : a.key > b.key ? 1 : 0,
  );
}

export default function ServiceEventsSection({
  events,
}: ServiceEventsSectionProps) {
  const months = useMemo(() => groupEventsByMonth(events), [events]);
  const totalPages = Math.max(1, Math.ceil(months.length / MONTHS_PER_PAGE));
  const [page, setPage] = useState(1);

  // Clamp page if the events prop shrinks on re-render.
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * MONTHS_PER_PAGE;
  const visibleMonths = months.slice(start, start + MONTHS_PER_PAGE);

  if (months.length === 0) {
    return (
      <p className="mt-8 text-center text-lg italic text-primary dark:text-accent">
        Nessun evento in programma al momento.
      </p>
    );
  }

  const goToPage = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
  };

  return (
    <div className="flex flex-col gap-10 px-4 md:px-8 py-12">
      <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
        {visibleMonths.map((group) => (
          <section
            key={group.key}
            className="rounded-2xl bg-primary text-accent shadow-xl p-6 md:p-10"
            aria-label={group.label}
          >
            <h4 className="text-3xl md:text-4xl font-bold mb-6 capitalize">
              {group.label}
            </h4>
            <Table className="rounded-lg dark:bg-chart-5 ">
              <TableBody>
                {group.events.map((event) => {
                  const hasLink = Boolean(event.stripePaymentLink);
                  return (
                    <TableRow
                      key={event.id}
                      className="text-primary dark:text-white"
                    >
                      <TableCell className="font-semibold text-base md:text-lg py-4 border-none align-top">
                        {formatItalianDate(event.eventDate)}
                      </TableCell>
                      <TableCell className="text-base md:text-lg py-4 !whitespace-normal break-words align-top">
                        {hasLink ? (
                          <Link
                            href={event.stripePaymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-offset-4 underline focus-visible:underline"
                          >
                            {event.title}
                          </Link>
                        ) : (
                          <span>{event.title}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-base md:text-lg py-4 !whitespace-normal break-words align-top">
                        {event.destination}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </section>
        ))}
      </div>

      {totalPages > 1 ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled={safePage === 1}
                className={cn(
                  safePage === 1 && "pointer-events-none opacity-50",
                )}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(safePage - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
              // Compact pagination: show first, last, current, and neighbours.
              const isEdge = n === 1 || n === totalPages;
              const isNear = Math.abs(n - safePage) <= 1;
              if (!isEdge && !isNear) {
                if (n === 2 || n === totalPages - 1) {
                  return (
                    <PaginationItem key={`ellipsis-${n}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              }
              return (
                <PaginationItem key={n}>
                  <PaginationLink
                    href="#"
                    isActive={n === safePage}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(n);
                    }}
                  >
                    {n}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                aria-disabled={safePage === totalPages}
                className={cn(
                  safePage === totalPages && "pointer-events-none opacity-50",
                )}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(safePage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
}
