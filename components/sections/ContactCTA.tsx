'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Mail, Linkedin } from 'lucide-react';
import { profile } from '@/lib/resume';

export default function ContactCTA() {
  return (
    <section className="px-6 lg:px-10 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl relative overflow-hidden rounded-3xl glass p-10 md:p-14 text-center"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent-violet/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-accent-cyan/15 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Let's build the <span className="text-gradient-violet">AI-native</span> thing.
          </h2>
          <p className="mt-4 text-ink-muted max-w-xl mx-auto">
            Hiring, partnering, or just want to nerd out about MCP servers and multi-LLM routing? My inbox is open.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-accent-violet to-accent-cyan px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-violet/20 hover:shadow-accent-violet/40 transition"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold hover:bg-white/5 transition"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink transition"
            >
              Contact page <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
