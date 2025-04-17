'use client';

import { MSWProvider } from '@/contexts/MSWContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <MSWProvider>{children}</MSWProvider>;
} 