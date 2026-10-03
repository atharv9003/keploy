'use client';

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface DocsLayoutProps {
  children: React.ReactNode;
  tocItems: TocItem[];
}

export default function DocsLayout({ children, tocItems }: DocsLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sticky Header */}
      <Header
        mobileNavOpen={mobileNavOpen}
        onToggleMobileNav={() => setMobileNavOpen(!mobileNavOpen)}
      />

      {/* Mobile Drawer Navigation */}
      {mobileNavOpen && (
        <div className="fixed inset-0 top-16 z-50 lg:hidden bg-slate-900/60 backdrop-blur-sm">
          <div className="w-72 h-full bg-white dark:bg-[#0E1422] p-4 shadow-xl overflow-y-auto border-r border-slate-200 dark:border-slate-800">
            <Sidebar onLinkClick={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex">
        {/* Left Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-r border-slate-200 dark:border-slate-800/80 pr-4">
          <Sidebar />
        </aside>

        {/* Center Main Documentation Article */}
        <main className="flex-1 min-w-0 py-8 lg:px-10 lg:py-10">
          <article className="doc-prose max-w-3xl mx-auto">
            {children}
          </article>
        </main>

        {/* Right Sticky Table of Contents */}
        <aside className="hidden xl:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <TableOfContents items={tocItems} />
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#080C14] py-8 text-xs text-slate-500 dark:text-slate-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>🐰 Built for the</span>
            <strong className="text-slate-700 dark:text-slate-300 font-semibold">
              Keploy DevRel Candidate Assignment
            </strong>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://keploy.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              Keploy Home
            </a>
            <a
              href="https://docs.keploy.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              Documentation
            </a>
            <a
              href="https://github.com/keploy/keploy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
