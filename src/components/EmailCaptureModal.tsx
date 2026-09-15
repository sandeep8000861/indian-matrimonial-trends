import { useState, useEffect, type FormEvent } from 'react';
import { X, Mail, User, FileText, ShieldCheck, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import type { CalculatorState } from './CourtDelayCalculatorPanel';
import type { CaseTypeKey, AdvocateQuestion } from '@/data/toolkit';

interface EmailCaptureModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  calcState: CalculatorState | null;
  advocateState: { selectedKey: CaseTypeKey; questions: AdvocateQuestion[] } | null;
  dark: boolean;
}

export default function EmailCaptureModal({
  open,
  onClose,
  onSuccess,
  calcState,
  advocateState,
  dark,
}: EmailCaptureModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [optIn, setOptIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setFullName('');
      setEmail('');
      setOptIn(false);
      setError(null);
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from('report_leads').insert({
        full_name: fullName.trim(),
        email: email.trim(),
        opt_in_alerts: optIn,
        calculator_state: calcState ?? null,
        advocate_case_type: advocateState?.selectedKey ?? null,
      });

      if (dbError) {
        console.warn('Lead save failed, proceeding with download:', dbError.message);
      }
    } catch (err) {
      console.warn('Lead save exception, proceeding with download:', err);
    }

    setSubmitting(false);
    onSuccess();
  };

  const overlayClass = 'fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6';
  const backdropClass = 'absolute inset-0 bg-black/70 backdrop-blur-md';
  const modalClass = dark
    ? 'relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#09090B] shadow-2xl'
    : 'relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl';
  const textPrimary = dark ? 'text-white' : 'text-slate-900';
  const textSecondary = dark ? 'text-slate-400' : 'text-slate-500';
  const textTertiary = dark ? 'text-slate-300' : 'text-slate-600';
  const inputClass = dark
    ? 'w-full rounded-lg border border-white/10 bg-slate-800/80 px-4 py-3 pl-11 text-sm text-slate-100 outline-none transition focus:border-crimson/50 focus:ring-2 focus:ring-crimson/20 placeholder:text-slate-500'
    : 'w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100 placeholder:text-slate-400';

  return (
    <div className={overlayClass} role="dialog" aria-modal="true" aria-labelledby="email-capture-title">
      <div className={backdropClass} onClick={onClose} />

      <div className={`${modalClass} animate-[fadeInUp_0.25s_ease-out]`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg transition ${
            dark ? 'text-slate-500 hover:bg-white/5 hover:text-slate-300' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
          }`}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          {/* Header icon */}
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-crimson/15 ring-1 ring-crimson/30">
            <FileText className="h-6 w-6 text-crimson" />
          </div>

          {/* Title */}
          <h2 id="email-capture-title" className={`text-xl font-bold leading-tight sm:text-2xl ${textPrimary}`}>
            Unlock Your Customized Litigation Prep Report
          </h2>
          <p className={`mt-2 text-sm leading-relaxed ${textSecondary}`}>
            Enter your details below to instantly download and print your comprehensive, data-backed NCRB timeline strategy and advocate screening matrix.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="lead-name" className={`mb-1.5 block text-xs font-semibold ${textSecondary}`}>
                Full Name
              </label>
              <div className="relative">
                <User className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${dark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  id="lead-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className={inputClass}
                  autoComplete="name"
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="lead-email" className={`mb-1.5 block text-xs font-semibold ${textSecondary}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${dark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  id="lead-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                  autoComplete="email"
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Opt-in checkbox */}
            <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition ${
              dark ? 'border-white/10 bg-white/[0.03] hover:border-white/20' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
            }`}>
              <input
                type="checkbox"
                checked={optIn}
                onChange={(e) => setOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded accent-crimson"
                disabled={submitting}
              />
              <span className={`text-xs leading-relaxed ${textTertiary}`}>
                Receive daily alerts on emerging matrimonial legal trends and BNS/BNSS statutory updates.
              </span>
            </label>

            {/* Error message */}
            {error && (
              <p className="text-xs font-medium text-rose-400" role="alert">
                {error}
              </p>
            )}

            {/* Privacy guarantee */}
            <div className={`flex items-start gap-2 rounded-lg border p-3 ${
              dark ? 'border-emerald-400/15 bg-emerald-500/[0.05]' : 'border-emerald-200 bg-emerald-50'
            }`}>
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
              <p className={`text-[11px] leading-relaxed ${dark ? 'text-emerald-200/70' : 'text-emerald-700/80'}`}>
                <span className="font-semibold">Zero Spam Guarantee.</span>{' '}
                Your personal email context is encrypted and processed in strict alignment with our non-disclosure data parameters.
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-crimson px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-crimson/20 transition-all hover:bg-crimson-dark hover:shadow-crimson/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Preparing your report...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Generate &amp; Download PDF
                </>
              )}
            </button>
          </form>

          {/* Cancel link */}
          <button
            onClick={onClose}
            className={`mt-4 w-full text-center text-xs font-medium transition ${
              dark ? 'text-slate-600 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
