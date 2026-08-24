const TRACKING_STEPS = ["Order Placed", "Packed", "In Transit", "Out for Delivery"];

export const TRACKING_STEP_COUNT = TRACKING_STEPS.length;

interface OrderTrackingProps {
  completedCount: number;
  activeColor: string;
  placedDate: string;
}

export default function OrderTracking({
  completedCount,
  activeColor,
  placedDate,
}: OrderTrackingProps) {
  return (
    <div className="flex flex-col gap-3">
      <p
        className="hidden sm:block text-[17px] font-semibold text-[#1a1a1a]"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        Order Tracking
      </p>
      <div className="-mx-4 sm:mx-0 rounded-none sm:rounded-2xl border-0 sm:border sm:border-[#f0f0f0] px-1 py-3 sm:p-6">
        <div className="flex items-start justify-between">
          {TRACKING_STEPS.map((label, i) => {
            const isDone = i < completedCount;
            return (
              <div key={label} className="relative flex flex-1 flex-col items-center">
                {i < TRACKING_STEPS.length - 1 && (
                  <div
                    className="absolute top-3 sm:top-3.5 left-1/2 h-[2px] w-full"
                    style={{ backgroundColor: i + 1 < completedCount ? activeColor : "#e5e5e5" }}
                  />
                )}
                <div
                  className="z-10 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-[12px] sm:text-[13px] font-medium"
                  style={
                    isDone
                      ? { backgroundColor: activeColor, color: "#fff" }
                      : { border: "2px solid #d8d8d8", color: "#8a8a8a", background: "#fff" }
                  }
                >
                  {i + 1}
                </div>
                <p
                  className="mt-2 sm:mt-3 text-center text-[11px] sm:text-[14px] font-medium leading-tight"
                  style={{
                    fontFamily: "Cairo, sans-serif",
                    color: isDone ? activeColor : "#8a8a8a",
                  }}
                >
                  {label}
                </p>
                <p
                  className="hidden sm:block mt-0.5 text-center text-[13px] text-[#b0b0b0] leading-tight"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  {i === 0 ? placedDate : isDone ? "Completed" : "Pending"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
