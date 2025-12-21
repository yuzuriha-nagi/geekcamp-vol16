import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazily create a Supabase client.
 * Avoids throwing at module load if env vars are missing during build/prerender.
 */
export const getSupabaseClient = (): SupabaseClient => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error("Supabase env vars are not set");
  }

  return createClient(url, anon);
};
