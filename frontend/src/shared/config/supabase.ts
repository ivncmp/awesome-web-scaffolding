import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Edge Functions URL
// In development: direct to local router (no /functions/v1 path)
// In production: Supabase adds /functions/v1 automatically
const isDevelopment = import.meta.env.DEV;
export const EDGE_FUNCTION_URL = isDevelopment
  ? import.meta.env.VITE_SUPABASE_URL || 'http://localhost:8000'
  : `${supabaseUrl}/functions/v1`;
