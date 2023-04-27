import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ehhcsytillchabpazfsd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaGNzeXRpbGxjaGFicGF6ZnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2MTQzMzUsImV4cCI6MTk5ODE5MDMzNX0._3x9AQvw02QrMEgRXrFlCAev7143b-EnTmU6KIALAow"
);

export { supabase };
