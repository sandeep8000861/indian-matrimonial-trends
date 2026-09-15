import { useState, useCallback } from 'react';
import { Wrench, Download } from 'lucide-react';
import CourtDelayCalculatorPanel, { type CalculatorState } from './CourtDelayCalculatorPanel';
import { COMPLEXITY_LABELS, JURISDICTION_LABELS } from '@/data/calculatorLabels';
import NCRBCrimeTrackerPanel from './NCRBCrimeTrackerPanel';
import AdvocateScreeningPanel from './AdvocateScreeningPanel';
import TechStackPanel from './TechStackPanel';
import EmailCaptureModal from './EmailCaptureModal';
import { CASE_TYPES, type CaseTypeKey, type AdvocateQuestion } from '@/data/toolkit';

interface LitigationToolkitProps {
  dark: boolean;
}

interface AdvocateState {
  selectedKey: CaseTypeKey;
  questions: AdvocateQuestion[];
}

function generateReport(calcState: CalculatorState | null, advocateState: AdvocateState | null) {
  const win = window.open('', '_blank');
  if (!win) return;

  const calc = calcState ?? null;
  const advocate = advocateState ?? null;
  const caseType = advocate ? CASE_TYPES.find((c) => c.key === advocate.selectedKey) : null;

  const stageRows = calc
    ? calc.stageBreakdown
        .map(
          (s) =>
            `<tr><td style="padding:6px 8px;border-bottom:1px solid #E2E8F0;font-weight:600">${s.label}</td><td style="padding:6px 8px;border-bottom:1px solid #E2E8F0">${s.low}–${s.high} days</td></tr>`,
        )
        .join('')
    : '';

  const questionRows = advocate
    ? advocate.questions
        .map(
          (q, i) =>
            `<div style="margin-bottom:16px;padding:12px;border:1px solid #E2E8F0;border-radius:8px;background:#F8FAFC">
              <p style="font-weight:700;color:#09090B;margin:0 0 8px 0">${i + 1}. ${q.question.replace(/</g, '&lt;')}</p>
              <p style="font-size:12px;color:#64748B;margin:0;line-height:1.5"><strong>Why it matters:</strong> ${q.why.replace(/</g, '&lt;')}</p>
            </div>`,
        )
        .join('')
    : '';

  const calcSection = calc
    ? `
      <h2 style="color:#DC2626;font-size:18px;margin:24px 0 12px 0">Section A: Court Delay &amp; Charge-Sheeting Speed Calculator</h2>
      <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:16px">
        <tr><td style="padding:6px 8px;font-weight:600;width:40%;background:#F1F5F9">Case Complexity</td><td style="padding:6px 8px">${COMPLEXITY_LABELS[calc.complexity] ?? calc.complexity}</td></tr>
        <tr><td style="padding:6px 8px;font-weight:600;background:#F1F5F9">Jurisdiction</td><td style="padding:6px 8px">${JURISDICTION_LABELS[calc.jurisdiction] ?? calc.jurisdiction}</td></tr>
        <tr><td style="padding:6px 8px;font-weight:600;background:#F1F5F9">Bail Granted Early</td><td style="padding:6px 8px">${calc.bailGranted ? 'Yes' : 'No'}</td></tr>
        <tr><td style="padding:6px 8px;font-weight:600;background:#F1F5F9">Mutual Settlement</td><td style="padding:6px 8px">${calc.mutualSettlement ? 'Yes' : 'No'}</td></tr>
        <tr><td style="padding:6px 8px;font-weight:600;background:#F1F5F9">Estimated Duration</td><td style="padding:6px 8px;font-weight:700;color:#DC2626">${calc.yearsLow}–${calc.yearsHigh} years</td></tr>
        <tr><td style="padding:6px 8px;font-weight:600;background:#F1F5F9">Charge-Sheet Speed</td><td style="padding:6px 8px;font-weight:700;color:#0EA5E9">${calc.chargeSheetDays} days</td></tr>
        <tr><td style="padding:6px 8px;font-weight:600;background:#F1F5F9">Settlement Impact</td><td style="padding:6px 8px;font-weight:700;color:#10B981">${calc.settlementImpact}</td></tr>
      </table>
      <h3 style="font-size:14px;margin:16px 0 8px 0">Stage-by-Stage Breakdown</h3>
      <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:16px">
        <thead><tr><th style="padding:8px;text-align:left;background:#09090B;color:white">Stage</th><th style="padding:8px;text-align:left;background:#09090B;color:white">Estimated Duration</th></tr></thead>
        <tbody>${stageRows}</tbody>
      </table>
    `
    : '';

  const advocateSection = caseType && advocate
    ? `
      <h2 style="color:#DC2626;font-size:18px;margin:24px 0 12px 0">Section C: Advocate Screening Matrix</h2>
      <p style="font-size:13px;font-weight:600;color:#09090B;margin-bottom:4px">Case Type: ${caseType.label}</p>
      <p style="font-size:12px;color:#64748B;margin-bottom:16px">${caseType.description}</p>
      <h3 style="font-size:14px;margin:16px 0 12px 0">5 Strategic Screening Questions</h3>
      ${questionRows}
    `
    : '';

  win.document.write(`<!DOCTYPE html><html><head><title>Complete Litigation Toolkit Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #09090B; max-width: 800px; }
    h1 { color: #DC2626; font-size: 28px; margin: 0 0 8px 0; }
    .meta { color: #64748B; font-size: 12px; margin-bottom: 24px; border-bottom: 2px solid #DC2626; padding-bottom: 12px; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #E2E8F0; font-size: 10px; color: #94A3B8; }
    @media print { body { margin: 20px; } }
  </style></head><body>
  <h1>Complete Litigation Toolkit Report</h1>
  <div class="meta">
    Generated: ${new Date().toLocaleString('en-IN')}<br/>
    Indian Matrimonial Trend Tracker — Litigation Toolkit Export<br/>
    For informational purposes only. Not legal advice.
  </div>
  ${calcSection}
  ${advocateSection}
  <div class="footer">
    This report was generated from your selections in the Litigation Toolkit.
    Court delay estimates are derived from publicly available NCRB aggregate statistics.
    Advocate screening questions should be used as a consultation guide only.
  </div>
  </body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

export default function LitigationToolkit({ dark }: LitigationToolkitProps) {
  const [calcState, setCalcState] = useState<CalculatorState | null>(null);
  const [advocateState, setAdvocateState] = useState<AdvocateState | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const cardBg = dark ? 'border-white/10 bg-[#18181B]' : 'border-slate-200 bg-white';
  const sectionLabel = dark ? 'text-slate-500' : 'text-slate-400';
  const textPrimary = dark ? 'text-white' : 'text-slate-900';

  const handleCalcChange = useCallback((state: CalculatorState) => {
    setCalcState(state);
  }, []);

  const handleAdvocateChange = useCallback((state: AdvocateState) => {
    setAdvocateState(state);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page intro + Download button */}
      <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/15 ring-1 ring-crimson/30">
            <Wrench className="h-5 w-5 text-crimson" />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${textPrimary}`}>Litigation Toolkit</h2>
            <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              All-in-one terminal: court delay calculator, NCRB crime statistics, advocate screening, and legal tech directory
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowEmailModal(true)}
          className="flex items-center gap-2 rounded-xl bg-crimson px-5 py-3 text-sm font-bold text-white shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-dark hover:shadow-crimson/30"
        >
          <Download className="h-4 w-4" />
          Download Complete Toolkit Report
        </button>
      </div>

      {/* Section A: Court Delay Calculator */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${sectionLabel}`}>Section A</span>
          <span className={`h-px flex-1 ${dark ? 'bg-white/10' : 'bg-slate-300'}`} />
        </div>
        <div className={`overflow-hidden rounded-2xl border shadow-lg ${cardBg}`}>
          <div className="p-5 sm:p-6">
            <CourtDelayCalculatorPanel dark={dark} onStateChange={handleCalcChange} />
          </div>
        </div>
      </div>

      {/* Section B: NCRB Crime Tracker */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${sectionLabel}`}>Section B</span>
          <span className={`h-px flex-1 ${dark ? 'bg-white/10' : 'bg-slate-300'}`} />
        </div>
        <div className={`overflow-hidden rounded-2xl border shadow-lg ${cardBg}`}>
          <div className="p-5 sm:p-6">
            <NCRBCrimeTrackerPanel dark={dark} />
          </div>
        </div>
      </div>

      {/* Section C: Advocate Screening Matrix */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${sectionLabel}`}>Section C</span>
          <span className={`h-px flex-1 ${dark ? 'bg-white/10' : 'bg-slate-300'}`} />
        </div>
        <div className={`overflow-hidden rounded-2xl border shadow-lg ${cardBg}`}>
          <div className="p-5 sm:p-6">
            <AdvocateScreeningPanel dark={dark} onStateChange={handleAdvocateChange} />
          </div>
        </div>
      </div>

      {/* Section D: Legal Tech Stack Directory */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${sectionLabel}`}>Section D</span>
          <span className={`h-px flex-1 ${dark ? 'bg-white/10' : 'bg-slate-300'}`} />
        </div>
        <div className={`overflow-hidden rounded-2xl border shadow-lg ${cardBg}`}>
          <div className="p-5 sm:p-6">
            <TechStackPanel dark={dark} />
          </div>
        </div>
      </div>

      {/* Email Capture Modal (lead gate for report download) */}
      <EmailCaptureModal
        open={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSuccess={() => {
          setShowEmailModal(false);
          generateReport(calcState, advocateState);
        }}
        calcState={calcState}
        advocateState={advocateState}
        dark={dark}
      />
    </div>
  );
}
