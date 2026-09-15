import { useState } from 'react';
import { Search, PenTool, FolderKanban, Newspaper, Check, ExternalLink } from 'lucide-react';
import { LEGAL_TOOLS, TOOL_CATEGORIES, type ToolTier, type ToolCategoryKey } from '@/data/toolkit';

interface TechStackPanelProps {
  dark: boolean;
}

const TIER_META: Record<ToolTier, { label: string; bg: string; text: string; ring: string }> = {
  FREE: { label: 'FREE', bg: 'bg-emerald-500/15', text: 'text-emerald-400', ring: 'ring-emerald-400/30' },
  PAID: { label: 'PAID', bg: 'bg-crimson/15', text: 'text-crimson', ring: 'ring-crimson/30' },
  OPENSOURCE: { label: 'OPEN SOURCE', bg: 'bg-indigo-500/15', text: 'text-indigo-400', ring: 'ring-indigo-400/30' },
};

const CAT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  PenTool,
  FolderKanban,
  Newspaper,
};

export default function TechStackPanel({ dark }: TechStackPanelProps) {
  const [activeCat, setActiveCat] = useState<ToolCategoryKey>('search');

  const cardBg = dark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-slate-200';
  const textPrimary = dark ? 'text-white' : 'text-slate-900';
  const textSecondary = dark ? 'text-slate-400' : 'text-slate-500';
  const textTertiary = dark ? 'text-slate-300' : 'text-slate-600';
  const tabActive = dark ? 'bg-crimson text-white' : 'bg-slate-900 text-white';
  const tabInactive = dark ? 'text-slate-400 hover:bg-white/5 hover:text-slate-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700';

  const filtered = LEGAL_TOOLS.filter((t) => t.category === activeCat);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-crimson/15 text-crimson ring-1 ring-crimson/20">
          <FolderKanban className="h-5 w-5" />
        </div>
        <div>
          <h3 className={`text-base font-semibold ${textPrimary}`}>Global Legal Tech Stack Directory</h3>
          <p className={`text-xs ${textSecondary}`}>Elite software tools for Indian legal workflows</p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {TOOL_CATEGORIES.map((c) => {
          const Icon = CAT_ICONS[c.icon];
          const active = activeCat === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setActiveCat(c.key)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${active ? tabActive : tabInactive}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mb-3 flex flex-wrap items-center gap-3">
        {(Object.keys(TIER_META) as ToolTier[]).map((t) => (
          <span key={t} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 ${TIER_META[t].bg} ${TIER_META[t].text} ${TIER_META[t].ring}`}>
            <Check className="h-3 w-3" />
            {TIER_META[t].label}
          </span>
        ))}
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
        {filtered.map((tool) => {
          const tier = TIER_META[tool.tier];
          return (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col rounded-xl border ${cardBg} p-4 transition-all hover:shadow-md hover:border-crimson/40 ${dark ? 'hover:bg-white/[0.06]' : 'hover:bg-slate-50'}`}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <h4 className={`text-sm font-bold leading-snug ${textPrimary} group-hover:text-crimson`}>
                  {tool.name}
                </h4>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${tier.bg} ${tier.text} ${tier.ring}`}>
                  {tier.label}
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${textTertiary}`}>{tool.description}</p>
              <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-crimson opacity-0 transition-opacity group-hover:opacity-100">
                <ExternalLink className="h-3 w-3" />
                Visit website
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
