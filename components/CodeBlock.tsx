import React from 'react';
import CopyButton from './CopyButton';

interface CodeBlockProps {
  code?: string;
  children?: React.ReactNode;
  language?: string;
  filename?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  children,
  language = 'text',
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const rawContent = typeof code === 'string' ? code : typeof children === 'string' ? children : '';
  const trimmedCode = (rawContent || '').trim();
  const lines = trimmedCode ? trimmedCode.split('\n') : [''];

  return (
    <div className="my-5 rounded-xl overflow-hidden border border-slate-700/60 bg-[#0A0E17] shadow-lg text-sm font-mono">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#0F1523]">
        <div className="flex items-center gap-2">
          {/* Mac/terminal dot styling */}
          <div className="flex gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {filename && (
            <span className="text-xs text-slate-300 font-medium tracking-wide">
              {filename}
            </span>
          )}
          {!filename && language && (
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/50">
              {language}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {filename && language && (
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold hidden sm:inline">
              {language}
            </span>
          )}
          <CopyButton text={trimmedCode} />
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-200">
        <pre className="!bg-transparent !p-0 !m-0">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-right select-none text-slate-600 text-xs">
                    {idx + 1}
                  </span>
                )}
                <span className="table-cell break-all whitespace-pre">
                  {line || ' '}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
