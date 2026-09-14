// Shared styling for every auth form field (Login, Signup, Forgot/Reset
// Password) — single source of truth so the four screens can't drift out
// of sync with each other again.
export const INPUT_CLASS =
    "w-full rounded-lg border border-line bg-surface px-4 py-3.5 font-sans text-[14px] text-ink placeholder:text-muted/60 outline-none transition-colors duration-200 focus:border-ink/50 focus:bg-paper";

// No bottom margin baked in on purpose: Tailwind resolves same-specificity
// utility conflicts (e.g. mb-2 vs mb-0) by the order it emits them in the
// generated stylesheet, not by class-string order, so appending "mb-0" to
// override a margin already in this constant is not reliable. Callers add
// their own spacing (`${LABEL_CLASS} mb-2`) instead of trying to cancel one.
export const LABEL_CLASS =
    "block font-sans text-muted font-medium uppercase tracking-[0.14em] text-[10px]";
