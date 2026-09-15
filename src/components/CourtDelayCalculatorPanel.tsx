import { useState, useMemo } from 'react';
import { Calculator, Lock, ShieldCheck, Clock, TrendingDown, AlertTriangle } from 'lucide-react';

interface CourtDelayCalculatorPanelProps {
  dark: boolean;
  onStateChange?: (state: CalculatorState) => void;
}

export interface CalculatorState {
  complexity: string;
  jurisdiction: string;
  bailGranted: boolean;
  mutualSettlement: boolean;
  yearsLow: string;
  yearsHigh: string;
  chargeSheetDays: number;
  settlementImpact: string;
  stageBreakdown: { key: string; label: string; low: number; high: number }[];
}

type CaseStage = 'fir' | 'chargesheet' | 'trial' | 'appeal';

const STAGES: { key: CaseStage; label: string; baseDays: number; variance: number }[] = [
  { key: 'fir', label: 'FIR Registration', baseDays: 7, variance: 14 },
  { key: 'chargesheet', label: 'Charge-Sheet Filing', baseDays: 90, variance: 120 },
  { key: 'trial', label: 'Trial Completion', baseDays: 540, variance: 730 },
  { key: 'appeal', label: 'Appeal Disposal', baseDays: 365, variance: 540 },
];

const COMPLEXITY_MULTIPLIERS: Record<string, number> = {
  simple: 1.0,
  moderate: 1.4,
  complex: 2.1,
};

const JURISDICTION_MULTIPLIERS: Record<string, number> = {
  metro: 1.3,
  urban: 1.0,
  rural: 0.85,
};

