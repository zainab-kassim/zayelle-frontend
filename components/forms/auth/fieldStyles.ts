// shared field styling across all four auth screens
export const INPUT_CLASS =
    "w-full rounded-lg border border-line bg-surface px-4 py-3.5 font-sans text-[14px] text-ink placeholder:text-muted/60 outline-none transition-colors duration-200 focus:border-ink/50 focus:bg-paper";

// no margin baked in — appending mb-0 to override isn't reliable with
// same-specificity Tailwind utilities, so callers add their own spacing
export const LABEL_CLASS =
    "block font-sans text-muted font-medium uppercase tracking-[0.14em] text-[10px]";
