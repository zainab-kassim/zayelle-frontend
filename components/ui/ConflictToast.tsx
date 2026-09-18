import { motion } from "framer-motion";

export function ConflictToast() {
  return (
    <motion.div
      animate={{ x: [0, -8, 8, -8, 8, 0] }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex items-center gap-3 bg-paper text-red-600 border border-line px-4 py-3 rounded-xl shadow-[0_12px_28px_rgba(23,23,26,0.1)]"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" aria-hidden="true">
        <path d="M12 9v4M12 17h.01" />
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      </svg>
      <p className="font-sans text-[13px] font-medium">
        This time slot is unavailable. Please choose another time.
      </p>
    </motion.div>
  );
}