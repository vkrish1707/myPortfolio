'use client';

import { motion } from 'framer-motion';
import { experience } from '@/lib/resume';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ExperienceTimeline() {
  return (
    <section className="px-6 lg:px-10 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="Trajectory"
          title="A decade of shipping."
          description="From Accenture in 2016 to leading AI platforms at AMD in 2025. The constant: full-stack ownership, real users, real volume."
        />

        <div className="relative">
          {/* central vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-violet/50 via-white/10 to-transparent" />

          <div className="space-y-12">
            {experience.map((e, i) => (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8"
              >
                {/* dot */}
                <div className="absolute left-[10px] md:left-1/2 top-3 -translate-x-1/2 h-3 w-3 rounded-full bg-accent-violet ring-4 ring-bg" />

                {/* left/right alternating on md+ */}
                <div className={i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:order-2 md:pl-10'}>
                  <div className="text-xs font-mono uppercase tracking-wider text-accent-violet">
                    {e.duration}
                  </div>
                  <h3 className="font-display text-2xl font-bold mt-1">{e.company}</h3>
                  <p className="text-sm text-ink-muted">{e.role} · {e.location}</p>
                </div>
                <div className={i % 2 === 0 ? 'mt-3 md:mt-0 md:pl-10' : 'mt-3 md:mt-0 md:pr-10 md:order-1 md:text-right'}>
                  <p className="text-sm md:text-base text-ink">{e.headline}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
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
        </div>
      </div>
    </section>
  );
}
