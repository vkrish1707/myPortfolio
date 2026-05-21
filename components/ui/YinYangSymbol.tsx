'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking';

type Size = 'xs' | 'sm' | 'md' | 'lg';

const sizeMap: Record<Size, string> = {
  xs: 'h-10 w-10',
  sm: 'h-32 w-32',
  md: 'h-64 w-64',
  lg: 'h-[22rem] w-[22rem] md:h-[26rem] md:w-[26rem]',
};

const haloMap: Record<OrbState, string> = {
  idle: 'bg-accent-violet/20',
  listening: 'bg-accent-rose/35',
  thinking: 'bg-accent-cyan/40',
  speaking: 'bg-accent-violet/50',
};

// Spin durations per state — faster when thinking/speaking
const spinDurationMs: Record<OrbState, number> = {
  idle: 14000,
  listening: 10000,
  thinking: 4500,
  speaking: 7000,
};

export default function YinYangSymbol({
  state = 'idle',
  size = 'lg',
  className,
  parallax = false,
}: {
  state?: OrbState;
  size?: Size;
  className?: string;
  parallax?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!parallax) return;
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      setTilt({ x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [parallax]);

  const spinDuration = spinDurationMs[state];

  return (
    <div
      ref={wrapRef}
      className={cn(
        'relative flex items-center justify-center mx-auto',
        sizeMap[size],
        className
      )}
      style={{ perspective: parallax ? '1000px' : undefined }}
    >
      {/* Outer animated glow halo */}
      <div
        className={cn(
          'absolute inset-[-12%] rounded-full blur-3xl transition-colors duration-700 orb-pulse',
          haloMap[state]
        )}
      />

      {/* Conic shimmer ring */}
      {size !== 'xs' && (
        <div
          aria-hidden
          className="absolute inset-[6%] rounded-full opacity-50"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(167,139,250,0) 0%, rgba(167,139,250,0.25) 30%, rgba(34,211,238,0.25) 60%, rgba(167,139,250,0) 100%)',
            animation: `spin ${spinDuration * 1.4}ms linear infinite`,
            mask: 'radial-gradient(circle, transparent 70%, black 75%)',
            WebkitMask: 'radial-gradient(circle, transparent 70%, black 75%)',
          }}
        />
      )}

      {/* Inner thin ring */}
      <div className="absolute inset-[10%] rounded-full ring-1 ring-white/10" />

      {/* The actual yin-yang SVG */}
      <div
        ref={innerRef}
        className="relative h-[78%] w-[78%]"
        style={{
          transform: parallax
            ? `rotateX(${tilt.y * -12}deg) rotateY(${tilt.x * 12}deg)`
            : undefined,
          transition: parallax ? 'transform 200ms ease-out' : undefined,
          transformStyle: 'preserve-3d',
        }}
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Yin-yang — me and AI as one"
          className="h-full w-full drop-shadow-[0_0_24px_rgba(167,139,250,0.35)]"
          style={{ animation: `spin ${spinDuration}ms linear infinite` }}
        >
          <defs>
            <radialGradient id="yy-light-grad" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#c7c7cc" />
            </radialGradient>
            <radialGradient id="yy-dark-grad" cx="65%" cy="70%" r="80%">
              <stop offset="0%" stopColor="#2a2a32" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
            <radialGradient id="yy-rim" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="rgba(167,139,250,0)" />
              <stop offset="100%" stopColor="rgba(167,139,250,0.5)" />
            </radialGradient>
          </defs>

          {/* Base circle (light side) */}
          <circle cx="100" cy="100" r="98" fill="url(#yy-light-grad)" />

          {/* Dark yin-yang half with S-curve */}
          <path
            d="M 100 2
               A 49 49 0 0 0 100 100
               A 49 49 0 0 1 100 198
               A 98 98 0 0 0 100 2 Z"
            fill="url(#yy-dark-grad)"
          />

          {/* Light dot in dark half (bottom) */}
          <circle cx="100" cy="149" r="13" fill="url(#yy-light-grad)" />
          <circle cx="100" cy="149" r="4" fill="#1a1a24" opacity="0.4" />

          {/* Dark dot in light half (top) */}
          <circle cx="100" cy="51" r="13" fill="url(#yy-dark-grad)" />
          <circle cx="100" cy="51" r="4" fill="#fafafa" opacity="0.3" />

          {/* Rim accent — overlay on top, NOT rotating with the disc */}
          <circle cx="100" cy="100" r="98" fill="url(#yy-rim)" />
        </svg>
      </div>

      {/* Soft inner glow dot following state */}
      {state !== 'idle' && (
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute h-2 w-2 rounded-full',
            state === 'thinking' && 'bg-accent-cyan shadow-[0_0_20px_8px_rgba(34,211,238,0.6)]',
            state === 'speaking' && 'bg-accent-violet shadow-[0_0_20px_8px_rgba(167,139,250,0.6)]',
            state === 'listening' && 'bg-accent-rose shadow-[0_0_20px_8px_rgba(251,113,133,0.6)]'
          )}
        />
      )}
    </div>
  );
}
