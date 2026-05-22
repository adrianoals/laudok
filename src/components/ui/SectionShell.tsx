import type { HTMLAttributes, ReactNode } from 'react';

type Tone = 'cream' | 'surface' | 'dark';

interface SectionShellProps extends HTMLAttributes<HTMLElement> {
  tone?: Tone;
  withGrid?: boolean;
  children: ReactNode;
}

const toneClasses: Record<Tone, string> = {
  cream:   'bg-surface-alt text-ink',
  surface: 'bg-surface text-ink',
  dark:    'bg-laudok-800 text-surface',
};

export function SectionShell({
  tone = 'cream',
  withGrid = false,
  className,
  children,
  ...rest
}: SectionShellProps) {
  return (
    <section
      className={[
        'relative overflow-hidden',
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {withGrid && (
        <div className="absolute inset-0 bg-grid-blueprint bg-grid-blueprint--masked pointer-events-none" aria-hidden />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {children}
      </div>
    </section>
  );
}
