import { useEffect, useMemo, useState } from 'react';
import {
  Scale,
  Wallet,
  Users,
  FileText,
  Globe,
  Gavel,
  ShieldAlert,
  Lock,
  Hand,
  LayoutGrid,
  Search,
  TrendingUp,
  Clock,
  MapPin,
  Activity,
  AlertTriangle,
  ShieldCheck,
  ArrowUpRight,
  Loader2,
  Download,
  Database,
  Moon,
  Sun,
  X,
  Wrench,
} from 'lucide-react';
import {
  CATEGORIES,
  TRENDS,
  REGIONS,
  TIME_LABELS,
  SOURCE_META,
  type CategoryKey,
  type SourcePlatform,
} from '@/data/trends';
import { supabase, type MatrimonialTrendRow } from '@/lib/supabaseClient';
import LitigationToolkit from '@/components/LitigationToolkit';
import TrendDrawer, { type DisplayTrend } from '@/components/TrendDrawer';
import DatabaseSetupPanel from '@/components/DatabaseSetupPanel';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale,
  Wallet,
  Users,
  FileText,
  Globe,
  Gavel,
  ShieldAlert,
  Lock,
  Hand,
};

type FilterKey = CategoryKey | 'all';

function seededMeta(id: number) {
  const r = (n: number) => {
    const x = Math.sin(n) * 10000;
    return x - Math.floor(x);
  };
  const trafficNum = Math.floor(5 + r(id + 1) * 495);
  const traffic = `${trafficNum}K+ searches`;
  const spikeNum = Math.floor(50 + r(id + 2) * 950);
  const trend = `Rising +${spikeNum}%`;
  const status: DisplayTrend['status'] = r(id + 3) > 0.45 ? 'active' : 'spike';
  const time = TIME_LABELS[Math.floor(r(id + 4) * TIME_LABELS.length)];
  const region = REGIONS[Math.floor(r(id + 5) * REGIONS.length)];
  return { traffic, trend, status, time, region };
}

function fromLocal(): DisplayTrend[] {
  return TRENDS.map((t) => ({ id: t.id, query: t.query, category: t.category, source: t.source, ...seededMeta(t.id + 7) }));
}

function fromSupabase(rows: MatrimonialTrendRow[]): DisplayTrend[] {
  return rows.map((row, i) => {
    const traffic = `${Math.max(1, Math.round(row.baseline_volume / 1000))}K+ searches`;
    const trend = `Rising +${row.trend_percentage}%`;
    const status: DisplayTrend['status'] = row.status_badge === 'Recent Spike' ? 'spike' : 'active';
    const time = TIME_LABELS[i % TIME_LABELS.length];
    const region = row.region ?? REGIONS[i % REGIONS.length];
    return {
      id: row.id,
      query: row.query_text,
      category: row.category as CategoryKey,
      source: row.source_platform,
      traffic,
      trend,
      status,
      time,
      region,
    };
  });
}

