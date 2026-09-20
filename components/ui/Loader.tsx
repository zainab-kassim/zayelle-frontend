interface LoaderProps {
  // any 6-digit hex — dims itself for the alternating dot by appending alpha
  color?: string;
}

export default function Loader({ color }: LoaderProps) {
  const style = color
    ? ({ '--loader-color': color, '--loader-color-dim': `${color}33` } as React.CSSProperties)
    : undefined;

  return <div className="loader" style={style}></div>;
}
