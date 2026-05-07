'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroDresses() {
  return (
    <div className="relative pt-5 lg:pt-32 md:w-[400px] lg:w-[520px] h-[420px]">

      {/* PNG1 — Red dress, left */}
      <motion.div
        className="absolute md:bottom-14 lg:bottom-0 md:left-[-30px] lg:left-[-16px]"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0.6, opacity: 1 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <Image
          src="/dresses/dress-red.png"
          alt="Red dress"
          width={260}
          height={380}
           className="w-[260px] h-[400px] lg:w-[310px] lg:h-[567px]"
          style={{ objectFit: 'contain' }}
        />
      </motion.div>

      {/* PNG2 — Black dress, center, z-10 */}
      <motion.div
        className="absolute md:bottom-28 lg:bottom-12 z-10"
        style={{ left: '-15px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18, delay: 0.08, ease: 'easeOut' }}
      >
        <Image
          src="/dresses/dress-black.png"
          alt="Black dress"
          width={800}
          height={940}
          className="w-[900px] h-[200px] md-[1000px] md:h-[270px] lg:w-[800px] lg:h-[400px]"
          style={{ objectFit: 'contain' }}
        />
      </motion.div>

      {/* PNG3 — Pink dress, right */}
      <motion.div
        className="absolute md:bottom-[9rem] lg:bottom-[8.1rem] right-[-9px] lg:right-[-20px]"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0.6, opacity: 1 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <Image
          src="/dresses/dress-pink.png"
          alt="Pink dress"
          width={270}
          height={380}
          className="w-[200px] h-[270px] lg:w-[290px] lg:h-[360px]"
          style={{ objectFit: 'contain' }}
        />
      </motion.div>

    </div>
  );
}