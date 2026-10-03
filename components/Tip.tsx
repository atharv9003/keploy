import React from 'react';
import Callout from './Callout';

export default function Tip({ title = 'Pro Tip', children }: { title?: string; children: React.ReactNode }) {
  return <Callout type="tip" title={title}>{children}</Callout>;
}
