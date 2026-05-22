import type { HTMLAttributes, ReactNode } from 'react';

type Tone = 'cream' | 'surface' | 'pale' | 'dark';

interface SectionShellProps extends HTMLAttributes<HTMLElement> {
  tone?: Tone;
  withGrid?: boolean;
  decorations?: ReactNode;
  paddingY?: string;
  children: ReactNode;
}

const toneClasses: Record<Tone, string> = {
  cream:   'bg-surface-alt text-ink',
  surface: 'bg-surface text-ink',
  pale:    'bg-laudok-100 text-ink',
  dark:    'bg-laudok-900 text-surface',
};

export function SectionShell({
  tone = 'cream',
  withGrid = false,
  decorations,
  paddingY = 'py-20 md:py-28 lg:py-32',
  className,
  children,
  ...rest
}: SectionShellProps) {
  const isDark = tone === 'dark';
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
      {isDark && (
        <div className="absolute inset-0 bg-gradient-laudok opacity-90" aria-hidden />
      )}
      {withGrid && (
        <div
          className={[
            'absolute inset-0 bg-grid-blueprint--masked pointer-events-none',
            isDark ? 'bg-grid-blueprint-light opacity-40' : 'bg-grid-blueprint',
          ].join(' ')}
          aria-hidden
        />
      )}
      {decorations}
      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${paddingY}`}>
        {children}
      </div>
    </section>
  );
}
