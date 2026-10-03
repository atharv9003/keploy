import React from 'react';
import CopyButton from './CopyButton';
import { Terminal } from 'lucide-react';

interface CommandBlockProps {
  command?: string;
  children?: React.ReactNode;
  shell?: 'powershell' | 'bash' | 'cmd';
  description?: string;
  expectedOutput?: string;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node) && (node.props as any)) {
    return extractText((node.props as any).children);
  }
  return '';
}

export default function CommandBlock({
  command,
  children,
  shell = 'powershell',
  description,
  expectedOutput,
}: CommandBlockProps) {
  const rawCommand = typeof command === 'string' ? command : '';
  const childText = extractText(children);
  const trimmed = (rawCommand || childText || '').trim();
  const promptSymbol = shell === 'powershell' ? 'PS >' : '$';
  const resolvedOutput = expectedOutput || (rawCommand && childText ? childText : '');

  return (
    <div className="my-5 rounded-xl border border-slate-700/60 bg-[#090D16] shadow-md text-sm font-mono overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#0E1422]">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-semibold text-slate-300">
            {shell === 'powershell' ? 'PowerShell (Windows)' : 'Terminal (Bash)'}
          </span>
          {description && (
            <span className="hidden sm:inline text-slate-500 font-sans border-l border-slate-700 pl-2">
              {description}
            </span>
          )}
        </div>
        <CopyButton text={trimmed} />
      </div>

      {/* Command prompt area */}
      <div className="p-3.5 overflow-x-auto text-[13px] leading-relaxed flex items-baseline gap-2.5 bg-[#090D16]">
        <span className="text-orange-400 font-bold select-none shrink-0 text-xs">
          {promptSymbol}
        </span>
        <code className="text-slate-100 font-medium whitespace-pre">
          {trimmed}
        </code>
      </div>

      {/* Expected output if present */}
      {resolvedOutput && (
        <div className="border-t border-slate-800/80 bg-[#060910] p-3 text-xs text-slate-400 overflow-x-auto">
          <div className="text-[11px] font-sans font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Expected Output
          </div>
          <pre className="!bg-transparent !p-0 !m-0 text-slate-300">
            <code>{(resolvedOutput || '').trim()}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
