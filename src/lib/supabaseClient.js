import { createClient } from "@supabase/supabase-js";
// import dotenv from "dotenv";

// dotenv.config();

// import { SUPABASE_KEY, SUPABASE_URL } from "./env.js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
