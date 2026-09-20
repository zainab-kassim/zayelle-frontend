"use client";

import { motion } from "framer-motion";

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
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        {TRACKING_STEPS.map((label, i) => {
          const isDone = i < completedCount;
          return (
            <div key={label} className="relative flex flex-1 flex-col items-center">
              {i < TRACKING_STEPS.length - 1 && (
                <div className="absolute top-3 sm:top-3.5 left-1/2 h-px w-full bg-line">
                  <motion.div
                    className="absolute inset-y-0 left-0 h-px"
                    style={{ backgroundColor: activeColor }}
                    animate={{ width: i + 1 < completedCount ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              )}
              <motion.div
                className="z-10 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full font-sans text-[12px] sm:text-[13px] font-medium border"
                animate={
                  isDone
                    ? { backgroundColor: activeColor, borderColor: activeColor, color: "#FCFBF9" }
                    : { backgroundColor: "#FCFBF9", borderColor: "#E7E3DC", color: "#726B60" }
                }
                transition={{ duration: 0.3 }}
              >
                {i + 1}
              </motion.div>
              <p
                className="mt-2 sm:mt-3 text-center font-sans text-[10px] sm:text-[12.5px] font-normal leading-tight"
                style={{ color: isDone ? activeColor : "#726B60" }}
              >
                {label}
              </p>
              <p className="hidden sm:block mt-0.5 text-center font-sans text-muted/70 text-[13px] leading-tight">
                {i === 0 ? placedDate : isDone ? "Completed" : "Pending"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
