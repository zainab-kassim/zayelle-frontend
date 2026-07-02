import { motion } from "framer-motion";
import Image from "next/image";

export function ConflictToast() {
  return (
    <motion.div
      animate={{ x: [0, -8, 8, -8, 8, 0] }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex items-center gap-3 bg-white text-red-500 px-4 py-3 rounded-xl shadow-lg"
    >
      <span className="text-lg">
        <Image src="https://img.icons8.com/?size=100&id=67F23l3ehnE5&format=png&color=000000" alt="Warning" width={30} height={30} />
      </span>
      <p className="text-sm font-medium">
        This time slot is unavailable. Please choose another time.
      </p>
    </motion.div>
  );
}