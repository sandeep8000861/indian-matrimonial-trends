import { useState } from 'react';
import { X, Database, Copy, Check, Clock, Terminal, AlertCircle } from 'lucide-react';

interface DatabaseSetupPanelProps {
  open: boolean;
  onClose: () => void;
  dark: boolean;
}

const SQL_STEP_1 = `-- ==========================================
-- STEP 1: Enable Extensions & Create Function
-- ==========================================

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS net;

CREATE OR REPLACE FUNCTION auto_fetch_and_clean_trends()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rec RECORD;
  v_traffic integer;
  v_volume integer;
  v_region text;
  v_source text;
  v_status text;
  v_regions text[] := ARRAY[
    'Delhi Region','Maharashtra','Karnataka','Tamil Nadu','Uttar Pradesh',
    'West Bengal','Telangana','Gujarat','Rajasthan','Punjab',
    'Haryana','Kerala','Bihar','Madhya Pradesh','Andhra Pradesh'
  ];
  v_sources text[] := ARRAY['google_trends','reddit','indian_kanoon'];
BEGIN
  -- Delete rows older than 30 days
  DELETE FROM matrimonial_trends
  WHERE detected_at < NOW() - INTERVAL '30 days';

  -- Upsert randomized data from existing query templates
  FOR rec IN
    SELECT DISTINCT ON (query_text, category) query_text, category
    FROM matrimonial_trends
  LOOP
    v_traffic := 100 + floor(random() * 501)::int;
    v_volume  := 5000 + floor(random() * 495000)::int;
    v_region  := v_regions[1 + floor(random() * array_length(v_regions, 1))::int];
    v_source  := v_sources[1 + floor(random() * array_length(v_sources, 1))::int];
    v_status  := CASE WHEN random() > 0.45 THEN 'Active' ELSE 'Recent Spike' END;

    INSERT INTO matrimonial_trends
      (query_text, category, baseline_volume, trend_percentage,
       region, status_badge, source_platform, detected_at)
    VALUES
      (rec.query_text, rec.category, v_volume, v_traffic,
       v_region, v_status, v_source, NOW())
    ON CONFLICT (query_text, source_platform) DO UPDATE SET
      baseline_volume  = EXCLUDED.baseline_volume,
      trend_percentage = EXCLUDED.trend_percentage,
      region           = EXCLUDED.region,
      status_badge     = EXCLUDED.status_badge,
      detected_at      = NOW();
  END LOOP;
END;
$$;

GRANT EXECUTE ON FUNCTION auto_fetch_and_clean_trends()
  TO anon, authenticated;`;

const SQL_STEP_2 = `-- ==========================================
-- STEP 2: Schedule Daily Auto-Refresh at 1:00 AM UTC
-- ==========================================

-- Remove existing schedule if present (idempotent)
DO $$
BEGIN
  PERFORM cron.unschedule('daily-trends-refresh');
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Schedule the function to run every 24 hours at 1:00 AM UTC
SELECT cron.schedule(
  'daily-trends-refresh',
  '0 1 * * *',
  'SELECT auto_fetch_and_clean_trends();'
);

-- Verify the schedule was created
SELECT jobid, jobname, schedule, command
FROM cron.job
WHERE jobname = 'daily-trends-refresh';`;

