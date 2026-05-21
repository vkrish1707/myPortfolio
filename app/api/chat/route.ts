import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { VAMSI_AI_TWIN_SYSTEM_PROMPT } from '@/lib/system-prompt';

export const runtime = 'nodejs';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  let body: { messages?: ChatMessage[] } = {};
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];

  if (!apiKey) {
    // No API key configured — return a friendly stub so the UI still demos.
    const fallback = stubResponse(messages);
    return streamPlainText(fallback);
  }

  const client = new Anthropic({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const apiMessages = messages
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        const response = await client.messages.stream({
          model: 'claude-sonnet-4-5',
          max_tokens: 600,
          system: VAMSI_AI_TWIN_SYSTEM_PROMPT,
          messages: apiMessages,
        });

        for await (const event of response) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            "\n\n[I hit a network hiccup. Try again in a moment.]"
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}

function streamPlainText(text: string) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = text.split(/(\s+)/);
      for (const w of words) {
        controller.enqueue(encoder.encode(w));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

function stubResponse(messages: ChatMessage[]): string {
  const last = messages[messages.length - 1]?.content?.toLowerCase() ?? '';
  if (!last) {
    return "Hey — I'm Vamsi's AI twin. Ask me anything about him: what he's building at AMD, his side projects, or his stack.";
  }
  if (last.includes('amd')) {
    return "At AMD I lead the GFX program management platform — an AI-powered internal tool with 300+ active users, custom MCP servers exposing JIRA and MongoDB as agent-callable tools, and a natural-language dashboard builder.";
  }
  if (last.includes('mcp') || last.includes('agent')) {
    return "I build custom MCP servers — at AMD they expose JIRA, MongoDB, and file ops as agent-callable tools. On the side I built an MCP TradeView server that lets Claude pull live market data and reason about it.";
  }
  if (last.includes('hire') || last.includes('contact') || last.includes('email')) {
    return "Best way to reach me is mylavarapuvamsikrishna2012@gmail.com or LinkedIn — link in the contact page.";
  }
  if (last.includes('experience') || last.includes('years')) {
    return "10+ years across full-stack: started at Accenture in 2016, then Vzen, Hexaware, Wipro (Citibank), Capgemini (RBC), and now AMD as Senior Full Stack Dev / Tech PM.";
  }
  return "I'm running in demo mode right now (no API key configured) — but the real me would answer that. Quick facts: 10+ years full-stack, currently leading an AI-powered platform at AMD, built custom MCP servers, side-project DAAKS is patent-pending.";
}
