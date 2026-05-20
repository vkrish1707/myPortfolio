'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-5">
        <div className="glass rounded-2xl px-4 py-2.5 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Home"
          >
            <span className="relative inline-flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-violet via-accent-cyan to-accent-rose blur-sm opacity-70 group-hover:opacity-100 transition" />
              <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-bg ring-1 ring-white/10">
                <span className="text-[10px] font-mono font-bold tracking-tight">VK</span>
              </span>
            </span>
            <span className="hidden sm:block text-sm font-medium tracking-tight">
              Vamsi<span className="text-ink-muted"> · </span>
              <span className="text-ink-muted">AI-native dev</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    'relative rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors',
                    active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/5 ring-1 ring-white/10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
