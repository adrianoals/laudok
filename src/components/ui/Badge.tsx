import type { ReactNode } from 'react';

type Variant = 'default' | 'accent' | 'outline' | 'solid';
type Size = 'sm' | 'md';

interface BadgeProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-laudok-100 text-laudok-800',
  accent:  'bg-sand-100 text-laudok-800 border border-sand-200',
  outline: 'bg-transparent text-laudok-800 border border-laudok-300',
  solid:   'bg-laudok-800 text-surface',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-[10px] px-2.5 py-0.5',
  md: 'text-xs px-3 py-1',
};

export function Badge({ variant = 'default', size = 'md', className, children }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-semibold uppercase tracking-[0.12em] whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
