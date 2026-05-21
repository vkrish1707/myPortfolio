'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Sparkles, MapPin, Phone } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import AITwin from '@/components/ai-twin/AITwin';
import { profile } from '@/lib/resume';
import YinYangSymbol from '@/components/ui/YinYangSymbol';

export default function ContactPage() {
  return (
    <>
      <section className="px-6 lg:px-10 pt-32 pb-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle
            eyebrow="Contact"
            title="Let's talk."
            description="Hiring, partnering, or just want to nerd out about MCP servers? Pick a channel."
          />

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div className="space-y-4">
              {[
                { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
                { icon: Phone, label: profile.phone, href: `tel:${profile.phone}` },
                { icon: Linkedin, label: 'linkedin.com/in/vamsi-krishna-mylavarapu', href: profile.linkedin },
                { icon: MapPin, label: profile.location, href: '' },
              ].map((c, i) => {
                const Icon = c.icon;
                const inner = (
                  <div className="flex items-center gap-4 rounded-2xl glass p-5 hover:bg-white/5 transition">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-accent-violet/30 to-accent-cyan/30 flex items-center justify-center ring-1 ring-white/10">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm md:text-base font-medium">{c.label}</span>
                  </div>
                );
                return (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </motion.div>
                );
              })}

              <motion.button
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                onClick={() => document.dispatchEvent(new CustomEvent('open-ai-twin'))}
                className="w-full flex items-center gap-4 rounded-2xl bg-gradient-to-tr from-accent-violet/15 to-accent-cyan/15 border border-accent-violet/30 p-5 hover:from-accent-violet/25 hover:to-accent-cyan/25 transition"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-accent-violet to-accent-cyan flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm md:text-base font-semibold">Talk to my AI twin first</div>
                  <div className="text-xs text-ink-muted">Voice + chat. Find out if I'm a fit before reaching out.</div>
                </div>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="h-80 lg:h-96"
            >
              <YinYangSymbol state="idle" size="md" parallax />
            </motion.div>
          </div>
        </div>
      </section>

      <AITwin />
    </>
  );
}
