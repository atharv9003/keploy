'use client';

import React from 'react';
import { Github, Menu, X, BookOpen, ExternalLink } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import KeployLogo from './KeployLogo';
import ScrollProgressBar from './ScrollProgressBar';

interface HeaderProps {
  onToggleMobileNav?: () => void;
  mobileNavOpen?: boolean;
}

export default function Header({ onToggleMobileNav, mobileNavOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0B0F17]/90 backdrop-blur-md transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileNav}
            type="button"
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            aria-label="Toggle navigation menu"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a href="#" className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1">
            <KeployLogo size={32} />
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                Keploy
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/60">
                  Docs & Guide
                </span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                Go + Gin + Redis Quickstart
              </span>
            </div>
          </a>
        </div>

        {/* Center: Quick navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <a
            href="#prerequisites"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Prerequisites
          </a>
          <a
            href="#architecture"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Architecture
          </a>
          <a
            href="#step-by-step"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Tutorial
          </a>
          <a
            href="#troubleshooting"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Troubleshooting
          </a>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://docs.keploy.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Docs</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://github.com/atharv9003/keploy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
            <Github className="w-4 h-4" />
          </a>

          <ThemeToggle />
        </div>
      </div>

      {/* Reading Progress Bar */}
      <ScrollProgressBar />
    </header>
  );
}
