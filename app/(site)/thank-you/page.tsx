import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { confirmBooking } from "@/lib/api/confirmBooking";
import { SuccessBadge } from "@/components/thank-you/SuccessBadge";
import { TicketCard } from "@/components/thank-you/TicketCard";

export const metadata: Metadata = {
  title: "Prenotazione Confermata · Parkito Shuttle",
  description: "La tua prenotazione shuttle è stata confermata con successo.",
};

type SearchParams = Promise<{ session_id?: string }>;

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id: sessionId } = await searchParams;
  if (!sessionId) notFound();

  let data;
  try {
    data = await confirmBooking(sessionId);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-4">
        <h1 className="text-2xl font-bold text-destructive">Errore nella conferma</h1>
        <pre className="text-xs bg-muted p-4 rounded max-w-lg w-full overflow-auto">{message}</pre>
        <p className="text-sm text-muted-foreground">session_id: {sessionId}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, oklch(0.4802 0.2 265) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <SuccessBadge name={data.customer_name} />
        <TicketCard data={data} />

        <Button
          asChild
          className="mt-8 flex justify-center animate-[fadeInUp_0.6s_0.25s_ease_both] mx-auto w-full"
          style={{ animationFillMode: "both" }}
        >
          <Link
            href="https://lavender-monkey-236324.hostingersite.com"
            className="inline-flex gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95 items-center"
            style={{ background: "oklch(0.2904 0.1476 267.0961)", color: "white" }}
          >
            Scegli le navette 🚌
          </Link>
        </Button>
      </div>
    </main>
  );
}
