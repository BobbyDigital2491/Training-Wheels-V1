import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://zszleipyxmxmhjomwqtk.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzemxlaXB5eG14bWhqb213cXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1ODI3NzgsImV4cCI6MjAyMjE1ODc3OH0.6iGFrzFFXB9T-v7jQIPvpTW1-8Wf7ceCJ5eKGgakbMA";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
