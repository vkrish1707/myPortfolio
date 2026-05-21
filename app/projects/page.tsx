'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import AITwin from '@/components/ai-twin/AITwin';
import { projects } from '@/lib/resume';
import { cn } from '@/lib/utils';

const accentMap: Record<string, string> = {
  violet: 'from-accent-violet/30 to-transparent',
  cyan: 'from-accent-cyan/30 to-transparent',
  rose: 'from-accent-rose/30 to-transparent',
};

export default function ProjectsPage() {
  return (
    <>
      <section className="px-6 lg:px-10 pt-32 pb-10">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Projects"
            title="What I build when nobody is paying me."
            description="Side projects, OSS, freelance — focused on AI orchestration, MCP servers, and agentic workflows."
          />
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-6xl space-y-10">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={cn(
                'relative overflow-hidden rounded-3xl glass p-6 md:p-10 grid md:grid-cols-[1fr_1.2fr] gap-8 items-center',
                i % 2 === 1 && 'md:[grid-template-columns:1.2fr_1fr]'
              )}
            >
              <div
                className={cn(
                  'absolute -top-20 right-0 h-72 w-72 rounded-full blur-3xl bg-gradient-to-br',
                  accentMap[p.accent] ?? accentMap.violet
                )}
              />

              {/* visual */}
              <div className={cn('relative aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 bg-bg-elevated', i % 2 === 1 && 'md:order-2')}>
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-dim mb-2">
                    Preview · placeholder
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-bold text-gradient">
                    {p.name}
                  </div>
                  <div className="mt-2 text-xs text-ink-muted max-w-xs">
                    Drop an image at <span className="font-mono">public{p.image}</span> to replace this.
                  </div>
                </div>
              </div>

              {/* copy */}
              <div className="relative">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent-violet">
                  {p.status}
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-2">
                  {p.name}
                </h3>
                <p className="text-sm text-ink-muted mt-1">{p.fullName}</p>
                <p className="text-base text-ink mt-4 leading-relaxed">{p.description}</p>

                <ul className="mt-5 space-y-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-ink-muted">
                      <span className="mt-2 h-1 w-1 rounded-full bg-accent-violet flex-none" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] uppercase tracking-wide rounded-full border border-white/10 px-2 py-0.5 text-ink-muted"
                    >
                      {s}
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
