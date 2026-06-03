 interface TinySpinnerProps {
  size?: number; // matches the icon size passed in
}

export default function TinySpinner({ size = 16 }: TinySpinnerProps) {
  return (
    <span
      className="block rounded-full border-2 border-gray-200 border-t-gray-600 animate-spin"
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  );
}