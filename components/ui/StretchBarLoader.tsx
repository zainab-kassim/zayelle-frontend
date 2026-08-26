interface StretchBarLoaderProps {
  width?: number;
  height?: number;
  color?: string;
  pulseColor?: string;
  label?: string;
  className?: string;
}

export default function StretchBarLoader({
  width = 120,
  height = 4,
  color = '#1a1a1a',
  pulseColor = '#8a8a8a',
  label = 'Loading',
  className = '',
}: StretchBarLoaderProps) {
  const style = {
    width,
    height,
    borderRadius: height / 2,
    '--stretch-color-1': color,
    '--stretch-color-2': pulseColor,
  } as React.CSSProperties;

  return (
    <span
      role="status"
      aria-live="polite"
      className={`stretch-bar-loader inline-block ${className}`}
      style={style}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}
