import React from 'react';
import Callout from './Callout';

export default function Warning({ title = 'Important', children }: { title?: string; children: React.ReactNode }) {
  return <Callout type="warning" title={title}>{children}</Callout>;
}
