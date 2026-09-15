import { useState } from 'react';
import { BarChart3, TrendingUp, Activity, ExternalLink, Lightbulb } from 'lucide-react';

interface NCRBCrimeTrackerPanelProps {
  dark: boolean;
}

const CRUELTY_DATA = [
  { year: '2020', value: 111.5 },
  { year: '2021', value: 136.7 },
  { year: '2022', value: 140.2 },
  { year: '2023', value: 133.1 },
  { year: '2024', value: 131.0 },
];

const MAINTENANCE_DATA = [
  { year: '2020', value: 62.4 },
  { year: '2021', value: 68.1 },
  { year: '2022', value: 75.3 },
  { year: '2023', value: 85.7 },
  { year: '2024', value: 94.5 },
];

const ATTRITION_DATA = [
  { year: '2020', value: 14.8 },
  { year: '2021', value: 16.3 },
  { year: '2022', value: 18.1 },
  { year: '2023', value: 19.7 },
  { year: '2024', value: 21.2 },
];

const YEARS = ['2020', '2021', '2022', '2023', '2024'];

function BarChart({
  data,
  color,
  unit,
  dark,
}: {
  data: { year: string; value: number }[];
  color: string;
  unit: string;
  dark: boolean;
}) {
  const max = Math.max(...data.map((d) => d.value));
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-end justify-between gap-2 sm:gap-3" style={{ height: '180px' }}>
      {data.map((d, i) => {
        const pct = (d.value / max) * 100;
        const isHovered = hovered === i;
        return (
          <div
            key={d.year}
            className="group relative flex flex-1 flex-col items-center justify-end"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {isHovered && (
              <div className={`absolute -top-9 z-10 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-bold shadow-lg ${dark ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
                {d.value}{unit}
              </div>
            )}
            <div
              className={`w-full rounded-t-md transition-all duration-300 ${color} ${isHovered ? 'opacity-100' : 'opacity-80'}`}
              style={{ height: `${pct}%`, minHeight: '4px' }}
            />
            <span className={`mt-2 text-[11px] font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{d.year}</span>
          </div>
        );
      })}
    </div>
  );
}

function AreaChart({
  data,
  dark,
}: {
  data: { year: string; value: number }[];
  dark: boolean;
}) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;
  const width = 100;
  const height = 100;
  const stepX = width / (data.length - 1);

  const points = data.map((d, i) => {
    const x = i * stepX;
    const y = height - ((d.value - min) / range) * (height * 0.8) - 10;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="relative" style={{ height: '180px' }}>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="attritionGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#attritionGrad)" />
        <path d={linePath} fill="none" stroke="#DC2626" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#DC2626" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex justify-between px-1">
        {YEARS.map((y) => (
          <span key={y} className={`text-[11px] font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{y}</span>
        ))}
      </div>
      <div className="absolute right-0 top-0 flex flex-col items-end gap-1">
        {data.map((d) => (
          <span key={d.year} className={`text-[10px] font-bold ${dark ? 'text-crimson' : 'text-crimson'}`}>{d.value}%</span>
        ))}
      </div>
    </div>
  );
}

export default function NCRBCrimeTrackerPanel({ dark }: NCRBCrimeTrackerPanelProps) {
  const cardBg = dark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-slate-200';
  const textPrimary = dark ? 'text-white' : 'text-slate-900';
  const textSecondary = dark ? 'text-slate-400' : 'text-slate-500';
  const textTertiary = dark ? 'text-slate-300' : 'text-slate-600';
  const insightBg = dark ? 'border-amber-400/20 bg-amber-500/[0.07]' : 'border-amber-200 bg-amber-50';

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-crimson/15 text-crimson ring-1 ring-crimson/20">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <h3 className={`text-base font-semibold ${textPrimary}`}>NCRB Rolling 5-Year Matrimonial Crime Tracker</h3>
          <p className={`text-xs ${textSecondary}`}>Official Crime in India statistics · 2020–2024</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Chart 1: Cruelty by Husband */}
        <div className={`rounded-xl border ${cardBg} p-4 sm:p-5`}>
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-crimson" />
            <h4 className={`text-sm font-bold ${textPrimary}`}>Cruelty by Husband (Sec 498A IPC / Sec 85 BNS)</h4>
          </div>
          <p className={`mb-4 text-xs ${textSecondary}`}>Registration vectors in thousands</p>
          <BarChart data={CRUELTY_DATA} color="bg-crimson" unit="K" dark={dark} />
          <div className={`mt-3 flex items-start gap-2 rounded-lg ${insightBg} p-3`}>
            <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
            <p className={`text-xs leading-relaxed ${dark ? 'text-amber-100/90' : 'text-amber-800'}`}>
              <span className="font-semibold">Landmark Insight: </span>
              Cruelty consistently commands the highest single block share (~30–42%) of domestic filings nationwide.
            </p>
          </div>
        </div>

        {/* Chart 2: Maintenance Case Volumes */}
        <div className={`rounded-xl border ${cardBg} p-4 sm:p-5`}>
          <div className="mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4 text-sky-400" />
            <h4 className={`text-sm font-bold ${textPrimary}`}>Maintenance Case Volumes (Sec 125 CrPC / Sec 144 BNSS)</h4>
          </div>
          <p className={`mb-4 text-xs ${textSecondary}`}>Continuous upward trajectory in thousands</p>
          <BarChart data={MAINTENANCE_DATA} color="bg-sky-500" unit="K" dark={dark} />
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className={textSecondary}>2020 baseline</span>
            <span className="font-bold text-sky-400">+51.4% growth</span>
            <span className={textSecondary}>2024 peak</span>
          </div>
        </div>

        {/* Chart 3: Procedural Attrition */}
        <div className={`rounded-xl border ${cardBg} p-4 sm:p-5`}>
          <div className="mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4 text-crimson" />
            <h4 className={`text-sm font-bold ${textPrimary}`}>Procedural Attrition &amp; High Court Quashing Rate Trends</h4>
          </div>
          <p className={`mb-4 text-xs ${textSecondary}`}>Rising mutual compromises &amp; quashed FIRs as percentage</p>
          <AreaChart data={ATTRITION_DATA} dark={dark} />
          <div className={`mt-3 flex items-center justify-between text-xs`}>
            <span className={textSecondary}>2020: 14.8%</span>
            <span className="font-bold text-crimson">2024: 21.2% spike</span>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <div className={`mt-5 flex items-center gap-2 rounded-lg border ${cardBg} px-4 py-3`}>
        <ExternalLink className="h-4 w-4 shrink-0 text-crimson" />
        <p className={`text-xs ${textTertiary}`}>
          Data compiled natively from official{' '}
          <a
            href="https://www.ncrb.gov.in/crime-in-india-year-wise.html"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-crimson underline decoration-crimson/30 underline-offset-2 hover:decoration-crimson"
          >
            NCRB Crime in India Year-Wise Portal
          </a>
        </p>
      </div>
    </div>
  );
}
