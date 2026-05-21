'use client';

const items = [
  'Next.js',
  'TypeScript',
  'Claude · GPT-5',
  'MCP Servers',
  'NestJS',
  'MongoDB',
  'AWS · Azure',
  'Kafka',
  'WebRTC',
  'Spring Boot',
  'Cursor',
  'Multi-LLM Routing',
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-bg-elevated/40 py-6">
      <div className="flex whitespace-nowrap drift">
        {doubled.map((it, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-3 text-sm font-mono text-ink-muted"
          >
            <span className="h-1 w-1 rounded-full bg-accent-violet/60" />
            {it}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
