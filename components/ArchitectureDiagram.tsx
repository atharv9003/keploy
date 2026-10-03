'use client';

import React, { useState } from 'react';
import { Radio, Database, Server, User, Play, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState<'record' | 'test'>('record');

  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md overflow-hidden">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 gap-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Keploy Architecture: Record vs Replay Mode
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            How Keploy observes and mocks network traffic without modifying Go code
          </p>
        </div>
        <div className="flex bg-slate-200/70 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('record')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'record'
                ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            1. Recording Mode
          </button>
          <button
            onClick={() => setActiveTab('test')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'test'
                ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            2. Replay / Test Mode
          </button>
        </div>
      </div>

      {/* Visual Diagram Area */}
      <div className="p-6 lg:p-8 bg-gradient-to-b from-slate-50/30 to-transparent dark:from-slate-950/20">
        {activeTab === 'record' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Box 1: Developer / Client */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-sm">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Developer / curl</div>
                <div className="text-[11px] text-slate-500 mt-1">Triggers API Traffic</div>
                <div className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300">
                  HTTP GET / POST
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center justify-center text-slate-400">
                <span className="text-[11px] font-mono font-medium mb-1 text-orange-500">Ingress</span>
                <ArrowRight className="w-5 h-5 text-orange-500" />
              </div>

              {/* Box 2: Keploy eBPF & Proxy */}
              <div className="p-4 rounded-xl border-2 border-orange-500/40 bg-orange-50/30 dark:bg-orange-950/20 text-center shadow-md relative">
                <div className="absolute -top-2.5 right-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-500 text-white">
                  Intercept
                </div>
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                  <Radio className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Keploy CLI</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Intercepts wire calls</div>
                <div className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300">
                  Writes ./keploy/*.yml
                </div>
              </div>

              {/* Box 3: Go API + Redis */}
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center gap-3">
                  <div className="p-2 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Go / Gin API (:3001)</div>
                    <div className="text-[10px] text-slate-500">Executes business logic</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center gap-3">
                  <div className="p-2 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Redis Cache (:6379)</div>
                    <div className="text-[10px] text-slate-500">Stores OTP keys & TTL</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white font-semibold">What happens here:</strong> Keploy runs your binary (`keploy record -c "..."`) and passively mirrors incoming HTTP requests and outgoing database (Redis RESP protocol) queries into deterministic YAML test cases and mock contracts.
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Box 1: Keploy Test Runner */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-sm">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                  <Play className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Keploy Test Engine</div>
                <div className="text-[11px] text-slate-500 mt-1">Reads YAML test suite</div>
                <div className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-300">
                  keploy test
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center justify-center text-slate-400">
                <span className="text-[11px] font-mono font-medium mb-1 text-emerald-500">Replays</span>
                <ArrowRight className="w-5 h-5 text-emerald-500" />
              </div>

              {/* Box 2: Go Application */}
              <div className="p-4 rounded-xl border-2 border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20 text-center shadow-md">
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Server className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Live Go App (:3001)</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Unchanged application code</div>
                <div className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  Thinks Redis is active
                </div>
              </div>

              {/* Box 3: Virtual Mock & Assertions */}
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/30 shadow-sm flex items-center gap-3">
                  <div className="p-2 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Simulated Redis Mock</div>
                    <div className="text-[10px] text-slate-500">No real Redis needed in CI!</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-teal-200 dark:border-teal-900/60 bg-teal-50/40 dark:bg-teal-950/30 shadow-sm flex items-center gap-3">
                  <div className="p-2 rounded bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-300">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Diff & Noise Assertion</div>
                    <div className="text-[10px] text-slate-500">Validates HTTP status & body</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white font-semibold">What happens here:</strong> Keploy fires the recorded HTTP requests against your application. When the app makes network queries to Redis, Keploy catches those network packets and serves the recorded responses instantly. Finally, it compares the response with expected outputs and ignores configured dynamic noise fields (like JWT tokens).
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
