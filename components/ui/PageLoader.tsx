interface PageLoaderProps {
    label?: string;
    size?: number;
    className?: string;
}

// three concentric rings for page-level loading (not an inline button spinner);
// uses currentColor + text tokens so it stays in sync with palette changes
export default function PageLoader({ label = "Loading", size = 64, className = "" }: PageLoaderProps) {
    return (
        <span role="status" aria-live="polite" className={`inline-block ${className}`}>
            <svg width={size} height={size} viewBox="0 0 50 50" fill="none" aria-hidden="true">
                <circle
                    cx="25" cy="25" r="20"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    pathLength={100} strokeDasharray="70 30"
                    className="page-loader__ring page-loader__ring--outer text-line"
                />
                <circle
                    cx="25" cy="25" r="14"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    pathLength={100} strokeDasharray="65 35"
                    className="page-loader__ring page-loader__ring--mid text-muted"
                />
                <circle
                    cx="25" cy="25" r="8"
                    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
                    pathLength={100} strokeDasharray="60 40"
                    className="page-loader__ring page-loader__ring--inner text-ink"
                />
            </svg>
            <span className="sr-only">{label}</span>
        </span>
    );
}
