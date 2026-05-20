'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(canHover);
    if (!canHover) return;

    document.body.classList.add('custom-cursor-active');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [role="button"], input, textarea, [data-cursor-hover]')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-ink mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-white/40 mix-blend-difference transition-[width,height,opacity] duration-200"
        style={{
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: hovering ? 1 : 0.6,
          willChange: 'transform, width, height',
        }}
      />
    </>
  );
}
