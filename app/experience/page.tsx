'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import AITwin from '@/components/ai-twin/AITwin';
import { experience } from '@/lib/resume';
import { Sparkles } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <>
      <section className="px-6 lg:px-10 pt-32 pb-12">
        <div className="mx-auto max-w-5xl">
          <SectionTitle
            eyebrow="Experience"
            title="Ten years of shipping production software."
            description="Banking, semiconductors, logistics, ed-tech. The thread: full-stack ownership, real users, and an obsession with shipping the thing."
          />
          <button
            onClick={() => document.dispatchEvent(new CustomEvent('open-ai-twin'))}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm hover:bg-white/5 transition mb-6"
          >
            <Sparkles className="h-4 w-4 text-accent-violet" />
            Ask my AI twin about any role
          </button>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-5xl space-y-6">
          {experience.map((e, i) => (
            <motion.article
              key={e.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative overflow-hidden rounded-2xl glass p-6 md:p-8"
            >
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent-violet/10 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                    {e.company}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-accent-violet">
                    {e.duration}
                  </span>
                </div>
                <p className="text-sm text-ink-muted mb-1">
                  {e.role} · {e.location}
                </p>
                <p className="text-base md:text-lg text-ink mt-3 leading-relaxed">
                  {e.headline}
                </p>

                <ul className="mt-5 space-y-2">
                  {e.highlights.map((h, j) => (
                    <li key={j} className="flex gap-3 text-sm text-ink-muted leading-relaxed">
                      <span className="mt-2 h-1 w-1 rounded-full bg-accent-violet flex-none" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-wide rounded-full border border-white/10 px-2 py-0.5 text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <AITwin />
    </>
  );
}