function exportPDF(filtered: DisplayTrend[]) {
  const win = window.open('', '_blank');
  if (!win) return;
  const rows = filtered
    .map(
      (t, i) =>
        `<tr><td>${i + 1}</td><td>${t.query.replace(/</g, '&lt;')}</td><td>${t.category}</td><td>${t.source}</td><td>${t.traffic}</td><td>${t.trend}</td><td>${t.region}</td></tr>`,
    )
    .join('');
  win.document.write(`<!DOCTYPE html><html><head><title>Matrimonial Trend Insights Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #09090B; }
    h1 { color: #DC2626; font-size: 24px; margin-bottom: 8px; }
    .meta { color: #64748B; font-size: 12px; margin-bottom: 24px; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; }
    th { background: #09090B; color: white; padding: 8px; text-align: left; }
    td { padding: 6px 8px; border-bottom: 1px solid #E2E8F0; }
    tr:nth-child(even) { background: #F8FAFC; }
    .footer { margin-top: 24px; font-size: 10px; color: #94A3B8; }
  </style></head><body>
  <h1>Indian Matrimonial Trend Tracker — Insights Report</h1>
  <div class="meta">Generated: ${new Date().toLocaleString('en-IN')} · ${filtered.length} queries · For informational purposes only</div>
  <table><thead><tr><th>#</th><th>Query</th><th>Category</th><th>Source</th><th>Volume</th><th>Trend</th><th>Region</th></tr></thead><tbody>${rows}</tbody></table>
  <div class="footer">Data sourced via public interest feeds. Not legal advice.</div>
  </body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

function App() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [search, setSearch] = useState('');
  const [trends, setTrends] = useState<DisplayTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingCloud, setUsingCloud] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dark, setDark] = useState(true);
  const [drawerTrend, setDrawerTrend] = useState<DisplayTrend | null>(null);
  const [showDbSetup, setShowDbSetup] = useState(false);
  const [page, setPage] = useState<'analytics' | 'toolkit'>('analytics');

  useEffect(() => {
    let cancelled = false;
    const localFallback = () => {
      if (!cancelled) {
        setTrends(fromLocal());
        setUsingCloud(false);
      }
    };
    (async () => {
      try {
        const fetchPromise = supabase
          .from('matrimonial_trends')
          .select('*')
          .order('detected_at', { ascending: false });
        const timeoutPromise = new Promise<{ data: null; error: { message: string } }>((resolve) =>
          setTimeout(() => resolve({ data: null, error: { message: 'Request timed out' } }), 8000)
        );
        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
        if (cancelled) return;
        if (error) throw error;
        if (data && Array.isArray(data) && data.length > 0) {
          try {
            const mapped = fromSupabase(data as MatrimonialTrendRow[]);
            if (mapped.length > 0) {
              setTrends(mapped);
              setUsingCloud(true);
            } else {
              localFallback();
            }
          } catch {
            localFallback();
          }
        } else {
          localFallback();
        }
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load live feed');
        localFallback();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return trends.filter((t) => {
      if (filter !== 'all' && t.category !== filter) return false;
      if (q && !t.query.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [trends, filter, search]);

  const tabs: { key: FilterKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'all', label: 'All Trends', icon: LayoutGrid },
    ...CATEGORIES.map((c) => ({
      key: c.key,
      label: c.label,
      icon: ICONS[c.icon],
    })),
  ];

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: trends.length };
    for (const c of CATEGORIES) map[c.key] = trends.filter((t) => t.category === c.key).length;
    return map;
  }, [trends]);

  // Theme-aware classes
  const pageBg = dark ? 'bg-[#09090B] text-slate-100' : 'bg-slate-100 text-slate-900';
  const headerBg = dark
    ? 'bg-[#09090B] border-b border-white/10'
    : 'bg-[#09090B]';
  const cardBg = dark ? 'bg-[#18181B] border-white/10' : 'bg-white border-slate-200';
  const cardHover = dark ? 'hover:border-crimson/40 hover:shadow-crimson/5' : 'hover:border-slate-300 hover:shadow-md';
  const textPrimary = dark ? 'text-white' : 'text-slate-900';
  const textSecondary = dark ? 'text-slate-400' : 'text-slate-500';
  const textTertiary = dark ? 'text-slate-300' : 'text-slate-600';
  const inputBg = dark ? 'bg-[#18181B] border-white/10 text-slate-100' : 'bg-white border-slate-200 text-slate-900';
  const filterActive = dark ? 'bg-crimson text-white shadow-sm' : 'bg-[#0F172A] text-white shadow-sm';
  const filterInactive = dark
    ? 'bg-[#18181B] text-slate-400 ring-1 ring-white/10 hover:bg-white/5 hover:text-slate-200'
    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900';
  const statCard = dark ? 'border-white/10 bg-white/5' : 'border-white/10 bg-white/5';

  return (
    <div className={`min-h-screen ${pageBg}`}>
      {/* Header */}
      <header className={`relative overflow-hidden ${headerBg} text-white no-print`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #DC262620 0%, transparent 50%), radial-gradient(circle at 80% 0%, #1e293b 0%, transparent 40%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          {/* Top bar: brand + dark mode toggle + export */}
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-crimson/15 ring-1 ring-crimson/30">
                <Scale className="h-6 w-6 text-crimson" />
              </div>
              <div>
                <span className="block text-sm font-bold uppercase tracking-[0.2em] text-crimson">Legal Intelligence</span>
                <span className="block text-xs text-slate-500">Premium Terminal View</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={() => setDark((v) => !v)}
                className={`flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold transition-all hover:bg-white/5 ${
                  dark ? 'text-crimson' : 'text-amber-400'
                }`}
                aria-label="Toggle dark mode"
              >
                {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="hidden sm:inline">{dark ? 'Terminal' : 'Light'}</span>
              </button>
              {/* Export PDF */}
              <button
                onClick={() => exportPDF(filtered)}
                disabled={filtered.length === 0}
                className="flex items-center gap-2 rounded-lg bg-crimson px-4 py-2 text-xs font-bold text-white shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-dark hover:shadow-crimson/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export Insights PDF</span>
                <span className="sm:hidden">PDF</span>
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl sm:leading-[1.1]">
            Indian Matrimonial Trend Tracker
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Monitoring public search interest, trending legal topics, and rising family law queries across India.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm font-semibold text-emerald-300">Live Feed Active (Free Tier)</span>
            </div>
            {usingCloud ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-crimson/30 bg-crimson/10 px-3 py-1.5 text-xs font-semibold text-crimson">
                Supabase Cloud
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300">
                Local Seed Data
              </span>
            )}
          </div>

          {/* Quick stats */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { label: 'Tracked Queries', value: String(trends.length || 100), icon: TrendingUp },
              { label: 'Legal Categories', value: String(CATEGORIES.length), icon: LayoutGrid },
              { label: 'Data Sources', value: String(Object.keys(SOURCE_META).length), icon: Activity },
              { label: 'Feed Status', value: usingCloud ? 'Cloud' : 'Seeded', icon: Activity },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border ${statCard} px-4 py-3.5 backdrop-blur-sm`}>
                <div className="flex items-center gap-2 text-slate-400">
                  <s.icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{s.label}</span>
                </div>
                <p className="mt-1.5 text-2xl font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Top navigation bar */}
      <nav className={`sticky top-0 z-40 border-b ${dark ? 'border-white/10 bg-[#09090B]/95' : 'border-slate-200 bg-white/95'} backdrop-blur-md no-print`}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setPage('analytics')}
              className={`flex items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold transition-all duration-200 sm:px-5 ${
                page === 'analytics'
                  ? 'border-crimson text-crimson'
                  : dark
                    ? 'border-transparent text-slate-400 hover:text-slate-200'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
              }`
            }
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Live Trend Analytics</span>
              <span className="sm:hidden">Analytics</span>
            </button>
            <button
              onClick={() => setPage('toolkit')}
              className={`flex items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold transition-all duration-200 sm:px-5 ${
                page === 'toolkit'
                  ? 'border-crimson text-crimson'
                  : dark
                    ? 'border-transparent text-slate-400 hover:text-slate-200'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
              }`
            }
            >
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Litigation Toolkit</span>
              <span className="sm:hidden">Toolkit</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        {page === 'toolkit' ? (
        <LitigationToolkit dark={dark} />
      ) : (
        <>
        {/* Source legend */}
        <div className="mb-4 flex flex-wrap items-center gap-2 no-print">
          <span className={`text-xs font-semibold uppercase tracking-wide ${textSecondary}`}>Sources:</span>
          {(Object.keys(SOURCE_META) as SourcePlatform[]).map((s) => (
            <span key={s} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${SOURCE_META[s].bg} ${SOURCE_META[s].text} ${SOURCE_META[s].ring}`}>
              <span>{SOURCE_META[s].emoji}</span>
              {SOURCE_META[s].label}
            </span>
          ))}
        </div>

        {/* Filter bar */}
        <div className="mb-6 overflow-x-auto pb-1 no-print">
          <div className="flex min-w-max gap-2">
            {tabs.map((tab) => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`group inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    active ? filterActive : filterInactive
                  }`}
                >
                  <tab.icon className={`h-4 w-4 ${active ? 'text-white' : dark ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  {tab.label}
                  <span className={`ml-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold ${
                    active ? 'bg-white/15 text-slate-200' : dark ? 'bg-white/5 text-slate-500' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {counts[tab.key] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-6 no-print">
          <div className="relative">
            <Search className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${textSecondary}`} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search matrimonial & family law queries..."
              className={`w-full rounded-xl border py-3.5 pl-12 pr-4 text-sm shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-crimson/50 focus:ring-2 focus:ring-crimson/10 ${inputBg}`}
            />
          </div>
          <p className={`mt-2.5 text-sm ${textSecondary}`}>
            Showing <span className={`font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}`}>{filtered.length}</span> of {trends.length} tracked queries
          </p>
        </div>

        {/* Error banner */}
        {error && !loading ? (
          <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-800 no-print">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>Live feed unavailable — showing local seed data. ({error})</p>
          </div>
        ) : null}

        {/* Skeleton loading state */}
        {loading ? (
          <div>
            <div className={`mb-6 flex items-center gap-3 rounded-xl border p-4 ${dark ? 'border-white/10 bg-[#18181B]' : 'border-slate-200 bg-white'}`}>
              <Loader2 className="h-5 w-5 animate-spin text-crimson" />
              <span className={`text-sm font-medium ${textSecondary}`}>Connecting to live trend feed...</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex flex-col rounded-xl border p-4 ${dark ? 'border-white/10 bg-[#18181B]' : 'border-slate-200 bg-white'}`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-lg ${dark ? 'bg-white/5' : 'bg-slate-100'} animate-pulse`} />
                    <div className={`h-3 w-24 rounded ${dark ? 'bg-white/5' : 'bg-slate-100'} animate-pulse`} />
                  </div>
                  <div className={`mb-3 h-3 w-full rounded ${dark ? 'bg-white/5' : 'bg-slate-100'} animate-pulse`} style={{ animationDelay: `${i * 80}ms` }} />
                  <div className={`mb-2 h-3 w-20 rounded ${dark ? 'bg-white/5' : 'bg-slate-100'} animate-pulse`} style={{ animationDelay: `${i * 80 + 100}ms` }} />
                  <div className="mt-auto flex items-center justify-between border-t pt-3 ${dark ? 'border-white/5' : 'border-slate-100'}">
                    <div className={`h-3 w-16 rounded ${dark ? 'bg-white/5' : 'bg-slate-100'} animate-pulse`} />
                    <div className={`h-3 w-12 rounded ${dark ? 'bg-white/5' : 'bg-slate-100'} animate-pulse`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Empty state */}
        {!loading && filtered.length === 0 ? (
          <div className={`flex flex-col items-center justify-center rounded-2xl border border-dashed py-20 text-center ${dark ? 'border-white/10 bg-[#18181B]' : 'border-slate-300 bg-white'}`}>
            <Search className={`h-10 w-10 ${dark ? 'text-slate-700' : 'text-slate-300'}`} />
            <p className={`mt-4 text-base font-medium ${textTertiary}`}>No matching queries found</p>
            <p className={`mt-1 text-sm ${textSecondary}`}>Try a different search term or category filter.</p>
          </div>
        ) : null}

        {/* Trend grid */}
        {!loading && filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((t) => {
              const cat = CATEGORIES.find((c) => c.key === t.category) ?? CATEGORIES[0];
              const CatIcon = ICONS[cat.icon];
              const src = SOURCE_META[t.source] ?? SOURCE_META['google_trends'];
              return (
                <article
                  key={t.id}
                  onClick={() => setDrawerTrend(t)}
                  className={`group flex cursor-pointer flex-col rounded-xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${cardBg} ${cardHover}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${dark ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                        <CatIcon className="h-4 w-4" />
                      </div>
                      <span className={`text-xs font-medium uppercase tracking-wide ${textSecondary}`}>{cat.label}</span>
                    </div>
                    {t.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-crimson/10 px-2 py-0.5 text-xs font-semibold text-crimson ring-1 ring-crimson/20">
                        <AlertTriangle className="h-3 w-3" />
                        Recent Spike
                      </span>
                    )}
                  </div>

                  <h3 className={`mb-3 text-sm font-semibold leading-snug ${textPrimary} group-hover:text-crimson`}>
                    {t.query}
                  </h3>

                  <div className={`mt-auto space-y-2 border-t pt-3 ${dark ? 'border-white/5' : 'border-slate-100'}`}>
                    <div className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${src.bg} ${src.text} ${src.ring}`}>
                      <span className="text-sm leading-none">{src.emoji}</span>
                      {src.label}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}`}>{t.traffic}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-crimson">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {t.trend}
                      </span>
                    </div>
                    <div className={`flex items-center justify-between text-xs ${textSecondary}`}>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {t.time}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {t.region}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}

        </>
      )}
      </main>

      {/* Footer */}
      <footer className={`border-t ${dark ? 'border-white/10 bg-[#09090B]' : 'border-slate-200 bg-white'}`}>
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${dark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className={`max-w-2xl text-xs leading-relaxed ${textSecondary}`}>
                Data sourced via public interest feeds (Google Trends India, Reddit r/LegalAdviceIndia, Indian Kanoon, LiveLaw, Bar &amp; Bench, SCC Online, Shonee Kapoor, MyNation). Fully automated polling engine backed by Supabase.
              </p>
            </div>
            <p className={`text-xs ${textSecondary}`}>For informational purposes only. Not legal advice.</p>
          </div>
          <button
            onClick={() => setShowDbSetup(true)}
            className={`mt-3 text-[10px] opacity-20 transition-opacity hover:opacity-60 ${dark ? 'text-slate-600' : 'text-slate-400'}`}
            aria-label="System configuration"
          >
            <Database className="inline h-3 w-3" />
          </button>
        </div>
      </footer>

      {/* Trend Drill-Down Drawer */}
      <TrendDrawer trend={drawerTrend} onClose={() => setDrawerTrend(null)} dark={dark} />

      {/* Database Automation Setup Modal */}
      <DatabaseSetupPanel open={showDbSetup} onClose={() => setShowDbSetup(false)} dark={dark} />
    </div>
  );
}

export default App;
