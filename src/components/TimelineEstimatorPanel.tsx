import { useMemo, useState } from 'react';
import {
  CalendarClock,
  Handshake,
  FileCheck,
  ScrollText,
  Gavel,
  BadgeCheck,
  FilePlus,
  Gauge,
  Lightbulb,
  MapPin,
  Calendar,
  Scale,
} from 'lucide-react';
import {
  METRO_PROFILES,
  TIMELINE_STAGES,
  type MetroProfile,
} from '@/data/toolkit';

const STAGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  FilePlus,
  Handshake,
  FileCheck,
  ScrollText,
  Gavel,
  BadgeCheck,
};

interface TimelineEstimatorPanelProps {
  dark: boolean;
}

export default function TimelineEstimatorPanel({ dark }: TimelineEstimatorPanelProps) {
  const [metro, setMetro] = useState<MetroProfile>(METRO_PROFILES[0]);
  const [years, setYears] = useState<number>(2);
  const [filing, setFiling] = useState<'mutual' | 'contested'>('mutual');

  const isContested = filing === 'contested';

  const complexity = useMemo(() => {
    let score = metro.complexityBase;
    score += (years - 1) * 6;
    if (isContested) score += 12;
    else score -= 8;
    return Math.min(99, Math.max(20, score));
  }, [metro, years, isContested]);

  const complexityLabel = complexity >= 80 ? 'Very High' : complexity >= 60 ? 'High' : complexity >= 40 ? 'Moderate' : 'Lower';
  const complexityColor = complexity >= 80 ? 'text-rose-400' : complexity >= 60 ? 'text-amber-400' : 'text-emerald-400';
  const meterColor = complexity >= 80 ? 'from-rose-500 to-rose-400' : complexity >= 60 ? 'from-amber-500 to-amber-400' : 'from-emerald-500 to-emerald-400';

  const durationBadge = isContested ? metro.contestedDuration : metro.mutualDuration;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/20">
          <CalendarClock className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">Alimony &amp; Case Timeline Estimator</h3>
          <p className="text-xs text-slate-400">Simulated family court lifecycle based on public trend data</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Metro */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <MapPin className="h-3.5 w-3.5" /> Metro Location
          </label>
          <select
            value={metro.key}
            onChange={(e) => setMetro(METRO_PROFILES.find((m) => m.key === e.target.value)!)}
            className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
          >
            {METRO_PROFILES.map((m) => (
              <option key={m.key} value={m.key} className="bg-slate-800">{m.label}</option>
            ))}
          </select>
        </div>

        {/* Years */}
        <div>
          <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Years of Separation</span>
            <span className="font-semibold text-sky-400">{years === 5 ? '5+ yrs' : `${years} yr${years > 1 ? 's' : ''}`}</span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-sky-500"
          />
          <div className="mt-1 flex justify-between text-[10px] text-slate-500">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5+</span>
          </div>
        </div>

        {/* Filing type */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Scale className="h-3.5 w-3.5" /> Type of Filing
          </label>
          <div className="flex rounded-lg border border-white/10 bg-slate-800 p-1">
            <button
              onClick={() => setFiling('mutual')}
              className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition ${
                !isContested ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mutual Consent
            </button>
            <button
              onClick={() => setFiling('contested')}
              className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition ${
                isContested ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Contested
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Case Progress Roadmap</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/15 px-2.5 py-1 text-xs font-semibold text-sky-300 ring-1 ring-sky-400/30">
            <CalendarClock className="h-3.5 w-3.5" />
            Est. {durationBadge}
          </span>
        </div>
        <ol className="relative space-y-0">
          {TIMELINE_STAGES.map((stage, i) => {
            const Icon = STAGE_ICONS[stage.icon];
            const isLast = i === TIMELINE_STAGES.length - 1;
            const months = isContested ? stage.contestedMonths : stage.mutualMonths;
            return (
              <li key={stage.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700 text-slate-200 ring-2 ring-slate-600">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  {!isLast && <div className="my-1 w-px flex-1 bg-slate-700" />}
                </div>
                <div className={`flex flex-1 items-center justify-between pb-3 ${isLast ? 'pb-0' : ''}`}>
                  <span className="text-sm text-slate-200">{stage.label}</span>
                  <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-300">
                    {months} mo{months.includes('-') ? '' : ''}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Complexity meter + tip */}
      <div className="mt-auto space-y-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <Gauge className="h-3.5 w-3.5" /> Complexity &amp; Stress Score
            </span>
            <span className={`text-sm font-bold ${complexityColor}`}>{complexityLabel} · {complexity}/100</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-700">
            <div className={`h-full rounded-full bg-gradient-to-r ${meterColor} transition-all duration-500`} style={{ width: `${complexity}%` }} />
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-amber-400/20 bg-amber-500/[0.07] p-3.5">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          <p className="text-xs leading-relaxed text-amber-100/90">{metro.tip}</p>
        </div>
      </div>
    </div>
  );
}
