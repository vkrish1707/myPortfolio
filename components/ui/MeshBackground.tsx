'use client';

import { motion } from 'framer-motion';

export default function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-starfield opacity-30" />

      {/* slow drifting glow blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-32 h-[42rem] w-[42rem] rounded-full bg-accent-violet/20 blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-accent-cyan/15 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 left-1/3 h-[34rem] w-[34rem] rounded-full bg-accent-rose/10 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/80" />
    </div>
  );
}
