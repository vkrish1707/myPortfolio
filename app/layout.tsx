import type { Metadata } from 'next';
import './globals.css';
import SafeChrome from '@/components/ui/SafeChrome';

export const metadata: Metadata = {
  title: 'Vamsi Krishna · Senior Full Stack Developer',
  description:
    'AI-native full-stack developer. 10+ years building production web platforms. Currently leading an AI-powered program management platform at AMD.',
  keywords: ['Vamsi Krishna', 'Full Stack Developer', 'AI', 'MCP', 'Next.js', 'Claude', 'Toronto'],
  authors: [{ name: 'Vamsi Krishna Mylavarapu' }],
  openGraph: {
    title: 'Vamsi Krishna · AI-native Full Stack Developer',
    description: 'Meet me — and my AI twin.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Bricolage+Grotesque:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-screen bg-bg text-ink antialiased">
        <SafeChrome />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
