import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Keploy Go + Gin + Redis Tutorial | API Recording & Testing Guide',
  description:
    'A beginner-friendly, hands-on developer documentation walkthrough of running a Go Gin + Redis API with Keploy, capturing API traffic, and replaying automated integration tests.',
  keywords: [
    'Keploy',
    'Golang',
    'Gin Framework',
    'Redis',
    'Integration Testing',
    'API Mocking',
    'eBPF',
    'DevOps',
    'DevRel',
  ],
  authors: [{ name: 'DevRel Candidate' }],
  openGraph: {
    title: 'Keploy Go + Gin + Redis Tutorial | API Recording & Testing Guide',
    description:
      'Step-by-step developer tutorial on capturing live API traffic and generating zero-code test cases and mocks with Keploy for Go + Redis applications.',
    type: 'article',
    locale: 'en_US',
    siteName: 'Keploy Documentation Tutorials',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐰</text></svg>" />
      </head>
      <body className="min-h-screen bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 antialiased selection:bg-orange-500/20 selection:text-orange-600 dark:selection:text-orange-400">
        {children}
      </body>
    </html>
  );
}
