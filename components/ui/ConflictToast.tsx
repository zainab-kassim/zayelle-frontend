import { motion } from "framer-motion";

export function ConflictToast() {
  return (
    <motion.div
      animate={{ x: [0, -8, 8, -8, 8, 0] }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex items-center gap-3 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg"
    >
      <span className="text-lg">⚠️</span>
      <p className="text-sm font-medium">
        This time slot is unavailable. Please choose another time.
      </p>
    </motion.div>
  );
}