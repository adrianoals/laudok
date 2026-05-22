import type { LucideIcon } from 'lucide-react';

type Tone = 'filled' | 'outlined' | 'soft';
type Size = 'sm' | 'md' | 'lg';

interface IconTileProps {
  icon: LucideIcon;
  tone?: Tone;
  size?: Size;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  filled:   'bg-laudok-800 text-surface',
  outlined: 'bg-surface text-laudok-800 border border-laudok-800',
  soft:     'bg-laudok-100 text-laudok-800',
};

const sizeClasses: Record<Size, string> = {
  sm: 'w-9 h-9 rounded-md',
  md: 'w-12 h-12 rounded-lg',
  lg: 'w-14 h-14 rounded-lg',
};

const iconSize: Record<Size, number> = { sm: 16, md: 20, lg: 24 };

export function IconTile({ icon: Icon, tone = 'filled', size = 'md', className }: IconTileProps) {
  return (
    <div
      className={[
        'inline-flex items-center justify-center flex-shrink-0',
        toneClasses[tone],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Icon size={iconSize[size]} strokeWidth={2} />
    </div>
  );
}
