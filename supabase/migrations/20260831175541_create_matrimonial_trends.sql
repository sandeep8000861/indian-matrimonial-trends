/*
# Create matrimonial_trends table

1. New Tables
- `matrimonial_trends`
  - `id` (bigserial, primary key, auto-increment)
  - `query_text` (text, not null) — the trending search query or thread title
  - `category` (text, not null) — one of the standard dashboard categories
  - `baseline_volume` (integer, default 0) — estimated search volume
  - `trend_percentage` (integer, default 0) — percentage change / momentum
  - `region` (text) — Indian region label
  - `status_badge` (text) — "Active" or "Recent Spike"
  - `source_platform` (text, not null) — "google_trends" | "reddit" | "indian_kanoon"
  - `detected_at` (timestamptz, default now()) — when the trend was detected

2. Indexes
- GIN trigram index on `query_text` for fast substring / full-text search from the frontend search bar.
- B-tree index on `category` for fast category filtering.
- B-tree index on `source_platform` for source filtering.

3. Security
- Enable RLS on `matrimonial_trends`.
- This is a single-tenant, no-auth dashboard: the anon-key frontend must read and write.
- Four CRUD policies scoped `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)` because the data is intentionally public/shared.

4. Important Notes
- The `pg_trgm` extension is required for the trigram index; it is created if not already present.
- The table is safe to re-run (IF NOT EXISTS).
*/

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS matrimonial_trends (
  id bigserial PRIMARY KEY,
  query_text text NOT NULL,
  category text NOT NULL,
  baseline_volume integer NOT NULL DEFAULT 0,
  trend_percentage integer NOT NULL DEFAULT 0,
  region text,
  status_badge text,
  source_platform text NOT NULL,
  detected_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_matrimonial_trends_query_trgm
  ON matrimonial_trends USING gin (query_text gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_matrimonial_trends_category
  ON matrimonial_trends (category);

CREATE INDEX IF NOT EXISTS idx_matrimonial_trends_source
  ON matrimonial_trends (source_platform);

ALTER TABLE matrimonial_trends ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_trends" ON matrimonial_trends;
CREATE POLICY "anon_select_trends" ON matrimonial_trends FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_trends" ON matrimonial_trends;
CREATE POLICY "anon_insert_trends" ON matrimonial_trends FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_trends" ON matrimonial_trends;
CREATE POLICY "anon_update_trends" ON matrimonial_trends FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_trends" ON matrimonial_trends;
CREATE POLICY "anon_delete_trends" ON matrimonial_trends FOR DELETE
  TO anon, authenticated USING (true);
