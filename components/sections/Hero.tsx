'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { profile } from '@/lib/resume';
import YinYangOrb from '@/components/three/YinYangOrbClient';

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] pt-28 pb-16 px-6 lg:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        {/* Left — copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-violet opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-violet" />
            </span>
            <span className="text-xs font-mono tracking-wide text-ink-muted">
              Currently leading AI platforms at AMD
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95]"
          >
            <span className="block">Hi, I'm</span>
            <span className="block text-gradient bg-[length:200%_auto] animate-gradient">
              {profile.shortName}.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg sm:text-xl text-ink-muted max-w-xl leading-relaxed"
          >
            I build <span className="text-ink">AI-native platforms</span> where humans
            and agents work as one. {profile.yearsOfExperience}+ years full-stack —
            currently leading an <span className="text-ink">AI-powered program
            management platform</span> at AMD.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              data-cursor-hover
              onClick={() => {
                document.dispatchEvent(new CustomEvent('open-ai-twin'));
              }}
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-accent-violet to-accent-cyan px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-violet/20 hover:shadow-accent-violet/40 transition"
            >
              <Sparkles className="h-4 w-4" />
              Talk to my AI twin
              <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition" />
            </button>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold hover:bg-white/5 transition"
            >
              See projects <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 grid grid-cols-3 max-w-md gap-6"
          >
            <Stat value="10+" label="years shipping" />
            <Stat value="100+" label="REST endpoints @ AMD" />
            <Stat value="100k/s" label="Kafka events @ Hexaware" />
          </motion.div>
        </div>

        {/* Right — orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative h-[28rem] lg:h-[34rem] flex items-center justify-center"
        >
          <YinYangOrb state="idle" size="lg" />
          {/* Caption */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center w-full px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-dim">
              ☯ &nbsp; me + ai &nbsp; ☯
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-ink-dim"
      >
        scroll
      </motion.div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl sm:text-3xl font-bold text-gradient">
        {value}
      </div>
      <div className="text-xs text-ink-muted mt-1">{label}</div>
    </div>
  );
}
