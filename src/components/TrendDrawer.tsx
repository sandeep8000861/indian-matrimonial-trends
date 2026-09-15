import { useEffect } from 'react';
import {
  X,
  TrendingUp,
  Clock,
  MapPin,
  ArrowUpRight,
  ScrollText,
  Newspaper,
  FileText,
  Download,
  Activity,
} from 'lucide-react';
import { CATEGORIES, SOURCE_META, type CategoryKey, type SourcePlatform } from '@/data/trends';

export interface DisplayTrend {
  id: number;
  query: string;
  category: CategoryKey;
  source: SourcePlatform;
  traffic: string;
  trend: string;
  status: 'active' | 'spike';
  time: string;
  region: string;
}

interface TrendDrawerProps {
  trend: DisplayTrend | null;
  onClose: () => void;
  dark: boolean;
}

function generateChartPoints(seed: number): number[] {
  const points: number[] = [];
  let val = 20 + (seed % 30);
  for (let i = 0; i < 12; i++) {
    val += Math.sin(seed + i * 0.7) * 15 + (seed % 5) + i * 2;
    points.push(Math.max(5, Math.min(95, val)));
  }
  return points;
}

function generateStatutes(category: CategoryKey): { section: string; title: string }[] {
  const map: Record<CategoryKey, { section: string; title: string }[]> = {
    '498a': [
      { section: 'BNS Section 85', title: 'Cruelty by husband or relatives — imprisonment up to 3 years + fine' },
      { section: 'BNS Section 86', title: 'Definition of "cruelty" — two-limb test (suicide/injury or harassment)' },
      { section: 'BNSS Section 35', title: 'Police notice of appearance replacing CrPC 41A — Arnesh Kumar guidelines apply' },
    ],
    maintenance: [
      { section: 'BNSS Section 144', title: 'Maintenance of wives, children & parents — replacing CrPC 125' },
      { section: 'Rajnesh v. Neha (2020)', title: 'Mandatory affidavit of assets and liabilities at filing stage' },
      { section: 'BNSS Section 145', title: 'Enforcement of maintenance order — attachment of property for arrears' },
    ],
    custody: [
      { section: 'Guardian & Wards Act Sec 25', title: 'Welfare of the child is the paramount consideration' },
      { section: 'Hindu Minority & Guardianship Act', title: 'Natural guardian — mother gets custody of child below 5' },
      { section: 'BNSS Section 106', title: 'Right to visitation — court may grant interim access during pendency' },
    ],
    divorce: [
      { section: 'HMA Section 13B', title: 'Mutual consent divorce — 6-month cooling-off (waivable)' },
      { section: 'HMA Section 13(1)(ia)', title: 'Cruelty as a ground for contested divorce' },
      { section: 'Article 142 Constitution', title: 'Supreme Court power to dissolve marriage on irretrievable breakdown' },
    ],
    nri: [
      { section: 'CPC Section 13', title: 'Recognition of foreign judgments — conditions for enforceability' },
      { section: 'Passport Act Section 10(3)', title: 'Impounding passport — authority and judicial review' },
      { section: 'CPC Order V Rule 21', title: 'Service of summons on NRI defendants via email/WhatsApp' },
    ],
    perjury: [
      { section: 'BNSS Section 379', title: 'Perjury proceedings — replacing CrPC Section 340' },
      { section: 'BNS Section 226', title: 'Giving false evidence — imprisonment up to 7 years' },
      { section: 'Contempt of Courts Act Sec 12', title: 'Punishment for contempt — fine and imprisonment' },
    ],
    defamation: [
      { section: 'BNS Section 356', title: 'Defamation — imprisonment up to 2 years, fine, or community service' },
      { section: 'BNS Section 241', title: 'False charge of offence made to injure a person' },
      { section: 'BNS Section 248', title: 'False charge of offence — punishment for malicious prosecution' },
    ],
    fines: [
      { section: 'BNS Section 85', title: 'Cruelty punishment — imprisonment up to 3 years and fine' },
      { section: 'BNS Section 226', title: 'False evidence — imprisonment up to 7 years and fine' },
      { section: 'BNS Section 356', title: 'Defamation — imprisonment up to 2 years and fine' },
    ],
    mensrights: [
      { section: 'BNS Section 85/86', title: 'Cruelty — gender-neutral defence strategies under new code' },
      { section: 'Guardian & Wards Act Sec 25', title: 'Father\u2019s right to custody — welfare principle application' },
      { section: 'BNSS Section 379', title: 'Perjury remedy — counter-case for false matrimonial allegations' },
    ],
  };
  return map[category] ?? map['498a'];
}

function generateMentions(query: string, source: SourcePlatform): { title: string; platform: string; time: string }[] {
  const short = query.length > 50 ? query.slice(0, 47) + '...' : query;
  return [
    { title: `Supreme Court clarifies position on ${short}`, platform: 'LiveLaw', time: '2 days ago' },
    { title: `Analysis: ${short} \u2014 what practitioners should know`, platform: 'Bar & Bench', time: '5 days ago' },
    { title: `Reddit thread: "${short}" sparks 200+ comments in r/LegalAdviceIndia`, platform: 'Reddit', time: '1 week ago' },
    { title: `Related judgment cited in recent family court order`, platform: 'Indian Kanoon', time: '2 weeks ago' },
  ];
}

