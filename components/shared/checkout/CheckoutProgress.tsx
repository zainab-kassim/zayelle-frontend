"use client";

import { motion } from "framer-motion";

interface CheckoutProgressProps {
  currentStep: 1 | 2 | 3;
}

const STEPS = [
  { number: 1, label: "Address" },
  { number: 2, label: "Payment" },
  { number: 3, label: "Confirm" },
];

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <div className="flex items-center justify-center w-full max-w-xs mx-auto mb-6 sm:mb-8">
      {STEPS.map((step, idx) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isLast = idx === STEPS.length - 1;
        const isFilled = isActive || isCompleted;

        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  backgroundColor: isFilled ? "#17171A" : "#FCFBF9",
                  borderColor: isFilled ? "#17171A" : "#E7E3DC",
                  color: isFilled ? "#FCFBF9" : "#726B60",
                }}
                transition={{ duration: 0.3 }}
                className="w-7 h-7 rounded-full border flex items-center justify-center font-sans text-[11px] font-medium"
              >
                {step.number}
              </motion.div>
              <span
                className={`font-sans text-[9px] uppercase tracking-[0.08em] whitespace-nowrap ${
                  isActive ? "text-ink font-medium" : "text-muted font-normal"
                }`}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div className="flex-1 h-px mx-2 bg-line relative -mt-4">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-ink"
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
