import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export type SourcePlatform = 'google_trends' | 'reddit' | 'indian_kanoon';

export interface MatrimonialTrendRow {
  id: number;
  query_text: string;
  category: string;
  baseline_volume: number;
  trend_percentage: number;
  region: string | null;
  status_badge: string | null;
  source_platform: SourcePlatform;
  detected_at: string;
}
