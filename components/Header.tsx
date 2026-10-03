'use client';

import React from 'react';
import { Github, Menu, X, BookOpen, ExternalLink, Terminal } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onToggleMobileNav?: () => void;
  mobileNavOpen?: boolean;
}

export default function Header({ onToggleMobileNav, mobileNavOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0B0F17]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileNav}
            type="button"
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a href="#" className="flex items-center gap-2.5 group">
            {/* Keploy Rabbit Icon Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform font-bold text-lg">
              🐰
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                Keploy
                <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-400 border border-orange-200/50 dark:border-orange-800/50">
                  Docs & Guide
                </span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
                Go + Gin + Redis Quickstart
              </span>
            </div>
          </a>
        </div>

        {/* Center: Quick links (desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
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
        <div className="flex items-center gap-3">
          <a
            href="https://docs.keploy.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-orange-500/30 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Docs</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://github.com/keploy/keploy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
