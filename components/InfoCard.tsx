import React from 'react';

interface InfoCardProps {
  title?: string;
  items?: { label: string; value: string; badge?: string }[];
}

export default function InfoCard(props: any) {
  const { title = '', items = [] } = props;
  let parsedItems = items;
  if (typeof items === 'string') {
    try {
      parsedItems = JSON.parse(items);
    } catch {
      parsedItems = [];
    }
  }
  const safeItems = Array.isArray(parsedItems) ? parsedItems : [];

  return (
    <div className="my-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm">
      {title && (
        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          {title}
        </h4>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {safeItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40"
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              {item.label}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 font-mono">
                {item.value}
              </span>
              {item.badge && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400">
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
