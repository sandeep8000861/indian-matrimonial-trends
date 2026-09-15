/*
# Create report_leads table for email capture lead generation

1. New Tables
- `report_leads`
  - `id` (uuid, primary key)
  - `full_name` (text, not null) — user's full name from the capture form
  - `email` (text, not null) — user's email address for lead follow-up
  - `opt_in_alerts` (boolean, default false) — whether user consented to daily legal trend alerts
  - `calculator_state` (jsonb, nullable) — snapshot of calculator selections at time of download
  - `advocate_case_type` (text, nullable) — which advocate screening case type was selected
  - `created_at` (timestamptz, default now()) — when the lead was captured

2. Security
- Enable RLS on `report_leads`.
- Allow anon + authenticated INSERT only (the frontend captures leads without sign-in).
- No SELECT/UPDATE/DELETE from the anon key — leads are private admin data.

3. Notes
- This is a single-tenant app with no sign-in screen, so the anon key must be able to insert.
- SELECT is intentionally NOT granted to anon — only service role can read leads.
- An index on email allows deduplication queries.
*/

CREATE TABLE IF NOT EXISTS report_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  opt_in_alerts boolean NOT NULL DEFAULT false,
  calculator_state jsonb,
  advocate_case_type text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE report_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_report_leads" ON report_leads;
CREATE POLICY "anon_insert_report_leads" ON report_leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_report_leads_email ON report_leads (email);
CREATE INDEX IF NOT EXISTS idx_report_leads_created_at ON report_leads (created_at DESC);
