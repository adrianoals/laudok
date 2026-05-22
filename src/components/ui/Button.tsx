import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
};

type LinkButtonProps = BaseProps & {
  href: string;
  external?: boolean;
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-laudok-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-alt disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-laudok-800 text-surface hover:bg-laudok-700 hover:scale-[1.02] active:scale-100 shadow-[0_4px_12px_-4px_rgba(3,69,117,0.4)]',
  secondary:
    'bg-surface text-laudok-800 border border-sand-200 hover:border-laudok-300 hover:bg-laudok-50',
  ghost:
    'text-laudok-800 hover:bg-laudok-100',
  outline:
    'border border-laudok-800 text-laudok-800 hover:bg-laudok-800 hover:text-surface',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

function classes(variant: Variant, size: Size, extra?: string) {
  return [baseClasses, variantClasses[variant], sizeClasses[size], extra].filter(Boolean).join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <button ref={ref} className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
});

export function LinkButton({
  variant = 'primary',
  size = 'md',
  href,
  external,
  className,
  children,
}: LinkButtonProps) {
  const cls = classes(variant, size, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
