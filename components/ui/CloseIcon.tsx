interface CloseIconProps {
  size?: number;
  strokeWidth?: number;
}

// Shared "X" close/dismiss glyph used by modals, drawers, and toasts.
export default function CloseIcon({ size = 16, strokeWidth = 1.6 }: CloseIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
