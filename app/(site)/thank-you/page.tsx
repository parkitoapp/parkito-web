import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prenotazione Confermata · Parkito Shuttle",
  description: "La tua prenotazione shuttle è stata confermata con successo.",
};

type SearchParams = Promise<{ session_id?: string }>;

interface ConfirmationData {
  success: boolean;
  reservation_id: string;
  customer_name: string;
  customer_surname: string;
  persons: number;
  plate: string;
  event_title: string;
  event_date: string;
  destination: string;
  departure_address: string;
  arrival_address: string;
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id: sessionId } = await searchParams;
  if (!sessionId) notFound();

  const res = await fetch(
    "https://gmwxdoeshvhraelxtmks.supabase.co/functions/v1/srv-confirm-booking",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    let errBody = "";
    try { errBody = await res.text(); } catch { /* ignore */ }
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-4">
        <h1 className="text-2xl font-bold text-destructive">Errore nella conferma</h1>
        <p className="text-muted-foreground">Status: {res.status}</p>
        <pre className="text-xs bg-muted p-4 rounded max-w-lg w-full overflow-auto">{errBody}</pre>
        <p className="text-sm text-muted-foreground">session_id: {sessionId}</p>
      </main>
    );
  }
  const data: ConfirmationData = await res.json();

  const formattedDate = data.event_date
    ? new Date(data.event_date).toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : data.event_date;

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.4802 0.2 265) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Success badge */}
        <div className="flex flex-col items-center mb-8 animate-[fadeInDown_0.5s_ease_both]">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-xl"
            style={{ background: "oklch(0.2904 0.1476 267.0961)" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-lime-300"
              style={{
                strokeDasharray: 30,
                strokeDashoffset: 0,
                animation: "checkDraw 0.4s 0.3s ease both",
              }}
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Pagamento ricevuto
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-accent mt-1 text-center capitalize">
            Grazie, {data.customer_name}!
          </h1>
        </div>

        {/* Ticket card */}
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border border-border animate-[fadeInUp_0.55s_0.1s_ease_both]"
          style={{ animationFillMode: "both" }}
        >
          {/* Card header */}
          <div
            className="px-6 py-5 flex items-center justify-between"
            style={{ background: "oklch(0.2904 0.1476 267.0961)" }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-lime-300/80">
                Shuttle · {data.destination}
              </p>
              <p className="text-white font-bold text-lg leading-tight mt-0.5">
                {data.event_title}
              </p>
            </div>
            <span className="text-3xl" aria-hidden>
              🚌
            </span>
          </div>

          {/* Tear-line */}
          <div className="relative flex items-center bg-card">
            <div
              className="absolute -left-3 w-6 h-6 rounded-full"
              style={{ background: "var(--background)" }}
            />
            <div className="flex-1 border-t-2 border-dashed border-border mx-4" />
            <div
              className="absolute -right-3 w-6 h-6 rounded-full"
              style={{ background: "var(--background)" }}
            />
          </div>

          {/* Card body */}
          <div className="bg-card px-6 py-6 space-y-5">
            {/* Date */}
            <Row
              icon="📅"
              label="Data evento"
              value={formattedDate}
              capitalize
            />

            {/* Route */}
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Percorso
              </p>
              <div className="flex flex-col gap-1 pl-1">
                <div className="flex items-start gap-2">
                  <span className="text-lime-500 mt-0.5 text-lg leading-none">
                    ●
                  </span>
                  <p className="text-sm text-card-foreground leading-snug">
                    {data.departure_address}
                  </p>
                </div>
                <div className="ml-[11px] w-px h-4 bg-border" />
                <div className="flex items-start gap-2">
                  <span
                    className="mt-0.5 text-lg leading-none"
                    style={{ color: "oklch(0.4816 0.2581 265.7097)" }}
                  >
                    ■
                  </span>
                  <p className="text-sm text-card-foreground leading-snug">
                    {data.arrival_address}
                  </p>
                </div>
              </div>
            </div>

            {/* Persons + plate */}
            <div className="grid grid-cols-2 gap-4">
              <Row icon="👥" label="Passeggeri" value={String(data.persons)} />
              <Row icon="🚗" label="Targa" value={data.plate.toUpperCase()} />
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
          </div>

          {/* Footer note */}
          <div
            className="px-6 py-4 text-center"
            style={{ background: "oklch(0.2904 0.1476 267.0961)" }}
          >
            <p className="text-xs text-white/70 leading-relaxed">
              Riceverai un&apos;email per scegliere l&apos;orario di partenza.
              <br />
              Tieni il documento d&apos;identità con te il giorno dell&apos;evento.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center animate-[fadeInUp_0.6s_0.25s_ease_both]" style={{ animationFillMode: "both" }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              background: "oklch(0.2904 0.1476 267.0961)",
              color: "white",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Torna alla home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 30; opacity: 0; }
          to   { stroke-dashoffset: 0;  opacity: 1; }
        }
      `}</style>
    </main>
  );
}

function Row({
  icon,
  label,
  value,
  capitalize,
}: {
  icon: string;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5 flex flex-row items-center">
        {icon} {label}
      </p>
      <p
        className={`text-sm font-medium text-card-foreground ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