function CodeBlock({ code, dark }: { code: string; dark: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const blockBg = dark ? 'bg-[#0d0d0f] border-white/10' : 'bg-slate-950 border-slate-700';

  return (
    <div className={`relative overflow-hidden rounded-xl border ${blockBg}`}>
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-crimson" />
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">SQL Editor</span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
            copied
              ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30'
              : 'bg-crimson/15 text-crimson ring-1 ring-crimson/20 hover:bg-crimson/25'
          }`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="max-h-80 overflow-auto p-4 text-xs leading-relaxed text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function DatabaseSetupPanel({ open, onClose, dark }: DatabaseSetupPanelProps) {
  if (!open) return null;

  const panelBg = dark ? 'bg-[#09090B]' : 'bg-white';
  const borderClass = dark ? 'border-white/10' : 'border-slate-200';
  const textPrimary = dark ? 'text-white' : 'text-slate-900';
  const textSecondary = dark ? 'text-slate-400' : 'text-slate-500';
  const textTertiary = dark ? 'text-slate-300' : 'text-slate-600';

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
        <div
          className={`relative w-full max-w-3xl rounded-2xl border ${borderClass} ${panelBg} shadow-2xl`}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className={`sticky top-0 z-10 flex items-center justify-between border-b ${borderClass} ${panelBg} px-5 py-4 rounded-t-2xl`}>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-crimson/15 text-crimson ring-1 ring-crimson/20">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h2 className={`text-base font-bold ${textPrimary}`}>Database Automation Setup</h2>
                <p className={`text-xs ${textSecondary}`}>pg_cron engine for daily trend refresh</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${dark ? 'text-slate-400 hover:bg-white/10 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-5">
            {/* Info banner */}
            <div className={`mb-5 flex items-start gap-3 rounded-xl border p-4 ${dark ? 'border-sky-400/20 bg-sky-500/[0.07]' : 'border-sky-200 bg-sky-50'}`}>
              <AlertCircle className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? 'text-sky-400' : 'text-sky-600'}`} />
              <div>
                <p className={`text-sm font-semibold ${dark ? 'text-sky-200' : 'text-sky-800'}`}>
                  Copy and paste these scripts into your Supabase SQL Editor
                </p>
                <p className={`mt-1 text-xs leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Run Step 1 first to create the function, then Step 2 to schedule it.
                  The automation runs every 24 hours at 1:00 AM UTC, refreshing trend
                  metrics and cleaning rows older than 30 days.
                </p>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: Clock, title: 'Daily Auto-Refresh', desc: 'Runs at 1:00 AM UTC' },
                { icon: Database, title: 'Randomized Data', desc: '100% to 600% trend spikes' },
                { icon: Terminal, title: 'Auto Cleanup', desc: 'Deletes rows older than 30 days' },
              ].map((f) => (
                <div key={f.title} className={`rounded-lg border p-3 ${dark ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-slate-50'}`}>
                  <f.icon className="h-4 w-4 text-crimson" />
                  <p className={`mt-2 text-xs font-bold ${textPrimary}`}>{f.title}</p>
                  <p className={`text-[11px] ${textSecondary}`}>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Step 1 */}
            <div className="mb-5">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-crimson text-xs font-bold text-white">1</span>
                <h3 className={`text-sm font-bold ${textPrimary}`}>Enable Extensions & Create Function</h3>
              </div>
              <p className={`mb-3 text-xs leading-relaxed ${textTertiary}`}>
                Activates <code className="rounded bg-white/10 px-1 py-0.5 text-crimson">pg_cron</code> and{' '}
                <code className="rounded bg-white/10 px-1 py-0.5 text-crimson">net</code> extensions, then creates the{' '}
                <code className="rounded bg-white/10 px-1 py-0.5 text-crimson">auto_fetch_and_clean_trends()</code>{' '}
                function that randomizes traffic, regions, and platform sources across all matrimonial categories.
              </p>
              <CodeBlock code={SQL_STEP_1} dark={dark} />
            </div>

            {/* Step 2 */}
            <div className="mb-2">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-crimson text-xs font-bold text-white">2</span>
                <h3 className={`text-sm font-bold ${textPrimary}`}>Schedule the Daily Cron Job</h3>
              </div>
              <p className={`mb-3 text-xs leading-relaxed ${textTertiary}`}>
                Schedules the function to run automatically every 24 hours at 1:00 AM UTC using pg_cron.
              </p>
              <CodeBlock code={SQL_STEP_2} dark={dark} />
            </div>

            {/* Note */}
            <div className={`mt-5 rounded-lg border p-3 ${dark ? 'border-amber-400/20 bg-amber-500/[0.07]' : 'border-amber-200 bg-amber-50'}`}>
              <p className={`text-xs leading-relaxed ${dark ? 'text-amber-100/90' : 'text-amber-800'}`}>
                <span className="font-bold">Note:</span> The <code className="rounded bg-white/10 px-1 py-0.5">net</code> extension
                enables HTTP calls if you later want to fetch live data from external APIs. If it is not available on your
                Supabase plan, the function still works by generating randomized data internally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
