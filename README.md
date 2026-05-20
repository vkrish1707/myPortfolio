# vkrish-portfolio · v2

A 2026 rebuild of Vamsi Krishna's portfolio. Next.js 15 + React 19, 3D yin-yang centerpiece, AI twin you can talk to.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Without a key the AI twin falls back to a friendly stub so the UI still demos.

## What's inside

- `app/` — Next.js App Router. One page per route.
- `app/api/chat/route.ts` — Streaming Claude endpoint for the AI twin.
- `components/three/YinYangOrb.tsx` — Shader-driven 3D orb (react-three-fiber).
- `components/ai-twin/AITwin.tsx` — Chat panel with browser STT/TTS.
- `components/sections/` — Hero, marquee, projects, timeline, contact CTA.
- `components/ui/` — Nav, custom cursor, mesh background, section titles.
- `lib/resume.ts` — Single source of truth for resume content. Edit here.
- `lib/system-prompt.ts` — System prompt for the AI twin, auto-built from resume.

## Replacing project images

Drop PNGs into `public/projects/` matching the names referenced in `lib/resume.ts`:

- `daaks.png`
- `mcp-tradeview.png`
- `ai-agents.png`

## Deploy

This is a stock Next.js 15 app — Vercel and Netlify deploy it without config. Set
`ANTHROPIC_API_KEY` as an environment variable on the host.
