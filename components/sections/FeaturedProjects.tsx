'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/resume';
import SectionTitle from '@/components/ui/SectionTitle';
import { cn } from '@/lib/utils';

const accentMap: Record<string, string> = {
  violet: 'from-accent-violet/30 to-accent-violet/0',
  cyan: 'from-accent-cyan/30 to-accent-cyan/0',
  rose: 'from-accent-rose/30 to-accent-rose/0',
};

export default function FeaturedProjects() {
  return (
    <section className="px-6 lg:px-10 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Selected work · AI-native"
          title="Built for agents, by an engineer."
          description="A few things I've built that explore how humans and AI can co-own software."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 hover:bg-white/[0.04] transition"
              data-cursor-hover
            >
              <div
                className={cn(
                  'absolute -top-12 -right-12 h-44 w-44 rounded-full blur-3xl bg-gradient-to-br opacity-60 group-hover:opacity-100 transition',
                  accentMap[p.accent] ?? accentMap.violet
                )}
              />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight">{p.name}</h3>
                    <p className="text-xs text-ink-muted mt-1">{p.status}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-ink-dim group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
                <p className="mt-4 text-sm text-ink-muted leading-relaxed line-clamp-4">{p.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] uppercase tracking-wide rounded-full border border-white/10 px-2 py-0.5 text-ink-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium hover:bg-white/5 transition"
          >
            View all projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
