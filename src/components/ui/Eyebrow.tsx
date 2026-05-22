import type { ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div className={['flex items-center gap-3 text-label text-laudok-700', className].filter(Boolean).join(' ')}>
      <span className="block w-8 h-px bg-current opacity-60" aria-hidden />
      <span>{children}</span>
    </div>
  );
}
