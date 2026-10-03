import React from 'react';

interface StepProps {
  number: number | string;
  title: string;
  children: React.ReactNode;
  id?: string;
}

export default function Step({ number, title, children, id }: StepProps) {
  return (
    <section id={id} className="relative pl-10 pb-8 last:pb-2 group">
      {/* Connecting vertical line */}
      <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 group-last:hidden" />
      
      {/* Number badge */}
      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-orange-500 text-white font-semibold text-sm flex items-center justify-center shadow-md shadow-orange-500/20">
        {number}
      </div>

      <div className="pt-0.5">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
          {title}
        </h3>
        <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </section>
  );
}
