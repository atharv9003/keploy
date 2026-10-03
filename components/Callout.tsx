import React from 'react';
import { Info, AlertTriangle, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'tip' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: {
      border: 'border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200',
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Note',
    },
    tip: {
      border: 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Pro Tip',
    },
    warning: {
      border: 'border-amber-500/40 bg-amber-50/60 dark:bg-amber-950/25 text-amber-900 dark:text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Warning',
    },
    error: {
      border: 'border-rose-500/40 bg-rose-50/60 dark:bg-rose-950/25 text-rose-900 dark:text-rose-200',
      icon: <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Security / Critical',
    },
    success: {
      border: 'border-teal-500/30 bg-teal-50/50 dark:bg-teal-950/20 text-teal-900 dark:text-teal-200',
      icon: <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Success',
    },
  }[type];

  return (
    <aside className={`my-6 p-4 rounded-xl border ${styles.border} flex gap-3 text-sm leading-relaxed shadow-sm`}>
      {styles.icon}
      <div className="flex-1">
        {title || styles.defaultTitle ? (
          <h4 className="font-semibold text-sm mb-1 opacity-90">{title || styles.defaultTitle}</h4>
        ) : null}
        <div className="[&>p]:my-1 text-slate-700 dark:text-slate-300">{children}</div>
      </div>
    </aside>
  );
}
