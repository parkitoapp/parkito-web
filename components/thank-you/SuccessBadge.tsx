"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function SuccessBadge({ name }: { name: string }) {
  useEffect(() => {
    toast.success("Prenotazione confermata!", {
      description: "Controlla la tua email per i dettagli.",
    });
  }, []);

  return (
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
        Grazie, {name}!
      </h1>
    </div>
  );
}
