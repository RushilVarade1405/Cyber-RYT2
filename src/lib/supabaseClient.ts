import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────
//  SETUP INSTRUCTIONS
//  1. Go to https://supabase.com → Create a new project
//  2. Run this SQL in Supabase → SQL Editor:
//
//  create table visitor_logs (
//    id            bigserial primary key,
//    session_id    text,
//    ip            text,
//    page          text,
//    timestamp     timestamptz default now(),
//    country       text,
//    country_name  text,
//    country_flag  text,
//    city          text,
//    region        text,
//    isp           text,
//    timezone      text,
//    lat           float,
//    lon           float,
//    browser       text,
//    os            text,
//    device_type   text,
//    referrer      text,
//    entry_page    text,
//    user_agent    text
//  );
//  alter table visitor_logs enable row level security;
//  create policy "allow insert" on visitor_logs for insert to anon with check (true);
//  create policy "allow select" on visitor_logs for select to anon using (true);
//
//  3. Create .env.local in your project root with:
//     REACT_APP_SUPABASE_URL=https://xxxx.supabase.co
//     REACT_APP_SUPABASE_ANON=your-anon-key
//
//  4. Restart dev server: npm start
// ─────────────────────────────────────────────────────────

const SUPABASE_URL  = process.env.REACT_APP_SUPABASE_URL  ?? "https://irgahzzrrwtozoqrpbsu.supabase.co";
const SUPABASE_ANON = process.env.REACT_APP_SUPABASE_ANON ?? "sb_publishable_GmzFjJ0V9y0pBOp42mi-7Q_FGao3Vmw";

// Safe: only create client if both vars are present.
// App will still work without Supabase — visits just won't persist.
export const supabase: SupabaseClient | null =
  SUPABASE_URL && SUPABASE_ANON
    ? createClient(SUPABASE_URL, SUPABASE_ANON)
    : null;

export const isSupabaseReady = supabase !== null;