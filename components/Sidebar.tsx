'use client';

import React from 'react';
import { 
  Compass, 
  Layers, 
  Terminal, 
  FileText, 
  PlayCircle, 
  Sliders, 
  ShieldAlert, 
  CheckCircle,
  Cpu
} from 'lucide-react';

interface SidebarProps {
  onLinkClick?: () => void;
  activeId?: string;
}

const navSections = [
  {
    title: 'Overview',
    items: [
      { id: 'overview', label: 'Tutorial Overview', icon: Compass },
      { id: 'what-is-keploy', label: 'What is Keploy & Why Use It?', icon: Cpu },
      { id: 'what-youll-build', label: 'What You’ll Build', icon: Layers },
      { id: 'architecture', label: 'Architecture & Mechanics', icon: Layers },
    ],
  },
  {
    title: 'Setup & Verification',
    items: [
      { id: 'prerequisites', label: 'Prerequisites', icon: Terminal },
      { id: 'system-verification', label: 'Verified Environment', icon: CheckCircle },
      { id: 'start-redis', label: 'Running Redis in Docker', icon: Terminal },
      { id: 'inspecting-gin-app', label: 'Inspecting the Gin API', icon: FileText },
    ],
  },
  {
    title: 'Hands-on Tutorial',
    items: [
      { id: 'step-1-manual-api', label: 'Step 1: Manual API Validation', icon: PlayCircle },
      { id: 'step-2-keploy-cli', label: 'Step 2: Keploy CLI & Security', icon: ShieldAlert },
      { id: 'step-3-record-traffic', label: 'Step 3: Recording API Traffic', icon: PlayCircle },
      { id: 'step-4-inspect-artifacts', label: 'Step 4: Inspect Test Artifacts', icon: FileText },
      { id: 'step-5-run-tests', label: 'Step 5: Running Tests on Replay', icon: PlayCircle },
      { id: 'step-6-noise-fields', label: 'Step 6: Handling JWT Noise', icon: Sliders },
    ],
  },
  {
    title: 'Insights & Reference',
    items: [
      { id: 'how-keploy-works', label: 'How Keploy Works Under The Hood', icon: Cpu },
      { id: 'troubleshooting', label: 'Troubleshooting & Defender Note', icon: ShieldAlert },
      { id: 'key-takeaways', label: 'DevRel Reflections & Takeaways', icon: CheckCircle },
    ],
  },
];

export default function Sidebar({ onLinkClick, activeId }: SidebarProps) {
  return (
    <aside className="w-full h-full py-6 pr-4 overflow-y-auto text-sm">
      <div className="space-y-7">
        {navSections.map((section, sIdx) => (
          <div key={sIdx}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-3">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={onLinkClick}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-all ${
                        isActive
                          ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-900/60 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
