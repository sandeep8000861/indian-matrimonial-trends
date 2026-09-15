import { useState, useEffect } from 'react';
import { ListChecks, ChevronDown, Lightbulb, Check } from 'lucide-react';
import { CASE_TYPES, type CaseTypeKey, type AdvocateQuestion } from '@/data/toolkit';

interface AdvocateScreeningPanelProps {
  dark: boolean;
  onStateChange?: (state: { selectedKey: CaseTypeKey; questions: AdvocateQuestion[] }) => void;
}

export default function AdvocateScreeningPanel({ dark, onStateChange }: AdvocateScreeningPanelProps) {
  const [selectedKey, setSelectedKey] = useState<CaseTypeKey>(CASE_TYPES[0].key);
  const selected = CASE_TYPES.find((c) => c.key === selectedKey)!;

  useEffect(() => {
    onStateChange?.({ selectedKey, questions: selected.questions });
  }, [selectedKey, selected.questions, onStateChange]);

  const cardBg = dark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-slate-200';
  const textPrimary = dark ? 'text-white' : 'text-slate-900';
  const textSecondary = dark ? 'text-slate-400' : 'text-slate-500';
  const textTertiary = dark ? 'text-slate-300' : 'text-slate-600';
  const accentBg = dark ? 'bg-crimson/15 text-crimson ring-crimson/20' : 'bg-rose-50 text-rose-600 ring-rose-200';
  const tipBg = dark ? 'border-amber-400/20 bg-amber-500/[0.07]' : 'border-amber-200 bg-amber-50';

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-crimson/15 text-crimson ring-1 ring-crimson/20">
          <ListChecks className="h-5 w-5" />
        </div>
        <div>
          <h3 className={`text-base font-semibold ${textPrimary}`}>Advocate Screening Matrix</h3>
          <p className={`text-xs ${textSecondary}`}>5 critical questions to ask before retaining an advocate</p>
        </div>
      </div>

      {/* Case type selector */}
      <div className="mb-4">
        <label className={`mb-1.5 block text-xs font-medium ${textSecondary}`}>Select your case challenge:</label>
        <div className="relative">
          <select
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value as CaseTypeKey)}
            className={`w-full appearance-none rounded-lg border px-4 py-3 pr-10 text-sm font-medium outline-none transition ${
              dark
                ? 'border-white/10 bg-slate-800 text-slate-100 focus:border-crimson/50 focus:ring-2 focus:ring-crimson/20'
                : 'border-slate-200 bg-white text-slate-900 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
            }`}
          >
            {CASE_TYPES.map((c) => (
              <option key={c.key} value={c.key} className={dark ? 'bg-slate-800' : 'bg-white'}>
                {c.label}
              </option>
            ))}
          </select>
          <ChevronDown className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 ${textSecondary}`} />
        </div>
        <p className={`mt-2 text-xs leading-relaxed ${textTertiary}`}>{selected.description}</p>
      </div>

      {/* Questions checklist */}
      <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
        {selected.questions.map((q, i) => (
          <div key={i} className={`rounded-xl border ${cardBg} p-4`}>
            <div className="flex items-start gap-3">
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${accentBg} ring-1`}>
                <span className="text-xs font-bold">{i + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold leading-snug ${textPrimary}`}>{q.question}</p>
                <div className={`mt-2.5 flex items-start gap-2 rounded-lg ${tipBg} p-2.5`}>
                  <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                  <p className={`text-xs leading-relaxed ${dark ? 'text-amber-100/90' : 'text-amber-800'}`}>
                    <span className="font-semibold">Why it matters: </span>{q.why}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary footer */}
      <div className={`mt-4 flex items-center gap-2.5 rounded-lg border ${cardBg} px-4 py-3`}>
        <Check className="h-4 w-4 shrink-0 text-emerald-400" />
        <p className={`text-xs ${textSecondary}`}>
          Print these questions and bring them to your consultation. A qualified advocate should answer all five confidently.
        </p>
      </div>
    </div>
  );
}
