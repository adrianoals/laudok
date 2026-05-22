import type { ReactNode } from 'react';

type Tone = 'default' | 'light';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  default: 'text-laudok-700',
  light: 'text-laudok-200',
};

export function Eyebrow({ children, className, tone = 'default' }: EyebrowProps) {
  return (
    <div className={['flex items-center gap-3 text-label', toneClasses[tone], className].filter(Boolean).join(' ')}>
      <span className="block w-8 h-px bg-current opacity-60" aria-hidden />
      <span>{children}</span>
    </div>
  );
}
