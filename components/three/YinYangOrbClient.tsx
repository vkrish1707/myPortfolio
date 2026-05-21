'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { OrbState } from './YinYangOrb';

const Orb = dynamic(() => import('./YinYangOrb'), {
  ssr: false,
  loading: () => <OrbFallback />,
});

function OrbFallback() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="relative h-32 w-32 rounded-full bg-gradient-to-tr from-accent-violet/30 to-accent-cyan/30 blur-2xl orb-pulse" />
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
  useEffect(() => setMounted(true), []);

  if (!mounted) return <OrbFallback />;

  return <Orb state={state} size={size} />;
}
