interface PageLoaderProps {
    label?: string;
    size?: number;
    className?: string;
}

// Three concentric rings, each spinning at its own speed/direction, in the
// site's own ink/muted/line tones — a quieter, monochrome take on the
// classic "orbiting rings" spinner, sized for a route/page-level loading
// state (Suspense fallback) rather than an inline button spinner.
export default function PageLoader({ label = "Loading", size = 64, className = "" }: PageLoaderProps) {
    return (
        <span role="status" aria-live="polite" className={`inline-block ${className}`}>
            <svg width={size} height={size} viewBox="0 0 50 50" fill="none" aria-hidden="true">
                <circle
                    cx="25" cy="25" r="20"
                    stroke="#E7E3DC" strokeWidth="1.5" strokeLinecap="round"
                    pathLength={100} strokeDasharray="70 30"
                    className="page-loader__ring page-loader__ring--outer"
                />
                <circle
                    cx="25" cy="25" r="14"
                    stroke="#726B60" strokeWidth="1.5" strokeLinecap="round"
                    pathLength={100} strokeDasharray="65 35"
                    className="page-loader__ring page-loader__ring--mid"
                />
                <circle
                    cx="25" cy="25" r="8"
                    stroke="#17171A" strokeWidth="1.75" strokeLinecap="round"
                    pathLength={100} strokeDasharray="60 40"
                    className="page-loader__ring page-loader__ring--inner"
                />
            </svg>
            <span className="sr-only">{label}</span>
        </span>
    );
}
