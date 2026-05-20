'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import AITwin from '@/components/ai-twin/AITwin';
import { profile, education, certifications } from '@/lib/resume';
import YinYangOrb from '@/components/three/YinYangOrbClient';

const principles = [
  {
    title: 'AI as a teammate, not a toy.',
    body: 'Every project I build is designed for humans and AI agents to share the work. MCP servers, governed tool calls, multi-LLM routing — the agent is a first-class citizen.',
  },
  {
    title: 'Ship the boring, then ship the magic.',
    body: 'Real users need fast, accessible, reliable UI before they care about the wow. WCAG, RBAC, audit trails, error boundaries — then the streaming agents and 3D orbs.',
  },
  {
    title: 'Own the whole stack.',
    body: 'From shader code to PL/SQL. From Kafka consumers to Tailwind tokens. Full-stack means I can debug, decide, and ship without waiting on five other teams.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="px-6 lg:px-10 pt-32 pb-16">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div>
            <SectionTitle
              eyebrow="About"
              title="Senior full-stack, leaning hard into AI."
              description={profile.summary}
            />
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => document.dispatchEvent(new CustomEvent('open-ai-twin'))}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm hover:bg-white/5 transition"
            >
              <Sparkles className="h-4 w-4 text-accent-violet" />
              Or ask my AI twin instead
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative h-80 lg:h-96"
          >
            <YinYangOrb state="idle" size="md" />
          </motion.div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-16">
        <div className="mx-auto max-w-6xl">
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-10">
            How I work.
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl glass p-6"
              >
                <div className="font-mono text-xs text-accent-violet mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h4 className="font-display text-xl font-bold tracking-tight mb-3">
                  {p.title}
                </h4>
                <p className="text-sm text-ink-muted leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl glass p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-violet mb-3">
              Education
            </h3>
            <p className="text-lg font-semibold">{education.degree}</p>
            <p className="text-sm text-ink-muted">{education.school}</p>
            <p className="text-xs text-ink-dim mt-1">{education.note}</p>
          </div>
          <div className="rounded-2xl glass p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-violet mb-3">
              Certifications
            </h3>
            <ul className="space-y-1">
              {certifications.map((c) => (
                <li key={c} className="text-sm text-ink-muted">• {c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AITwin />
    </>
  );
}
