// A hang-tag badge — a rectangular body on a straight corded string through
// a grommet, styled after a real garment price tag left dangling.
export default function SoldOutTag() {
    return (
        <div
            className="absolute top-0 left-3 z-10 w-16"
            style={{ transform: 'rotate(-9deg)', transformOrigin: 'top center' }}
        >
            <svg viewBox="0 0 60 56" className="w-full h-auto overflow-visible" aria-hidden="true">
                {/* straight string, as if dangling from above */}
                <line
                    x1="30" y1="22" x2="30" y2="0"
                    stroke="#A9967D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
                {/* tag body — rectangle with clipped corners, not a pointed roof */}
                <path
                    d="M8,22 L52,22 L58,28 L58,44 L52,50 L8,50 L2,44 L2,28 Z"
                    fill="#C23B22"
                />
                {/* stamped-look inner border for urgency, like a clearance stamp */}
                <path
                    d="M11,25 L49,25 L55,30 L55,42 L49,47 L11,47 L5,42 L5,30 Z"
                    fill="none"
                    stroke="#FCFBF9"
                    strokeWidth="1.2"
                    strokeDasharray="2.5 2"
                />
                {/* grommet */}
                <circle cx="30" cy="22" r="4.5" fill="#FCFBF9" stroke="#C23B22" strokeWidth="1.5" />
            </svg>
            <div
                className="absolute flex items-center justify-center"
                style={{ top: '39%', left: '3%', width: '94%', height: '50%' }}
            >
                <span className="font-sans text-paper text-[7.5px] font-bold uppercase tracking-[0.06em] leading-tight text-center">
                    Sold Out
                </span>
            </div>
        </div>
    );
}
