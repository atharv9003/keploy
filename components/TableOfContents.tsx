'use client';

import React, { useEffect, useState } from 'react';
import { AlignLeft } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPosition = window.scrollY + 120;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        if (heading.offsetTop <= scrollPosition) {
          setActiveId(heading.id);
          return;
        }
      }

      if (items.length > 0 && window.scrollY < 200) {
        setActiveId(items[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav className="w-full py-6 pl-4 text-xs">
      <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-2">
        <AlignLeft className="w-3.5 h-3.5" />
        <span>On This Page</span>
      </div>
      <ul className="space-y-1.5 border-l border-slate-200 dark:border-slate-800">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-1 pr-2 transition-colors ${
                  item.level === 3 ? 'pl-5' : 'pl-3'
                } ${
                  isActive
                    ? 'text-orange-600 dark:text-orange-400 font-semibold border-l-2 -ml-[2px] border-orange-500'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
