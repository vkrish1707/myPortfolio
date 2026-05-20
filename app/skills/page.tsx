'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import AITwin from '@/components/ai-twin/AITwin';
import { skillGroups } from '@/lib/resume';

export default function SkillsPage() {
  return (
    <>
      <section className="px-6 lg:px-10 pt-32 pb-10">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Toolbelt"
            title="The full stack — and the AI layer on top."
            description="What I actually reach for daily. Not a Wikipedia dump — the things I've shipped real systems with."
          />
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl glass p-6"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-violet mb-4">
                {g.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-sm text-ink-muted hover:text-ink hover:border-white/20 transition cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AITwin />
    </>
  );
}