function MiniLineChart({ data, dark }: { data: number[]; dark: boolean }) {
  const w = 100;
  const h = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  const lineColor = '#DC2626';
  const fillColor = dark ? 'rgba(220,38,38,0.15)' : 'rgba(220,38,38,0.1)';
  const areaPath = `M0,${h} L${points.join(' L')} L${w},${h} Z`;
  const linePath = `M${points.join(' L')}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" preserveAspectRatio="none">
      <path d={areaPath} fill={fillColor} />
      <path d={linePath} fill="none" stroke={lineColor} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((v - min) / range) * h;
        return <circle key={i} cx={x} cy={y} r="1.2" fill={lineColor} />;
      })}
    </svg>
  );
}

export default function TrendDrawer({ trend, onClose, dark }: TrendDrawerProps) {
  useEffect(() => {
    if (trend) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handler);
        document.body.style.overflow = '';
      };
    }
  }, [trend, onClose]);

  if (!trend) return null;

  const cat = CATEGORIES.find((c) => c.key === trend.category) ?? CATEGORIES[0];
  const src = SOURCE_META[trend.source];
  const chartData = generateChartPoints(trend.id);
  const statutes = generateStatutes(trend.category);
  const mentions = generateMentions(trend.query, trend.source);

  const panelBg = dark ? 'bg-[#09090B]' : 'bg-white';
  const borderClass = dark ? 'border-white/10' : 'border-slate-200';
  const textPrimary = dark ? 'text-white' : 'text-slate-900';
  const textSecondary = dark ? 'text-slate-400' : 'text-slate-500';
  const textTertiary = dark ? 'text-slate-300' : 'text-slate-600';
  const cardBg = dark ? 'bg-white/[0.04] border-white/10' : 'bg-slate-50 border-slate-200';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l ${borderClass} ${panelBg} shadow-2xl transition-transform duration-300`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b ${borderClass} px-5 py-4`}>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-crimson/15 text-crimson ring-1 ring-crimson/20">
              <Activity className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-crimson">Trend Deep Dive</span>
          </div>
          <button
            onClick={onClose}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${dark ? 'text-slate-400 hover:bg-white/10 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Query title */}
          <div className="mb-4">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${src.bg} ${src.text} ${src.ring}`}>
              <span className="text-sm leading-none">{src.emoji}</span>
              {src.label}
            </span>
            <h2 className={`mt-3 text-lg font-bold leading-snug ${textPrimary}`}>{trend.query}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className={`inline-flex items-center gap-1 ${textSecondary}`}>
                <Clock className="h-3.5 w-3.5" /> {trend.time}
              </span>
              <span className={`inline-flex items-center gap-1 ${textSecondary}`}>
                <MapPin className="h-3.5 w-3.5" /> {trend.region}
              </span>
              <span className={`inline-flex items-center gap-1 font-semibold text-crimson`}>
                <ArrowUpRight className="h-3.5 w-3.5" /> {trend.trend}
              </span>
            </div>
          </div>

          {/* Historical Search Velocity Chart */}
          <div className={`mb-5 rounded-xl border ${cardBg} p-4`}>
            <div className="mb-3 flex items-center justify-between">
              <span className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${textSecondary}`}>
                <TrendingUp className="h-3.5 w-3.5" /> Historical Search Velocity
              </span>
              <span className="text-xs font-bold text-crimson">12-Month Trend</span>
            </div>
            <MiniLineChart data={chartData} dark={dark} />
            <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-slate-500">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-200/50 pt-3">
              <span className={`text-xs ${textSecondary}`}>Current Volume</span>
              <span className={`text-sm font-bold ${textPrimary}`}>{trend.traffic}</span>
            </div>
          </div>

          {/* Top Related Statutes */}
          <div className="mb-5">
            <h3 className={`mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${textSecondary}`}>
              <ScrollText className="h-3.5 w-3.5" /> Top Related Legal Statutes
            </h3>
            <div className="space-y-2">
              {statutes.map((s, i) => (
                <div key={i} className={`rounded-lg border ${cardBg} p-3`}>
                  <p className="text-sm font-bold text-crimson">{s.section}</p>
                  <p className={`mt-1 text-xs leading-relaxed ${textTertiary}`}>{s.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Mentions */}
          <div className="mb-5">
            <h3 className={`mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${textSecondary}`}>
              <Newspaper className="h-3.5 w-3.5" /> Recent Mentions in News &amp; Forums
            </h3>
            <div className="space-y-2">
              {mentions.map((m, i) => (
                <div key={i} className={`flex items-start gap-2.5 rounded-lg border ${cardBg} p-3`}>
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-medium leading-snug ${textTertiary}`}>{m.title}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      {m.platform} · {m.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Export button */}
        <div className={`border-t ${borderClass} px-5 py-4`}>
          <button
            onClick={() => window.print()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-crimson px-4 py-3 text-sm font-bold text-white shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-dark hover:shadow-crimson/30"
          >
            <Download className="h-4 w-4" />
            Export Insights PDF
          </button>
        </div>
      </aside>
    </>
  );
}
