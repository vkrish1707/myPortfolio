'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Mic, MicOff, Send, Sparkles, Square, Volume2, VolumeX, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import YinYangOrb from '@/components/three/YinYangOrbClient';
import type { OrbState } from '@/components/three/YinYangOrb';
import { useVoice } from './useVoice';
import { cn } from '@/lib/utils';

type Msg = { role: 'user' | 'assistant'; content: string };

const SEED_QUESTIONS = [
  'What are you building at AMD?',
  'Tell me about DAAKS',
  'How do you use MCP servers?',
  'What is your stack?',
  'Why should we hire Vamsi?',
];

export default function AITwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [voiceOut, setVoiceOut] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const {
    supported,
    listening,
    speaking,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useVoice();

  // Stop speaking if turned off
  useEffect(() => {
    if (!voiceOut) stopSpeaking();
  }, [voiceOut, stopSpeaking]);

  // Listen for global open events from buttons elsewhere on the page
  useEffect(() => {
    const handler = () => setOpen(true);
    document.addEventListener('open-ai-twin', handler);
    return () => document.removeEventListener('open-ai-twin', handler);
  }, []);

  // When STT transcript settles, use it as input
  useEffect(() => {
    if (!listening && transcript) {
      setInput(transcript);
    }
  }, [listening, transcript]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streaming]);

  const orbState: OrbState = streaming ? 'thinking' : speaking ? 'speaking' : listening ? 'listening' : 'idle';

  const sendMessage = async (text: string) => {
    const clean = text.trim();
    if (!clean || streaming) return;
    const next: Msg[] = [...messages, { role: 'user', content: clean }];
    setMessages(next);
    setInput('');
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });
      if (!res.body) throw new Error('No stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        acc += chunk;
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { role: 'assistant', content: acc };
          return copy;
        });
      }
      setStreaming(false);
      if (voiceOut && acc) speak(acc);
    } catch (err) {
      setStreaming(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendMessage(input);
  };

  const handleMicToggle = () => {
    if (listening) stopListening();
    else startListening();
  };

  return (
    <>
      {/* Open trigger — appears once panel is closed */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="open-trigger"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 rounded-full glass px-4 py-3 shadow-2xl hover:bg-white/5 transition"
            aria-label="Open AI twin"
          >
            <span className="relative inline-flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-violet via-accent-cyan to-accent-rose blur opacity-80 group-hover:opacity-100" />
              <Sparkles className="relative h-4 w-4 text-white" />
            </span>
            <span className="text-sm font-medium">Talk to my AI twin</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Side panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="ai-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            <motion.aside
              key="ai-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-md flex-col glass"
            >
              <header className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10">
                    <YinYangOrb state={orbState} size="sm" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Vamsi's AI Twin</h3>
                    <p className="text-xs text-ink-muted">
                      {orbState === 'thinking'
                        ? 'thinking…'
                        : orbState === 'speaking'
                          ? 'speaking…'
                          : orbState === 'listening'
                            ? 'listening…'
                            : 'ask me anything'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setVoiceOut((v) => !v)}
                    className="rounded-md p-2 text-ink-muted hover:text-ink hover:bg-white/5"
                    aria-label={voiceOut ? 'Mute' : 'Unmute'}
                    title={voiceOut ? 'Voice on' : 'Voice off'}
                  >
                    {voiceOut ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-md p-2 text-ink-muted hover:text-ink hover:bg-white/5"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </header>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {messages.length === 0 && (
                  <div className="space-y-4">
                    <div className="rounded-xl bg-white/5 p-4 text-sm leading-relaxed">
                      <p className="text-ink-muted">
                        Hey — I'm Vamsi's AI twin. The white half of his yin-yang. Ask me anything: what he's building, his side projects, his stack.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SEED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-ink-muted hover:text-ink hover:border-white/20 hover:bg-white/5 transition"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      'rounded-2xl px-4 py-3 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'ml-auto max-w-[85%] bg-accent-violet/15 text-ink border border-accent-violet/20'
                        : 'mr-auto max-w-[90%] bg-white/5 text-ink border border-white/5'
                    )}
                  >
                    {m.content || (
                      <span className="inline-flex items-center gap-1">
                        <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-ink-muted" />
                        <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-ink-muted" />
                        <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-ink-muted" />
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Composer */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-white/5 p-3 flex items-center gap-2"
              >
                {supported.stt && (
                  <button
                    type="button"
                    onClick={handleMicToggle}
                    className={cn(
                      'rounded-full p-2.5 transition',
                      listening
                        ? 'bg-accent-rose/20 text-accent-rose ring-1 ring-accent-rose/40'
                        : 'bg-white/5 text-ink-muted hover:text-ink'
                    )}
                    aria-label={listening ? 'Stop listening' : 'Start listening'}
                  >
                    {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </button>
                )}
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={listening ? 'listening…' : 'Ask about Vamsi…'}
                  className="flex-1 rounded-full bg-white/5 px-4 py-2.5 text-sm placeholder:text-ink-dim focus:outline-none focus:ring-1 focus:ring-accent-violet/40"
                />
                {streaming ? (
                  <button
                    type="button"
                    onClick={() => abortRef.current?.abort()}
                    className="rounded-full p-2.5 bg-white/5 text-ink-muted hover:text-ink"
                    aria-label="Stop"
                  >
                    <Square className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="rounded-full p-2.5 bg-gradient-to-tr from-accent-violet to-accent-cyan text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