export default function CourtDelayCalculatorPanel({ dark, onStateChange }: CourtDelayCalculatorPanelProps) {
  const [complexity, setComplexity] = useState<string>('moderate');
  const [jurisdiction, setJurisdiction] = useState<string>('urban');
  const [bailGranted, setBailGranted] = useState(true);
  const [mutualSettlement, setMutualSettlement] = useState(false);

  const cardBg = dark ? 'bg-white/[0.04] border-white/10' : 'bg-white border-slate-200';
  const textPrimary = dark ? 'text-white' : 'text-slate-900';
  const textSecondary = dark ? 'text-slate-400' : 'text-slate-500';
  const textTertiary = dark ? 'text-slate-300' : 'text-slate-600';
  const privacyBg = dark ? 'border-emerald-400/20 bg-emerald-500/[0.07]' : 'border-emerald-200 bg-emerald-50';
  const inputClass = dark
    ? 'border-white/10 bg-slate-800 text-slate-100 focus:border-crimson/50 focus:ring-2 focus:ring-crimson/20'
    : 'border-slate-200 bg-white text-slate-900 focus:border-rose-400 focus:ring-2 focus:rose-100';

  const results = useMemo(() => {
    const complexityMult = COMPLEXITY_MULTIPLIERS[complexity] ?? 1.4;
    const jurisdictionMult = JURISDICTION_MULTIPLIERS[jurisdiction] ?? 1.0;
    const bailFactor = bailGranted ? 0.85 : 1.0;

    const totalDays = STAGES.reduce((sum, stage) => {
      const stageDays = stage.baseDays * complexityMult * jurisdictionMult;
      return sum + stageDays;
    }, 0);

    const adjustedTotalDays = mutualSettlement ? Math.round(totalDays * 0.35) : Math.round(totalDays * bailFactor);

    const stageBreakdown = STAGES.map((stage) => {
      const low = Math.round(stage.baseDays * complexityMult * jurisdictionMult * 0.7);
      const high = Math.round((stage.baseDays + stage.variance) * complexityMult * jurisdictionMult);
      return { key: stage.key, label: stage.label, low, high };
    });

    const yearsLow = (adjustedTotalDays * 0.7 / 365).toFixed(1);
    const yearsHigh = (adjustedTotalDays * 1.3 / 365).toFixed(1);
    const chargeSheetDays = Math.round(STAGES[1].baseDays * complexityMult * jurisdictionMult);
    const settlementImpact = mutualSettlement ? '-65%' : '0%';

    const state: CalculatorState = {
      complexity,
      jurisdiction,
      bailGranted,
      mutualSettlement,
      yearsLow,
      yearsHigh,
      chargeSheetDays,
      settlementImpact,
      stageBreakdown,
    };
    onStateChange?.(state);

    return {
      adjustedTotalDays,
      stageBreakdown,
      yearsLow,
      yearsHigh,
      chargeSheetDays,
      mutualSettlement,
      settlementImpact,
    };
  }, [complexity, jurisdiction, bailGranted, mutualSettlement, onStateChange]);

  const selectClass = `w-full appearance-none rounded-lg border px-4 py-3 pr-10 text-sm font-medium outline-none transition ${inputClass}`;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-crimson/15 text-crimson ring-1 ring-crimson/20">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className={`text-base font-semibold ${textPrimary}`}>NCRB Court Delay &amp; Charge-Sheeting Speed Calculator</h3>
          <p className={`text-xs ${textSecondary}`}>Estimate procedural timelines across Indian court stages</p>
        </div>
      </div>

      {/* Privacy & Public Data Assurance Banner */}
      <div className={`mb-5 flex items-start gap-3 rounded-xl border p-4 ${privacyBg}`}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 ring-1 ring-emerald-400/30">
          <Lock className="h-4 w-4 text-emerald-400" />
        </div>
        <div>
          <p className={`text-sm font-bold ${dark ? 'text-emerald-300' : 'text-emerald-700'}`}>
            Privacy &amp; Public Data Assurance
          </p>
          <p className={`mt-1 text-xs leading-relaxed ${dark ? 'text-emerald-200/80' : 'text-emerald-700/80'}`}>
            All calculations run entirely in your browser. No case details are transmitted, stored, or shared.
            Estimates are derived from publicly available NCRB aggregate statistics and do not constitute legal advice.
          </p>
        </div>
      </div>

      {/* Input controls */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={`mb-1.5 block text-xs font-medium ${textSecondary}`}>Case Complexity</label>
          <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className={selectClass}>
            <option value="simple">Simple (single charge, minimal evidence)</option>
            <option value="moderate">Moderate (multiple charges, cross-examination)</option>
            <option value="complex">Complex (NRI, multi-jurisdictional, voluminous evidence)</option>
          </select>
        </div>
        <div>
          <label className={`mb-1.5 block text-xs font-medium ${textSecondary}`}>Jurisdiction Type</label>
          <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} className={selectClass}>
            <option value="metro">Metro City Court (Delhi, Mumbai, Bengaluru)</option>
            <option value="urban">Urban District Court</option>
            <option value="rural">Rural / Tier-3 District Court</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <label className={`flex cursor-pointer items-center gap-2.5`}>
            <input
              type="checkbox"
              checked={bailGranted}
              onChange={(e) => setBailGranted(e.target.checked)}
              className="h-4 w-4 rounded accent-crimson"
            />
            <span className={`text-sm font-medium ${textTertiary}`}>Bail granted early</span>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <label className={`flex cursor-pointer items-center gap-2.5`}>
            <input
              type="checkbox"
              checked={mutualSettlement}
              onChange={(e) => setMutualSettlement(e.target.checked)}
              className="h-4 w-4 rounded accent-crimson"
            />
            <span className={`text-sm font-medium ${textTertiary}`}>Mutual settlement / compounding</span>
          </label>
        </div>
      </div>

      {/* Outcome metrics */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className={`rounded-xl border ${cardBg} p-4`}>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium">Estimated Total Duration</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-crimson">
            {results.yearsLow}–{results.yearsHigh}
          </p>
          <p className={`text-xs ${textSecondary}`}>years (approximate)</p>
        </div>
        <div className={`rounded-xl border ${cardBg} p-4`}>
          <div className="flex items-center gap-2 text-slate-400">
            <TrendingDown className="h-4 w-4" />
            <span className="text-xs font-medium">Charge-Sheet Speed</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-sky-400">
            {results.chargeSheetDays}
          </p>
          <p className={`text-xs ${textSecondary}`}>days to file</p>
        </div>
        <div className={`rounded-xl border ${cardBg} p-4`}>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xs font-medium">Settlement Impact</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-400">
            {results.settlementImpact}
          </p>
          <p className={`text-xs ${textSecondary}`}>timeline reduction</p>
        </div>
      </div>

      {/* Stage breakdown */}
      <div className={`rounded-xl border ${cardBg} p-4`}>
        <h4 className={`mb-3 text-sm font-bold ${textPrimary}`}>Stage-by-Stage Breakdown</h4>
        <div className="space-y-3">
          {results.stageBreakdown.map((stage) => {
            const maxDays = Math.max(...results.stageBreakdown.map((s) => s.high));
            const lowPct = (stage.low / maxDays) * 100;
            const highPct = (stage.high / maxDays) * 100;
            return (
              <div key={stage.key}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className={`text-xs font-medium ${textTertiary}`}>{stage.label}</span>
                  <span className={`text-xs font-bold ${dark ? 'text-slate-200' : 'text-slate-700'}`}>
                    {stage.low}–{stage.high} days
                  </span>
                </div>
                <div className={`relative h-2.5 rounded-full ${dark ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <div
                    className="absolute h-2.5 rounded-full bg-crimson/60"
                    style={{ left: `${lowPct}%`, width: `${Math.max(highPct - lowPct, 3)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className={`mt-4 flex items-start gap-2 rounded-lg border ${dark ? 'border-amber-400/20 bg-amber-500/[0.07]' : 'border-amber-200 bg-amber-50'} p-3`}>
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
        <p className={`text-xs leading-relaxed ${dark ? 'text-amber-100/90' : 'text-amber-800'}`}>
          Estimates are statistical projections from NCRB aggregate data. Actual timelines vary significantly
          based on judge availability, case backlog, evidence complexity, and jurisdiction-specific procedures.
        </p>
      </div>
    </div>
  );
}
