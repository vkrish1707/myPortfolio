'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const stack = (error.stack ?? '').split('\n').slice(0, 12).join('\n');
  return (
    <section className="px-6 lg:px-10 pt-32 pb-24">
      <div className="mx-auto max-w-2xl rounded-2xl border border-accent-rose/40 bg-bg-elevated p-6">
        <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent-rose">
          Page error caught
        </div>
        <div className="mb-3 font-display text-2xl font-bold tracking-tight">
          {error.name}: {error.message}
        </div>
        {error.digest && (
          <div className="mb-3 text-xs text-ink-muted">
            digest: <code>{error.digest}</code>
          </div>
        )}
        <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-bg p-3 text-[11px] leading-relaxed text-ink-muted">
          {stack || '(no stack trace)'}
        </pre>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => reset()}
            className="rounded-full bg-gradient-to-tr from-accent-violet to-accent-cyan px-4 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/5"
          >
            Home
          </a>
        </div>
      </div>
    </section>
  );
}
