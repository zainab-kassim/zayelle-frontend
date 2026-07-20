// components/checkout/CheckoutProgress.tsx
"use client";

import { motion } from "framer-motion";

interface CheckoutProgressProps {
  currentStep: 1 | 2 | 3;
}

const STEPS = [
  { number: 1, label: "Address" },
  { number: 2, label: "Review" },
  { number: 3, label: "Confirm" },
];

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <div className="flex items-center justify-center w-full max-w-lg mx-auto mb-8">
      {STEPS.map((step, idx) => {
        const isActive    = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isLast      = idx === STEPS.length - 1;

        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              {/* Circle */}
              <motion.div
                animate={{
                  background: isActive || isCompleted ? "#1a1a1a" : "#fff",
                  borderColor: isActive || isCompleted ? "#1a1a1a" : "#d0d0d0",
                  color: isActive || isCompleted ? "#fff" : "#aaa",
                }}
                transition={{ duration: 0.3 }}
                className="w-9 h-9 rounded-full border flex items-center justify-center text-[13px] font-semibold"
              >
                {step.number}
              </motion.div>
              {/* Label */}
              <span
                className={`text-[12px] tracking-wide whitespace-nowrap ${
                  isActive ? "font-semibold text-[#1a1a1a]" : "text-[#aaa] font-normal"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="flex-1 h-px mx-3 bg-[#e0e0e0] relative -mt-5">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#1a1a1a]"
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