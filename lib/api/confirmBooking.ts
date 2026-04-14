export interface ConfirmationData {
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

export async function confirmBooking(sessionId: string): Promise<ConfirmationData> {
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
    const body = await res.text().catch(() => "");
    throw new Error(`confirm-booking failed (${res.status}): ${body}`);
  }

  return res.json();
}
