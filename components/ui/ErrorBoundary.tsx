'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  fallback?: (error: Error) => React.ReactNode;
  label?: string;
};

type State = { error: Error | null };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (typeof window !== 'undefined') {
      // Log to console so users with DevTools can copy it
      // and so it shows up in Netlify Functions logs for SSR errors
      // eslint-disable-next-line no-console
      console.error('[ErrorBoundary]', this.props.label ?? '', error, info);
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(this.state.error);

    const err = this.state.error;
    const stack = (err.stack ?? '').split('\n').slice(0, 6).join('\n');

    return (
      <div className="fixed inset-0 z-[10000] flex items-start justify-center overflow-auto bg-black/90 p-4 backdrop-blur">
        <div className="mt-10 w-full max-w-2xl rounded-2xl border border-accent-rose/40 bg-bg-elevated p-6 text-left shadow-2xl">
          <div className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-accent-rose">
            Client-side error caught
          </div>
          {this.props.label && (
            <div className="mb-2 text-xs text-ink-muted">
              In: <span className="font-mono">{this.props.label}</span>
            </div>
          )}
          <div className="mb-3 font-display text-xl font-bold tracking-tight text-ink">
            {err.name}: {err.message}
          </div>
          <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-bg p-3 text-[11px] leading-relaxed text-ink-muted">
            {stack || '(no stack trace)'}
          </pre>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={this.reset}
              className="rounded-full bg-gradient-to-tr from-accent-violet to-accent-cyan px-4 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const text = `${err.name}: ${err.message}\n\n${err.stack ?? ''}`;
                  navigator.clipboard?.writeText(text).catch(() => {});
                }
              }}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/5"
            >
              Copy error
            </button>
          </div>
        </div>
      </div>
    );
  }
}
