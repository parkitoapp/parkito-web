import { createClient } from "@supabase/supabase-js";

// Server-side client with service role key (NEVER expose to client)
// export const supabaseServer = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY!,
//     {
//         auth: {
//             autoRefreshToken: false,
//             persistSession: false
//         }
//     }
// );

// Client-side client with anon key (safe for browser)
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
