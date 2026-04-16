import type { ConfirmationData } from "@/lib/api/confirmBooking";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TicketRow } from "./TicketRow";

const BRAND = "oklch(0.2904 0.1476 267.0961)";
const BRAND_ALT = "oklch(0.4816 0.2581 265.7097)";

export function TicketCard({ data }: { data: ConfirmationData }) {
  const formattedDate = data.event_date
    ? new Date(data.event_date).toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : data.event_date;

  return (
    <Card
      className="overflow-hidden shadow-2xl rounded-2xl animate-[fadeInUp_0.55s_0.1s_ease_both] border-none dark:border-none"
      style={{ animationFillMode: "both" }}
    >
      {/* Header */}
      <CardHeader className="px-6 py-5 rounded-none" style={{ background: BRAND }}>
        <CardDescription className="text-xs font-bold uppercase tracking-widest text-lime-300/80">
          Shuttle · {data.destination}
        </CardDescription>
        <CardTitle className="text-white font-bold text-lg leading-tight">
          {data.event_title}
        </CardTitle>
        <CardAction>
          <span className="text-3xl" aria-hidden>🚌</span>
        </CardAction>
      </CardHeader>

      {/* Tear-line */}
      <div className="relative flex items-center bg-card">
        <div className="absolute -left-3 size-6 border rounded-full" style={{ background: "var(--background)" }} />
        <Separator className="flex-1 mx-4 border-dashed" />
        <div className="absolute border -right-3 size-6 rounded-full" style={{ background: "var(--background)" }} />
      </div>

      {/* Body */}
      <CardContent className="px-6 py-6 flex flex-col gap-5">
        <TicketRow icon="📅" label="Data evento" value={formattedDate} capitalize />

        {/* Route */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Percorso
          </p>
          <div className="flex flex-col gap-1 pl-1">
            <div className="flex items-start gap-2">
              <span className="text-lime-500 mt-0.5 text-lg leading-none">●</span>
              <p className="text-sm text-card-foreground leading-snug">{data.departure_address}</p>
            </div>
            <div className="ml-[11px] w-px h-4 bg-border" />
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-lg leading-none" style={{ color: BRAND_ALT }}>■</span>
              <p className="text-sm text-card-foreground leading-snug">{data.arrival_address}</p>
            </div>
          </div>
        </div>

        {/* Persons + plate */}
        <div className="grid grid-cols-2 gap-4">
          <TicketRow icon="👥" label="Passeggeri" value={String(data.persons)} />
          <TicketRow icon="🚗" label="Targa" value={data.plate.toUpperCase()} />
        </div>

        {/* Reservation ID */}
        <div className="rounded-lg px-4 py-3 flex items-center justify-between bg-muted/50">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            N° prenotazione
          </p>
          <p className="text-xs font-mono font-bold text-primary dark:text-accent">
            #{data.reservation_id}
          </p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-6 py-4 justify-center rounded-none" style={{ background: BRAND }}>
        <p className="text-xs text-white/70 leading-relaxed text-center">
          Riceverai un&apos;email con il riepilogo della tua prenotazione.
          <br />
          Tieni il documento d&apos;identità con te il giorno dell&apos;evento.
        </p>
      </CardFooter>
    </Card>
  );
}
