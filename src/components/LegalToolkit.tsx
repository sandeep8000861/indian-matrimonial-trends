import { useState } from 'react';
import { Wrench, ArrowRight, CalendarClock, ChevronDown, ListChecks, FolderKanban } from 'lucide-react';
import CodeTransitionPanel from './CodeTransitionPanel';
import TimelineEstimatorPanel from './TimelineEstimatorPanel';
import AdvocateScreeningPanel from './AdvocateScreeningPanel';
import TechStackPanel from './TechStackPanel';

type Tab = 'code' | 'timeline' | 'advocate' | 'techstack';

interface LegalToolkitProps {
  dark: boolean;
}

const TABS: { key: Tab; label: string; shortLabel: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { key: 'code', label: 'Code Transition Guide', shortLabel: 'Transition', icon: ArrowRight, desc: 'IPC / CrPC → BNS / BNSS' },
  { key: 'timeline', label: 'Case Timeline Estimator', shortLabel: 'Estimator', icon: CalendarClock, desc: 'Simulated court lifecycle' },
  { key: 'advocate', label: 'Advocate Screening Matrix', shortLabel: 'Advocate', icon: ListChecks, desc: 'Questions to ask before retaining' },
  { key: 'techstack', label: 'Legal Tech Stack Directory', shortLabel: 'Tech Stack', icon: FolderKanban, desc: 'Elite legal software tools' },
];

export default function LegalToolkit({ dark }: LegalToolkitProps) {
  const [tab, setTab] = useState<Tab>('code');
  const [open, setOpen] = useState(true);
  const [hoverOpen, setHoverOpen] = useState(false);

  const expanded = open || hoverOpen;

  const panelBg = dark ? 'bg-[#09090B]' : 'bg-[#0F172A]';
  const tabActive = dark ? 'bg-[#1a1a1a] text-white' : 'bg-[#0F172A] text-white';
  const tabInactive = dark ? 'text-slate-400 hover:bg-white/5 hover:text-slate-200' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200';
  const accent = dark ? 'text-crimson' : 'text-sky-400';

  return (
    <section className="mb-8">
      <div
        className={`overflow-hidden rounded-2xl border shadow-lg transition-shadow ${dark ? 'border-white/10' : 'border-slate-200'} ${panelBg}`}
        onMouseEnter={() => setHoverOpen(true)}
        onMouseLeave={() => setHoverOpen(false)}
      >
        {/* Header / toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={expanded}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-crimson/15 text-crimson ring-1 ring-crimson/20">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Interactive Legal Toolkit</h2>
              <p className="text-xs text-slate-400">No-code lookup &amp; estimator widgets · click or hover to {expanded ? 'collapse' : 'expand'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs font-medium text-slate-500">{expanded ? 'Hide' : 'Show'}</span>
            <ChevronDown
              className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* Collapsible body */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            {/* Tab switcher */}
            <div className="flex flex-wrap border-y border-white/10 bg-slate-900/50">
              {TABS.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold transition-all ${
                      active ? tabActive : tabInactive
                    }`}
                  >
                    <t.icon className={`h-4 w-4 ${active ? accent : ''}`} />
                    <span className="hidden sm:inline">{t.label}</span>
                    <span className="sm:hidden">{t.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Panel */}
            <div className="p-5 sm:p-6">
              {tab === 'code' && <CodeTransitionPanel dark={dark} />}
              {tab === 'timeline' && <TimelineEstimatorPanel dark={dark} />}
              {tab === 'advocate' && <AdvocateScreeningPanel dark={dark} />}
              {tab === 'techstack' && <TechStackPanel dark={dark} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
