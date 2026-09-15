import { useState } from 'react';
import {
  ArrowRight,
  Gauge,
  HelpCircle,
  Lightbulb,
  ChevronDown,
  Check,
} from 'lucide-react';
import {
  CODE_TRANSITIONS,
  type CodeTransition,
} from '@/data/toolkit';

const MOMENTUM_STYLES: Record<CodeTransition['momentum'], string> = {
  'High Trend Spike': 'bg-rose-50 text-rose-600 ring-rose-200',
  'Rising': 'bg-sky-50 text-sky-600 ring-sky-200',
  'Historical Trend Only': 'bg-slate-100 text-slate-500 ring-slate-200',
  'Steady': 'bg-emerald-50 text-emerald-600 ring-emerald-200',
};

function ConfusionBar({ value }: { value: number }) {
  const color = value >= 80 ? 'bg-rose-500' : value >= 55 ? 'bg-amber-500' : 'bg-emerald-500';
  const label = value >= 80 ? 'Very High' : value >= 55 ? 'Moderate' : 'Low';
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-500">Public Confusion Rating</span>
        <span className="font-semibold text-slate-700">{label} · {value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

interface CodeTransitionPanelProps {
  dark: boolean;
}

export default function CodeTransitionPanel({ dark }: CodeTransitionPanelProps) {
  const [selectedId, setSelectedId] = useState<string>(CODE_TRANSITIONS[0].id);
  const selected = CODE_TRANSITIONS.find((c) => c.id === selectedId)!;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400 ring-1 ring-sky-400/20">
          <ArrowRight className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">Legal Code Transition Guide</h3>
          <p className="text-xs text-slate-400">Map old IPC / CrPC sections to the new BNS / BNSS framework</p>
        </div>
      </div>

      {/* Selectable list */}
      <div className="mb-4 max-h-72 space-y-1.5 overflow-y-auto pr-1">
        {CODE_TRANSITIONS.map((c) => {
          const active = c.id === selectedId;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all ${
                active
                  ? 'border-sky-400/40 bg-sky-500/10'
                  : 'border-white/5 bg-white/[0.03] hover:bg-white/[0.06]'
              }`}
            >
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${active ? 'bg-sky-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                {active ? <Check className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-100">{c.title}</p>
                <p className="truncate text-xs text-slate-400">
                  {c.oldLaw} {c.oldSection} <span className="text-slate-500">→</span> {c.newLaw} {c.newSection}
                </p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${MOMENTUM_STYLES[c.momentum]}`}>
                {c.momentum}
              </span>
            </button>
          );
        })}
      </div>

      {/* Summary card */}
      <div className="mt-auto rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-md bg-slate-700/60 px-2 py-1 text-xs font-semibold text-slate-200 line-through decoration-rose-400/60">
            {selected.oldLaw} {selected.oldSection}
          </span>
          <ArrowRight className="h-4 w-4 text-sky-400" />
          <span className="rounded-md bg-sky-500/20 px-2 py-1 text-xs font-semibold text-sky-300 ring-1 ring-sky-400/30">
            {selected.newLaw} {selected.newSection}
          </span>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-slate-300">{selected.summary}</p>
        <ConfusionBar value={selected.confusionRating} />
      </div>
    </div>
  );
}
