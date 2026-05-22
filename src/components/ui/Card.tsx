import type { HTMLAttributes, ReactNode } from 'react';

type Variant = 'emboss' | 'flat' | 'plain';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  withFillet?: boolean;
  hoverable?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  emboss: 'bg-surface shadow-[var(--shadow-emboss)] border border-transparent',
  flat:   'bg-surface border border-sand-200',
  plain:  'bg-transparent',
};

export function Card({
  variant = 'emboss',
  withFillet = false,
  hoverable = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        'relative rounded-xl transition-all duration-[250ms] ease-out',
        variantClasses[variant],
        withFillet ? 'card-fillet pl-7' : '',
        hoverable ? 'hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
