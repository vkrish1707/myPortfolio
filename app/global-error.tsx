'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const stack = (error.stack ?? '').split('\n').slice(0, 12).join('\n');
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          background: '#0a0a0f',
          color: '#fafafa',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          padding: 24,
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: '40px auto',
            border: '1px solid rgba(251,113,133,0.4)',
            borderRadius: 16,
            background: '#12121a',
            padding: 24,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#fb7185',
              marginBottom: 8,
            }}
          >
            Global error caught (root layout)
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            {error.name}: {error.message}
          </div>
          {error.digest && (
            <div style={{ fontSize: 12, color: '#a1a1aa', marginBottom: 12 }}>
              digest: <code>{error.digest}</code>
            </div>
          )}
          <pre
            style={{
              fontSize: 11,
              lineHeight: 1.6,
              color: '#a1a1aa',
              background: '#0a0a0f',
              padding: 12,
              borderRadius: 8,
              maxHeight: 360,
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {stack || '(no stack trace)'}
          </pre>
          <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => reset()}
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 600,
                color: 'white',
                background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                border: 'none',
                borderRadius: 999,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 600,
                color: '#fafafa',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 999,
                textDecoration: 'none',
              }}
            >
              Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
