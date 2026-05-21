'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import type { OrbState } from './YinYangOrb';

const Orb = dynamic(() => import('./YinYangOrb'), {
  ssr: false,
  loading: () => <OrbFallback />,
});

function OrbFallback() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="relative h-40 w-40 rounded-full bg-gradient-to-tr from-accent-violet/40 via-accent-cyan/30 to-accent-rose/20 blur-2xl orb-pulse" />
      <div className="absolute h-24 w-24 rounded-full bg-gradient-to-tr from-white/80 to-black/80" />
    </div>
  );
}

export default function YinYangOrbClient({
  state = 'idle',
  size = 'lg',
}: {
  state?: OrbState;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Probe for WebGL support — some mobile browsers / privacy modes block it
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!ctx) setWebgl(false);
    } catch {
      setWebgl(false);
    }
  }, []);

  if (!mounted || !webgl) return <OrbFallback />;

  return (
    <ErrorBoundary label="YinYangOrb" fallback={() => <OrbFallback />}>
      <Orb state={state} size={size} />
    </ErrorBoundary>
  );
}
