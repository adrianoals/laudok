# Redesign Visual Brand-Bold-Architectural — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar visualmente todo o site Laudok! seguindo o spec aprovado (Brand Bold + Bricolage + Grid Blueprint + Neutros Quentes + Embossed Cards + animação moderada).

**Architecture:** Foundation-first em 4 fases sequenciais (1 commit por fase). Fase 1 estabelece tokens/fontes/utilitários CSS. Fase 2 cria primitivos reutilizáveis em `src/components/ui/`. Fase 3 reescreve a home usando os primitivos. Fase 4 propaga para Header/Footer e páginas internas, removendo aliases legados ao final.

**Tech Stack:** Next.js 15 App Router · React 19 · Tailwind CSS 4 (CSS-first config via `@theme`) · TypeScript strict · lucide-react · Embla Carousel · `next/font/google` (sem framer-motion, sem novas libs).

**Branch:** `redesign/brand-bold-architectural`

**Testing strategy:** Sem framework de testes neste repositório. Cada task verifica via:
- `npm run lint` (ESLint deve passar limpo)
- `npx tsc --noEmit` (typecheck deve passar limpo)
- `npm run dev` + checagem visual no navegador nas URLs afetadas
- Comparação contra o spec (`docs/superpowers/specs/2026-05-22-redesign-visual-design.md`)

---

## Fase 1 — Foundation (tokens, fontes, utilitários)

Objetivo: estabelecer todas as variáveis de design (CSS vars + `@theme` do Tailwind 4), carregar Bricolage + Inter via `next/font`, e criar utilitários CSS para decoração blueprint/filete. **Aliases legados** (`bg-laudok`, `text-laudok-dark`, `shadow-laudok`, `bg-gradient-laudok`) **continuam funcionando** ao fim desta fase.

### Task 1: Carregar Bricolage Grotesque + Inter via next/font

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Substituir o import de fonte em `layout.tsx`**

Conteúdo final de `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laudok.vercel.app"),
  title: "Laudok! - Laudos de Engenharia Inteligentes",
  description: "Plataforma especializada em laudos de engenharia para condomínios. Simplifique a gestão de laudos técnicos com nossa solução inteligente.",
  openGraph: {
    title: "Laudok! - Laudos de Engenharia Inteligentes",
    description: "Plataforma especializada em laudos de engenharia para condomínios.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Laudok! - Laudos de Engenharia Inteligentes",
      },
    ],
    type: "website",
    locale: "pt_BR",
    siteName: "Laudok!",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${bricolage.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-surface-alt text-ink" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Rodar typecheck e lint**

Run:
```bash
npx tsc --noEmit && npm run lint
```
Expected: ambos passam sem erro. (As classes `font-sans`, `bg-surface-alt`, `text-ink` ainda não existem; vão ser criadas na próxima task. Erros de classes Tailwind não falham o build — apenas não aplicam estilo. O passo final desta fase valida o resultado visual.)

### Task 2: Reescrever `globals.css` com tokens + `@theme` + utilitários

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Substituir todo o conteúdo de `globals.css`**

```css
@import "tailwindcss";

/* =========================================================
   Design tokens — Laudok! brand-bold-architectural
   ========================================================= */

:root {
  /* Brand scale */
  --laudok-50:  #f0f9ff;
  --laudok-100: #e6f4fa;
  --laudok-200: #c6e7f5;
  --laudok-300: #9dd8ee;
  --laudok-400: #5cb9dc;
  --laudok-500: #0086c2;
  --laudok-600: #0276af;
  --laudok-700: #035e8e;
  --laudok-800: #034575;
  --laudok-900: #033458;

  /* Warm neutrals */
  --sand-50:  #fbf9f4;
  --sand-100: #faf7f2;
  --sand-200: #ede7d8;
  --sand-300: #d4cdb8;

  /* Text */
  --ink:        #0f172a;
  --ink-muted:  #475569;
  --ink-faded:  #94a3b8;

  /* Surfaces */
  --surface:     #ffffff;
  --surface-alt: #faf7f2;

  /* Shadows (tinta azul) */
  --shadow-card:   0 1px 0 rgba(0,0,0,.04), 0 12px 30px -10px rgba(3,69,117,.18);
  --shadow-emboss: 0 30px 60px -30px rgba(3,69,117,.25), 0 2px 4px rgba(3,69,117,.05);
  --shadow-hover:  0 40px 80px -35px rgba(3,69,117,.35), 0 4px 8px rgba(3,69,117,.08);

  /* Motion */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-inout: cubic-bezier(0.6, 0, 0.4, 1);

  /* Legacy aliases (compat com componentes ainda não migrados) */
  --laudok:        var(--laudok-500);
  --laudok-dark:   var(--laudok-800);
  --laudok-light:  var(--laudok-100);
}

@theme inline {
  /* Cores */
  --color-laudok-50:  var(--laudok-50);
  --color-laudok-100: var(--laudok-100);
  --color-laudok-200: var(--laudok-200);
  --color-laudok-300: var(--laudok-300);
  --color-laudok-400: var(--laudok-400);
  --color-laudok-500: var(--laudok-500);
  --color-laudok-600: var(--laudok-600);
  --color-laudok-700: var(--laudok-700);
  --color-laudok-800: var(--laudok-800);
  --color-laudok-900: var(--laudok-900);
  --color-sand-50:  var(--sand-50);
  --color-sand-100: var(--sand-100);
  --color-sand-200: var(--sand-200);
  --color-sand-300: var(--sand-300);
  --color-ink:       var(--ink);
  --color-ink-muted: var(--ink-muted);
  --color-ink-faded: var(--ink-faded);
  --color-surface:     var(--surface);
  --color-surface-alt: var(--surface-alt);

  /* Aliases legados */
  --color-laudok:       var(--laudok-500);
  --color-laudok-dark:  var(--laudok-800);
  --color-laudok-light: var(--laudok-100);

  /* Fontes */
  --font-sans:    var(--font-inter), Inter, system-ui, sans-serif;
  --font-display: var(--font-display), 'Bricolage Grotesque', sans-serif;

  /* Sombras */
  --shadow-card:   var(--shadow-card);
  --shadow-emboss: var(--shadow-emboss);
  --shadow-hover:  var(--shadow-hover);
  --shadow-laudok:      var(--shadow-card);   /* alias legado */
  --shadow-laudok-dark: var(--shadow-hover);  /* alias legado */

  /* Radii */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  12px;
  --radius-xl:  16px;
  --radius-2xl: 20px;
}

/* =========================================================
   Tipografia — escala display custom (Bricolage)
   ========================================================= */

.font-display { font-family: var(--font-display); letter-spacing: -0.01em; }

.text-display-2xl { font-family: var(--font-display); font-size: clamp(2.75rem, 5vw + 1rem, 4.5rem); line-height: 1.05; letter-spacing: -0.025em; font-weight: 700; }
.text-display-xl  { font-family: var(--font-display); font-size: clamp(2.25rem, 4vw + 1rem, 3.5rem); line-height: 1.08; letter-spacing: -0.02em; font-weight: 700; }
.text-display-l   { font-family: var(--font-display); font-size: clamp(1.875rem, 2.5vw + 1rem, 2.75rem); line-height: 1.1; letter-spacing: -0.02em; font-weight: 700; }
.text-display-m   { font-family: var(--font-display); font-size: 2rem; line-height: 1.15; letter-spacing: -0.015em; font-weight: 700; }
.text-display-s   { font-family: var(--font-display); font-size: 1.5rem; line-height: 1.2; letter-spacing: -0.01em; font-weight: 700; }

.text-body-l   { font-size: 1.25rem; line-height: 1.5; }
.text-body     { font-size: 1rem;    line-height: 1.5; }
.text-body-s   { font-size: 0.875rem; line-height: 1.55; }
.text-caption  { font-size: 0.75rem; line-height: 1.5; }
.text-label    { font-size: 0.6875rem; line-height: 1.4; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; }

/* =========================================================
   Decoração — grid blueprint, filete lateral, gradient laudok
   ========================================================= */

.bg-grid-blueprint {
  background-image:
    linear-gradient(rgba(3,69,117,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(3,69,117,0.06) 1px, transparent 1px);
  background-size: 24px 24px;
}

.bg-grid-blueprint--masked {
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 90%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 90%);
}

.card-fillet {
  position: relative;
}
.card-fillet::before {
  content: '';
  position: absolute;
  left: 0;
  top: 24px;
  bottom: 24px;
  width: 3px;
  background: linear-gradient(180deg, var(--laudok-500), var(--laudok-800));
  border-radius: 0 3px 3px 0;
}

.bg-gradient-laudok {
  background: linear-gradient(135deg, var(--laudok-500) 0%, var(--laudok-800) 100%);
}

/* =========================================================
   Motion — Reveal helper (ativado via JS)
   ========================================================= */

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 700ms var(--ease-out),
    transform 700ms var(--ease-out);
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.is-visible {
    opacity: 1;
    transform: none;
    transition: none;
  }
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

/* =========================================================
   Base
   ========================================================= */

body {
  background: var(--surface-alt);
  color: var(--ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: var(--laudok-200);
  color: var(--laudok-900);
}
```

- [ ] **Step 2: Rodar build local para confirmar que o @theme funciona**

Run:
```bash
npm run lint && npx tsc --noEmit
```
Expected: ambos passam. Tailwind 4 não emite erro para classes desconhecidas em CSS; pode haver warnings de Next.js mas não erros.

### Task 3: Remover/limpar `tailwind.config.ts` legacy (Tailwind 4 usa CSS-first)

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Reduzir `tailwind.config.ts` ao mínimo**

Tailwind 4 não precisa mais de `theme.extend` em JS (está tudo no `@theme` do globals.css). Deixar apenas content para detecção de classes:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};

export default config;
```

- [ ] **Step 2: Verificar lint + typecheck**

```bash
npx tsc --noEmit && npm run lint
```
Expected: pass.

### Task 4: Verificação visual da fase 1 e commit

- [ ] **Step 1: Rodar dev server**

```bash
npm run dev
```

- [ ] **Step 2: Abrir http://localhost:3000 no navegador e verificar**

Esperado:
- Fonte do corpo é Inter (não Arial fallback)
- Fundo geral creme (#FAF7F2) em vez de branco puro
- Site funciona — todas as páginas carregam (Home, /contato, /faq, /em-breve, etc.)
- Classes legadas (`bg-laudok-dark`, `text-laudok-light`, `bg-gradient-laudok`) continuam estilizando corretamente

Se algo quebrar visualmente, conferir o mapeamento de aliases legados em `globals.css`.

- [ ] **Step 3: Parar o dev server e commitar**

```bash
git add src/app/layout.tsx src/app/globals.css tailwind.config.ts
git commit -m "chore(design): fundação de tokens, fontes Bricolage+Inter e utilitários blueprint"
```

---

## Fase 2 — Primitivos do design system

Objetivo: criar componentes reutilizáveis em `src/components/ui/` que encapsulam o vocabulário visual. Cada primitivo é um arquivo pequeno e focado.

### Task 5: Criar `Button` primitivo

**Files:**
- Create: `src/components/ui/Button.tsx`

- [ ] **Step 1: Criar arquivo**

```tsx
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
```

- [ ] **Step 2: Verificar typecheck e lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: pass.

### Task 6: Criar `Badge` primitivo

**Files:**
- Create: `src/components/ui/Badge.tsx`

- [ ] **Step 1: Criar arquivo**

```tsx
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
```

- [ ] **Step 2: Verificar**

```bash
npx tsc --noEmit && npm run lint
```
Expected: pass.

### Task 7: Criar `Card` primitivo

**Files:**
- Create: `src/components/ui/Card.tsx`

- [ ] **Step 1: Criar arquivo**

```tsx
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
```

- [ ] **Step 2: Verificar**

```bash
npx tsc --noEmit && npm run lint
```
Expected: pass.

### Task 8: Criar `IconTile` primitivo

**Files:**
- Create: `src/components/ui/IconTile.tsx`

- [ ] **Step 1: Criar arquivo**

```tsx
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
```

- [ ] **Step 2: Verificar**

```bash
npx tsc --noEmit && npm run lint
```
Expected: pass.

### Task 9: Criar `SectionShell` primitivo

**Files:**
- Create: `src/components/ui/SectionShell.tsx`

- [ ] **Step 1: Criar arquivo**

```tsx
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
```

- [ ] **Step 2: Verificar**

```bash
npx tsc --noEmit && npm run lint
```
Expected: pass.

### Task 10: Criar `Eyebrow` primitivo

**Files:**
- Create: `src/components/ui/Eyebrow.tsx`

- [ ] **Step 1: Criar arquivo**

```tsx
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
```

- [ ] **Step 2: Verificar**

```bash
npx tsc --noEmit && npm run lint
```
Expected: pass.

### Task 11: Criar `NumberStep` primitivo

**Files:**
- Create: `src/components/ui/NumberStep.tsx`

- [ ] **Step 1: Criar arquivo**

```tsx
interface NumberStepProps {
  n: number;
  className?: string;
}

export function NumberStep({ n, className }: NumberStepProps) {
  return (
    <div className={['text-display-l text-laudok-500/60 font-display tabular-nums leading-none', className].filter(Boolean).join(' ')}>
      {n.toString().padStart(2, '0')}
    </div>
  );
}
```

- [ ] **Step 2: Verificar**

```bash
npx tsc --noEmit && npm run lint
```
Expected: pass.

### Task 12: Criar `Reveal` primitivo (IntersectionObserver)

**Files:**
- Create: `src/components/ui/Reveal.tsx`

- [ ] **Step 1: Criar arquivo**

```tsx
'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}

export function Reveal({ as: Tag = 'div', delay = 0, className, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = window.setTimeout(() => setVisible(true), delay);
            observer.disconnect();
            return () => window.clearTimeout(id);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as never}
      className={['reveal', visible ? 'is-visible' : '', className].filter(Boolean).join(' ')}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Verificar**

```bash
npx tsc --noEmit && npm run lint
```
Expected: pass.

### Task 13: Criar `index.ts` barrel para o ui/

**Files:**
- Create: `src/components/ui/index.ts`

- [ ] **Step 1: Criar arquivo**

```ts
export { Button, LinkButton } from './Button';
export { Badge } from './Badge';
export { Card } from './Card';
export { IconTile } from './IconTile';
export { SectionShell } from './SectionShell';
export { Eyebrow } from './Eyebrow';
export { NumberStep } from './NumberStep';
export { Reveal } from './Reveal';
```

- [ ] **Step 2: Verificar e commitar fase 2**

```bash
npx tsc --noEmit && npm run lint
git add src/components/ui/
git commit -m "feat(ui): primitivos do design system (Button, Card, Badge, IconTile, SectionShell, Eyebrow, NumberStep, Reveal)"
```

---

## Fase 3 — Reescrever seções da Home

Cada task reescreve um componente da home usando os primitivos. Ordem: do mais simples ao mais complexo. Após todas as seções, fazer uma verificação visual integrada antes do commit.

### Task 14: Redesign `HeroSection`

**Files:**
- Modify: `src/components/home/HeroSection.tsx`

- [ ] **Step 1: Substituir o arquivo todo**

```tsx
import { ArrowRight } from 'lucide-react';
import { Eyebrow, LinkButton, Reveal, SectionShell } from '@/components/ui';

export default function HeroSection() {
  return (
    <SectionShell tone="cream" withGrid className="pt-32 md:pt-40">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <Reveal>
            <Eyebrow>Laudok! · Engenharia diagnóstica</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display-2xl text-laudok-900">
              Laudos de engenharia,<br />
              <span className="text-laudok-500">com inteligência.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-body-l text-ink-muted max-w-xl">
              Plataforma especializada em laudos técnicos para condomínios. Conformidade com a NBR 16.747/2020,
              produtividade para engenheiros e arquitetos.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-col sm:flex-row gap-3">
              <LinkButton href="/teste-gratis" size="lg">
                Experimente Grátis
                <ArrowRight size={18} />
              </LinkButton>
              <LinkButton href="/#plans" variant="secondary" size="lg">
                Ver planos
              </LinkButton>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5 hidden lg:block">
          <Reveal delay={320}>
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-laudok shadow-[var(--shadow-emboss)]" />
              <div className="absolute inset-4 rounded-xl border border-laudok-300/40 bg-grid-blueprint bg-grid-blueprint--masked" aria-hidden />
              <div className="absolute bottom-6 left-6 right-6 text-surface">
                <div className="text-label opacity-80">NBR 16.747/2020</div>
                <div className="text-display-s mt-2">Laudo gerado em minutos.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Verificar visualmente**

```bash
npm run dev
```
Abrir http://localhost:3000 — verificar que o Hero renderiza com fundo creme, grid sutil, título grande em Bricolage, dois CTAs, painel decorativo à direita em desktop.

### Task 15: Redesign `AboutSection`

**Files:**
- Modify: `src/components/home/AboutSection.tsx`

- [ ] **Step 1: Substituir conteúdo**

```tsx
import Image from 'next/image';
import { Card, Eyebrow, Reveal, SectionShell } from '@/components/ui';

export default function AboutSection() {
  return (
    <SectionShell id="about" tone="surface">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Card variant="emboss" className="overflow-hidden">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/about-image.jpg"
                alt="Equipe Laudok!"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </Card>
        </Reveal>
        <div className="space-y-6">
          <Reveal>
            <Eyebrow>Sobre nós</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-display-l text-laudok-900">
              Sobre a Laudok! Inovação para a engenharia diagnóstica.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-body-l text-ink-muted">
              A Laudok! nasce da expertise em engenharia diagnóstica com o propósito de inovar a rotina de peritos
              e profissionais da construção civil. Desenvolvemos o Laudok! para simplificar processos complexos,
              garantindo conformidade técnica e elevando a produtividade na elaboração de laudos de inspeção predial.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-body text-ink-muted">
              Nosso compromisso é com a excelência técnica e a conformidade total com a ABNT NBR 16.747/2020,
              transformando a maneira como profissionais realizam vistorias e elaboram laudos.
            </p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Verificar visualmente** http://localhost:3000 → seção #about.

### Task 16: Redesign `ProblemSolutionSection`

**Files:**
- Modify: `src/components/home/ProblemSolutionSection.tsx`

- [ ] **Step 1: Ler o arquivo atual antes de modificar**

```bash
cat src/components/home/ProblemSolutionSection.tsx
```
Capturar os bullets "antes/depois" existentes para reusar o conteúdo.

- [ ] **Step 2: Substituir conteúdo**

```tsx
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Badge, Card, Eyebrow, IconTile, Reveal, SectionShell } from '@/components/ui';

const problems = [
  'Laudos longos e repetitivos consumindo dias de trabalho',
  'Risco constante de não conformidade com a NBR 16.747',
  'Falta de padrão entre laudos da mesma equipe',
  'Catalogação manual de anomalias propensa a erros',
];

const solutions = [
  'Geração automática de laudos em minutos',
  'Conformidade técnica garantida em cada relatório',
  'Templates padronizados, fáceis de personalizar',
  'Catálogo de anomalias com referência à norma',
];

export default function ProblemSolutionSection() {
  return (
    <SectionShell tone="cream">
      <div className="max-w-3xl mb-16">
        <Reveal>
          <Eyebrow>O problema · A solução</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-display-l text-laudok-900 mt-4">
            O trabalho mudou. O laudo também mudou.
          </h2>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Reveal>
          <Card variant="flat" className="p-8 h-full">
            <Badge variant="outline" size="sm" className="mb-4">Antes</Badge>
            <h3 className="text-display-s text-ink mb-6">Sem o Laudok!</h3>
            <ul className="space-y-4">
              {problems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-ink-muted">
                  <IconTile icon={AlertTriangle} tone="soft" size="sm" />
                  <span className="pt-1.5">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
        <Reveal delay={120}>
          <Card variant="emboss" withFillet className="p-8 h-full">
            <Badge variant="solid" size="sm" className="mb-4">Depois</Badge>
            <h3 className="text-display-s text-laudok-900 mb-6">Com o Laudok!</h3>
            <ul className="space-y-4">
              {solutions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-ink">
                  <IconTile icon={CheckCircle2} tone="filled" size="sm" />
                  <span className="pt-1.5">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 3: Verificar visualmente.**

### Task 17: Redesign `FeaturesSection`

**Files:**
- Modify: `src/components/home/FeaturesSection.tsx`

- [ ] **Step 1: Substituir conteúdo**

```tsx
import { FileText, Clock, Shield, Users, Zap, BarChart } from 'lucide-react';
import { Card, Eyebrow, IconTile, Reveal, SectionShell } from '@/components/ui';

const features = [
  { icon: FileText, title: 'Laudos padronizados', desc: 'Geração automática conforme a NBR 16.747/2020.' },
  { icon: Clock, title: 'Economia de tempo', desc: 'Reduza até 80% do tempo gasto na elaboração de laudos.' },
  { icon: Shield, title: 'Conformidade garantida', desc: 'Sempre atualizado com as normas técnicas mais recentes.' },
  { icon: Users, title: 'Colaboração em equipe', desc: 'Compartilhe projetos e documentos com fluidez.' },
  { icon: Zap, title: 'Processo otimizado', desc: 'Fluxo de trabalho que guia você em cada etapa.' },
  { icon: BarChart, title: 'Análises detalhadas', desc: 'Relatórios completos com gráficos e estatísticas.' },
];

export default function FeaturesSection() {
  return (
    <SectionShell id="features" tone="surface">
      <div className="max-w-3xl mb-16">
        <Reveal><Eyebrow>Funcionalidades</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="text-display-l text-laudok-900 mt-4">
            Tudo que sua equipe técnica precisa.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-body-l text-ink-muted mt-4">
            Ferramentas pensadas para profissionais de engenharia e arquitetura que valorizam tempo e precisão.
          </p>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <Reveal key={feature.title} delay={idx * 60}>
            <Card variant="emboss" withFillet hoverable className="p-6 h-full">
              <IconTile icon={feature.icon} tone="filled" size="md" className="mb-5" />
              <h3 className="text-display-s text-laudok-900 mb-2">{feature.title}</h3>
              <p className="text-body-s text-ink-muted">{feature.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Verificar visualmente.**

### Task 18: Redesign `HowItWorksSection`

**Files:**
- Modify: `src/components/home/HowItWorksSection.tsx`

- [ ] **Step 1: Substituir conteúdo**

```tsx
import { ClipboardList, Camera, FileText, CheckCircle } from 'lucide-react';
import { Eyebrow, IconTile, NumberStep, Reveal, SectionShell } from '@/components/ui';

const steps = [
  { icon: ClipboardList, title: 'Cadastro do projeto', desc: 'Informe dados básicos do condomínio e inicie seu projeto.' },
  { icon: Camera, title: 'Vistoria técnica', desc: 'Realize a vistoria e registre as anomalias encontradas.' },
  { icon: FileText, title: 'Geração do laudo', desc: 'O sistema gera automaticamente conforme a NBR 16.747.' },
  { icon: CheckCircle, title: 'Revisão e entrega', desc: 'Revise o documento e entregue ao cliente com rapidez.' },
];

export default function HowItWorksSection() {
  return (
    <SectionShell id="how-it-works" tone="cream" withGrid>
      <div className="max-w-3xl mb-16">
        <Reveal><Eyebrow>Como funciona</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="text-display-l text-laudok-900 mt-4">
            Quatro passos, do projeto ao laudo entregue.
          </h2>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {steps.map((step, idx) => (
          <Reveal key={step.title} delay={idx * 80}>
            <div className="relative">
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%-12px)] w-6 border-t border-dashed border-laudok-300" aria-hidden />
              )}
              <div className="flex items-start gap-4 mb-5">
                <NumberStep n={idx + 1} />
                <IconTile icon={step.icon} tone="outlined" size="md" />
              </div>
              <h3 className="text-display-s text-laudok-900 mb-2">{step.title}</h3>
              <p className="text-body-s text-ink-muted">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Verificar visualmente.**

### Task 19: Redesign `PlansSection`

**Files:**
- Modify: `src/components/home/PlansSection.tsx`

- [ ] **Step 1: Reescrever — manter dados dos planos, trocar UI**

```tsx
"use client";

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Badge, Button, Card, Eyebrow, Reveal, SectionShell } from '@/components/ui';

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  perLaudoPrice: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const plans: Plan[] = [
  {
    id: 'avulso',
    name: 'Avulso',
    description: 'Elaboração de apenas 1 laudo',
    monthlyPrice: 'R$ 0',
    perLaudoPrice: 'R$ 890',
    features: ['Sem assinatura mensal', '1 laudo gerado', 'Conformidade com NBR 16.747/2020', 'Suporte por e-mail'],
    cta: 'Começar agora',
    highlighted: false,
  },
  {
    id: 'semestral',
    name: 'Assinatura 6 meses',
    description: 'Para uso recorrente em projetos contínuos',
    monthlyPrice: 'R$ 170',
    perLaudoPrice: 'R$ 270',
    features: ['Assinatura semestral', 'Laudos sob demanda', 'Conformidade com NBR 16.747/2020', 'Suporte prioritário', 'Renovação automática'],
    cta: 'Assinar 6 meses',
    highlighted: false,
  },
  {
    id: 'anual',
    name: 'Assinatura 12 meses',
    description: 'Melhor custo-benefício para uso intensivo',
    monthlyPrice: 'R$ 160',
    perLaudoPrice: 'R$ 240',
    features: ['Assinatura anual', 'Menor custo por laudo', 'Laudos sob demanda', 'Conformidade com NBR 16.747/2020', 'Suporte prioritário', 'Renovação automática'],
    cta: 'Assinar 12 meses',
    highlighted: true,
  },
];

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect: () => void }) {
  return (
    <Card variant="emboss" withFillet={plan.highlighted} className="p-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-display-s text-laudok-900">{plan.name}</h3>
        {plan.highlighted && <Badge variant="solid" size="sm">Mais Popular</Badge>}
      </div>
      <p className="text-body-s text-ink-muted mb-6 min-h-[40px]">{plan.description}</p>
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-display-l text-laudok-900">{plan.monthlyPrice}</span>
          <span className="text-body-s text-ink-muted">/mês</span>
        </div>
        <div className="text-body-s text-ink-muted mt-2">
          + <span className="text-laudok-800 font-semibold">{plan.perLaudoPrice}</span> por laudo gerado
        </div>
      </div>
      <Button onClick={onSelect} variant={plan.highlighted ? 'primary' : 'secondary'} className="w-full mb-6">
        {plan.cta}
      </Button>
      <div className="pt-6 border-t border-sand-200 flex-grow">
        <div className="text-label text-laudok-700 mb-4">O que está incluso</div>
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-body-s text-ink">
              <Check size={16} className="text-laudok-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default function PlansSection() {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    slidesToScroll: 1,
    startIndex: 2,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const handleSelect = () => router.push('/em-breve');

  return (
    <SectionShell id="plans" tone="surface">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Reveal>
          <Eyebrow className="justify-center"><span>Planos e preços</span></Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-display-l text-laudok-900 mt-4">
            Pague apenas pelo que usar.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-body-l text-ink-muted mt-4">
            Cada plano combina uma mensalidade fixa com o valor por laudo gerado.
          </p>
        </Reveal>
      </div>

      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {plans.map((plan, idx) => (
          <Reveal key={plan.id} delay={idx * 80}>
            <PlanCard plan={plan} onSelect={handleSelect} />
          </Reveal>
        ))}
      </div>

      <div className="lg:hidden">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {plans.map((plan) => (
                <div key={plan.id} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-3">
                  <PlanCard plan={plan} onSelect={handleSelect} />
                </div>
              ))}
            </div>
          </div>
          <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-surface p-2 rounded-full shadow-[var(--shadow-card)] -ml-3" aria-label="Plano anterior">
            <ChevronLeft size={20} className="text-laudok-800" />
          </button>
          <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-surface p-2 rounded-full shadow-[var(--shadow-card)] -mr-3" aria-label="Próximo plano">
            <ChevronRight size={20} className="text-laudok-800" />
          </button>
        </div>
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Verificar visualmente.**

### Task 20: Redesign `TestimonialsSection`

**Files:**
- Modify: `src/components/home/TestimonialsSection.tsx`

- [ ] **Step 1: Ler o arquivo atual para preservar os 5 depoimentos**

```bash
cat src/components/home/TestimonialsSection.tsx
```

- [ ] **Step 2: Substituir conteúdo (mantendo dados originais dos depoimentos)**

Estrutura: `SectionShell tone="cream"`, header com Eyebrow + h2, Embla carousel (mantido), cada card vira `<Card variant="emboss" withFillet>` com `IconTile` (Star) substituindo as estrelas, autor em `text-display-s text-laudok-900`, role/company em `text-body-s text-ink-muted`, citação em `text-body text-ink`. Manter array `testimonials` original.

Código completo:

```tsx
"use client";

import { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, Eyebrow, Reveal, SectionShell } from '@/components/ui';

const testimonials = [
  {
    name: 'Eng. Carlos Silva',
    role: 'Engenheiro Civil',
    company: 'Construtora XYZ',
    image: '/images/engineer-1.jpg',
    content: 'O Laudok! revolucionou nossa forma de trabalhar. Conseguimos reduzir o tempo de elaboração dos laudos em mais de 70% e a qualidade melhorou significativamente.',
    rating: 5,
  },
  {
    name: 'Arq. Ana Santos',
    role: 'Arquiteta',
    company: 'Escritório ABC',
    image: '/images/architect-1.jpg',
    content: 'A conformidade com a NBR 16.747 é automática e isso nos dá muita segurança. O suporte é excelente e sempre nos ajuda quando precisamos.',
    rating: 5,
  },
  {
    name: 'Eng. Roberto Lima',
    role: 'Engenheiro de Perícias',
    company: 'Consultoria Técnica',
    image: '/images/engineer-2.jpg',
    content: 'A automação dos relatórios fotográficos é impressionante. O que antes levava dias, agora fazemos em horas. Recomendo fortemente!',
    rating: 5,
  },
  {
    name: 'Profa. Dra. Maria Oliveira',
    role: 'Engenheira Civil e Professora',
    company: 'Universidade Federal',
    image: '/images/engineer-3.jpg',
    content: 'Como professora, posso dizer que o Laudok! é uma ferramenta essencial para nossos alunos. A interface intuitiva e a conformidade com as normas técnicas tornam o aprendizado muito mais prático e eficiente.',
    rating: 5,
  },
  {
    name: 'Arq. Pedro Mendes',
    role: 'Arquiteto',
    company: 'Studio de Arquitetura',
    image: '/images/architect-2.jpg',
    content: 'A precisão e rapidez na geração de laudos técnicos com o Laudok! nos permite focar mais no design e menos na burocracia. Uma ferramenta indispensável para arquitetos modernos.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true, slidesToScroll: 1 });

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  useEffect(() => autoplay(), [autoplay]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <SectionShell id="testimonials" tone="cream">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Reveal>
          <Eyebrow className="justify-center"><span>Depoimentos</span></Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-display-l text-laudok-900 mt-4">O que dizem nossos clientes.</h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-body-l text-ink-muted mt-4">
            Profissionais que já transformaram a produtividade com o Laudok!
          </p>
        </Reveal>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t) => (
              <div key={t.name} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-3">
                <Card variant="emboss" withFillet className="p-7 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-laudok-500 fill-laudok-500" />
                    ))}
                  </div>
                  <p className="text-body text-ink italic mb-6">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-sand-200">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="text-body font-semibold text-laudok-900">{t.name}</div>
                      <div className="text-body-s text-ink-muted">{t.role} · {t.company}</div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-surface p-2 rounded-full shadow-[var(--shadow-card)] -ml-3" aria-label="Depoimento anterior">
          <ChevronLeft size={20} className="text-laudok-800" />
        </button>
        <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-surface p-2 rounded-full shadow-[var(--shadow-card)] -mr-3" aria-label="Próximo depoimento">
          <ChevronRight size={20} className="text-laudok-800" />
        </button>
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 3: Verificar visualmente.**

### Task 21: Redesign `CTASection`

**Files:**
- Modify: `src/components/home/CTASection.tsx`

- [ ] **Step 1: Substituir conteúdo**

```tsx
import { ArrowRight } from 'lucide-react';
import { Eyebrow, LinkButton, Reveal, SectionShell } from '@/components/ui';

export default function CTASection() {
  return (
    <SectionShell tone="surface" withGrid>
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow className="justify-center"><span>Comece agora</span></Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-display-xl text-laudok-900 mt-4">
            Transforme sua produtividade hoje mesmo.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-body-l text-ink-muted mt-4">
            Experimente gratuitamente e descubra como o Laudok! pode revolucionar sua forma de trabalhar.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10">
            <LinkButton href="/teste-gratis" size="lg">
              Experimente Grátis
              <ArrowRight size={18} />
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Verificar visualmente.**

### Task 22: Estilizar `FAQSection` (home teaser)

**Files:**
- Modify: `src/components/home/FAQSection.tsx`

- [ ] **Step 1: Substituir conteúdo**

```tsx
import { ArrowRight } from 'lucide-react';
import { Eyebrow, LinkButton, Reveal, SectionShell } from '@/components/ui';

export default function FAQSection() {
  return (
    <SectionShell id="faq" tone="cream">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow className="justify-center"><span>Perguntas frequentes</span></Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-display-l text-laudok-900 mt-4">
            Tudo o que você precisa saber, num só lugar.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-body-l text-ink-muted mt-4">
            Filtre por categoria e encontre as respostas mais comuns sobre o Laudok!
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10">
            <LinkButton href="/faq" size="lg">
              Ver todas as perguntas
              <ArrowRight size={18} />
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Verificar visualmente e commitar fase 3**

```bash
npx tsc --noEmit && npm run lint
git add src/components/home/
git commit -m "feat(home): redesign de todas as seções com primitivos do design system"
```

---

## Fase 4 — Header, Footer, NewsletterSignup e páginas internas

### Task 23: Redesign `Header`

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Substituir conteúdo**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { LinkButton } from '@/components/ui';

const navLinks = [
  { href: '/#about', label: 'Sobre' },
  { href: '/#features', label: 'Funcionalidades' },
  { href: '/#how-it-works', label: 'Como Funciona' },
  { href: '/#plans', label: 'Planos' },
  { href: '/faq', label: 'Perguntas Frequentes' },
  { href: '/contato', label: 'Contato' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-md border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.svg" alt="Laudok! Logo" width={140} height={36} className="h-8 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-body-s font-medium text-ink hover:text-laudok-500 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-flex text-body-s font-medium text-laudok-800 hover:text-laudok-500 transition-colors">
              Login
            </Link>
            <LinkButton href="/teste-gratis" size="sm" className="hidden sm:inline-flex">
              Experimente Grátis
            </LinkButton>
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-laudok-800 hover:bg-sand-100 transition-colors"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-sand-200">
          <nav className="px-4 sm:px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-body font-medium text-ink hover:text-laudok-500 hover:bg-sand-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="sm:hidden block px-3 py-2 rounded-md text-body font-medium text-laudok-800 hover:bg-sand-100 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verificar — header sticky em todas as páginas com fundo branco/borda sand.**

### Task 24: Redesign `Footer`

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Substituir conteúdo**

```tsx
import Link from 'next/link';
import { Linkedin, Instagram, Youtube, Mail, MapPin } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

const quickLinks = [
  { href: '/#about', label: 'Sobre' },
  { href: '/#features', label: 'Funcionalidades' },
  { href: '/#how-it-works', label: 'Como Funciona' },
  { href: '/#plans', label: 'Planos e Preços' },
  { href: '/faq', label: 'Perguntas Frequentes' },
  { href: '/contato', label: 'Contato' },
];

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/laudok' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/laudo.ok' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@Laudok' },
];

export default function Footer() {
  return (
    <footer className="bg-laudok-900 text-surface">
      <NewsletterSignup />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-5">
              <span className="text-display-m text-surface">Laudok!</span>
            </Link>
            <p className="text-body-s text-laudok-200 max-w-sm">
              Transformando a forma como laudos técnicos são elaborados. Soluções inteligentes para engenheiros e arquitetos.
            </p>
            <div className="flex gap-2 mt-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-laudok-700 text-surface hover:bg-laudok-800 hover:border-laudok-500 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-label text-laudok-200 mb-5">Navegação</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-s text-laudok-100 hover:text-surface transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-label text-laudok-200 mb-5">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-body-s text-laudok-100">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a href="mailto:contato@laudok.com.br" className="hover:text-surface transition-colors">contato@laudok.com.br</a>
              </li>
              <li className="flex items-start gap-3 text-body-s text-laudok-100">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-laudok-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-s text-laudok-200">
            <Link href="/politica-de-privacidade" className="hover:text-surface transition-colors">Política de Privacidade</Link>
            <Link href="/termos-de-uso" className="hover:text-surface transition-colors">Termos de Uso</Link>
          </div>
          <p className="text-body-s text-laudok-300">
            © {new Date().getFullYear()} Laudok! Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verificar — footer escuro com gradiente azul, newsletter no topo.**

### Task 25: Redesign `NewsletterSignup`

**Files:**
- Modify: `src/components/layout/NewsletterSignup.tsx`

- [ ] **Step 1: Substituir conteúdo (mantém função, troca UI)**

```tsx
'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Loader2, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui';

type Status = 'idle' | 'loading' | 'success' | 'error';

// TODO: substituir o submit pelo embed/integração oficial do RD Station Marketing
// quando o Henrique disponibilizar o formulário.
export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível concluir sua inscrição.');
      setStatus('success');
      setFeedback('Inscrição confirmada! Em breve você receberá novidades da Laudok!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setFeedback(
        error instanceof Error ? error.message : 'Não foi possível concluir sua inscrição. Tente novamente.',
      );
    }
  };

  return (
    <section className="relative border-b border-laudok-800/60 bg-laudok-900">
      <div className="absolute inset-0 bg-grid-blueprint bg-grid-blueprint--masked opacity-40 pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="text-label text-laudok-200">Newsletter</div>
            <h2 className="text-display-m text-surface">Assine a newsletter Laudok!</h2>
            <p className="text-body text-laudok-100 max-w-md">
              Conteúdos sobre laudos de engenharia, atualizações da NBR 16.747 e novidades da plataforma — direto no seu e-mail.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="lg:col-span-6 w-full">
            <div className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">Seu melhor e-mail</label>
              <div className="relative flex-grow">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-laudok-700" />
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu melhor e-mail"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full rounded-md bg-surface text-ink placeholder:text-ink-faded py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-laudok-300 disabled:opacity-60"
                />
              </div>
              <Button type="submit" size="lg" disabled={status === 'loading' || status === 'success'}>
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Enviando...
                  </>
                ) : (
                  'Inscrever-se'
                )}
              </Button>
            </div>

            {status === 'success' && (
              <p className="mt-3 flex items-start gap-2 text-body-s text-laudok-100">
                <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                {feedback}
              </p>
            )}
            {status === 'error' && (
              <p className="mt-3 flex items-start gap-2 text-body-s text-laudok-100">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                {feedback}
              </p>
            )}

            <p className="mt-3 text-caption text-laudok-300">
              Ao se inscrever, você concorda com nossa{' '}
              <Link href="/politica-de-privacidade" className="underline hover:text-surface">
                Política de Privacidade
              </Link>
              . Cancele quando quiser.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar.**

### Task 26: Redesign `/contato` (ContactInfo + ContactForm + page)

**Files:**
- Modify: `src/components/contato/ContactInfo.tsx`
- Modify: `src/components/contato/ContactForm.tsx`
- Modify: `src/app/contato/page.tsx`

- [ ] **Step 1: Atualizar `ContactInfo.tsx`**

```tsx
import { Mail, MapPin, Linkedin, Instagram, Youtube, type LucideIcon } from 'lucide-react';
import { IconTile } from '@/components/ui';

const socials: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/laudok' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/laudo.ok' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@Laudok' },
];

export default function ContactInfo() {
  return (
    <div className="space-y-10">
      <div>
        <div className="text-label text-laudok-700 mb-3">Fale com a gente</div>
        <h2 className="text-display-m text-laudok-900 mb-4">Entre em contato.</h2>
        <p className="text-body text-ink-muted">
          Estamos prontos para ajudar você. Use os canais abaixo ou preencha o formulário ao lado.
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <IconTile icon={Mail} tone="soft" size="md" />
          <div>
            <div className="text-label text-laudok-700 mb-1">E-mail</div>
            <a href="mailto:contato@laudok.com.br" className="text-body text-ink hover:text-laudok-500 transition-colors">
              contato@laudok.com.br
            </a>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <IconTile icon={MapPin} tone="soft" size="md" />
          <div>
            <div className="text-label text-laudok-700 mb-1">Localização</div>
            <p className="text-body text-ink">São Paulo, SP</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-sand-200">
        <div className="text-label text-laudok-700 mb-3">Redes sociais</div>
        <div className="flex gap-2">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-sand-200 text-laudok-800 hover:bg-laudok-800 hover:text-surface hover:border-laudok-800 transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <p className="text-caption text-ink-muted">
        Horário de atendimento: Segunda a Sexta, das 9h às 18h
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Atualizar `ContactForm.tsx` (tokens + Button primitivo)**

Manter lógica de submit/state. Trocar somente classes do form e o botão. Substituir o `<button type="submit">` por `<Button type="submit">`. Inputs ganham classes:

```
className="w-full px-4 py-3 rounded-md bg-surface border border-sand-200 text-ink placeholder:text-ink-faded focus:outline-none focus:ring-2 focus:ring-laudok-300 focus:border-laudok-500 transition-colors"
```

Wrapper do card vira:
```
<div className="bg-surface rounded-2xl shadow-[var(--shadow-emboss)] p-8">
```

Título principal: `<h2 className="text-display-m text-laudok-900 mb-6">Envie sua mensagem</h2>`. Mensagens de sucesso/erro mantêm cores verde/vermelho (são semânticas).

- [ ] **Step 3: Atualizar `src/app/contato/page.tsx`**

```tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contato/ContactForm';
import ContactInfo from '@/components/contato/ContactInfo';
import { SectionShell } from '@/components/ui';

export const metadata = {
  title: 'Contato - Laudok!',
  description: 'Entre em contato com a Laudok! Estamos prontos para ajudar você com laudos de engenharia.',
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="dark" withGrid className="pt-20 pb-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-label text-laudok-200 mb-3">Contato</div>
            <h1 className="text-display-xl text-surface">Entre em contato</h1>
            <p className="text-body-l text-laudok-100 mt-4">
              Tire suas dúvidas ou solicite mais informações sobre nossos serviços.
            </p>
          </div>
        </SectionShell>
        <SectionShell tone="cream">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Verificar `/contato`.**

### Task 27: Redesign `/faq` (`FAQContent` e `page.tsx`)

**Files:**
- Modify: `src/app/faq/page.tsx`
- Modify: `src/app/faq/FAQContent.tsx`

- [ ] **Step 1: Atualizar `page.tsx`**

```tsx
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LinkButton, SectionShell } from '@/components/ui';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes - Laudok!',
  description: 'Perguntas frequentes organizadas por categoria — Sobre o Produto, Atendimento à Norma, Financeiro e Pagamento, Segurança e Privacidade.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="dark" withGrid className="pt-20 pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-label text-laudok-200 mb-3">Auto atendimento</div>
            <h1 className="text-display-xl text-surface">Perguntas Frequentes</h1>
            <p className="text-body-l text-laudok-100 mt-4">
              Encontre rapidamente as respostas para as dúvidas mais comuns. Filtre por categoria ou use a busca.
            </p>
          </div>
        </SectionShell>
        <SectionShell tone="cream">
          <FAQContent />
        </SectionShell>
        <SectionShell tone="surface">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-display-m text-laudok-900 mb-4">Não encontrou a sua resposta?</h2>
            <p className="text-body-l text-ink-muted mb-8">
              Nossa equipe está pronta para te ajudar. Fale com a gente e tire sua dúvida.
            </p>
            <LinkButton href="/contato" size="lg">Fale com a Laudok!</LinkButton>
          </div>
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Atualizar `FAQContent.tsx`**

Manter array `faqs` e `categories` e lógica de filter/search inalterados. Trocar somente apresentação:
- Pills das categorias usam `Badge` com `variant="solid"` quando ativa, `variant="outline"` quando inativa.
- Input de busca: `bg-surface border border-sand-200 rounded-full text-ink placeholder:text-ink-faded focus:ring-2 focus:ring-laudok-300`
- Accordion: `<Card variant="flat" className="overflow-hidden">` substituindo wrapper. Botão de pergunta `text-display-s text-laudok-900`. Resposta `text-body text-ink`.

```tsx
"use client";

import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Badge, Card } from '@/components/ui';

type CategoryId = 'todos' | 'produto' | 'norma' | 'financeiro' | 'seguranca';

interface FAQItem {
  category: Exclude<CategoryId, 'todos'>;
  question: string;
  answer: string;
}

const categories: { id: CategoryId; label: string }[] = [
  { id: 'todos', label: 'Todas' },
  { id: 'produto', label: 'Sobre o Produto' },
  { id: 'norma', label: 'Atendimento à Norma' },
  { id: 'financeiro', label: 'Financeiro e Pagamento' },
  { id: 'seguranca', label: 'Segurança e Privacidade' },
];

const faqs: FAQItem[] = [
  // ... mesmas 9 entradas atuais, sem mudar texto ...
];

export default function FAQContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const term = normalize(search.trim());
    return faqs.filter((faq) => {
      const matchCategory = activeCategory === 'todos' || faq.category === activeCategory;
      if (!matchCategory) return false;
      if (!term) return true;
      return normalize(faq.question).includes(term) || normalize(faq.answer).includes(term);
    });
  }, [activeCategory, search]);

  const handleCategoryChange = (id: CategoryId) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  return (
    <div className="space-y-10">
      <div className="max-w-2xl mx-auto">
        <label htmlFor="faq-search" className="sr-only">Buscar pergunta</label>
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faded" />
          <input
            id="faq-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por palavra-chave..."
            className="w-full rounded-full border border-sand-200 bg-surface py-3 pl-12 pr-4 text-ink placeholder:text-ink-faded focus:outline-none focus:ring-2 focus:ring-laudok-300 focus:border-laudok-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button key={category.id} type="button" onClick={() => handleCategoryChange(category.id)} aria-pressed={isActive}>
              <Badge variant={isActive ? 'solid' : 'outline'} size="md">{category.label}</Badge>
            </button>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {filtered.length === 0 ? (
          <Card variant="flat" className="p-10 text-center text-ink-muted">
            Nenhuma pergunta encontrada nesta categoria com esse termo de busca.
          </Card>
        ) : (
          filtered.map((faq, index) => (
            <Card key={faq.question} variant="flat" className="overflow-hidden">
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-display-s text-laudok-900">{faq.question}</span>
                <ChevronDown size={20} className={`text-laudok-500 transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-body text-ink leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
```

(Reaproveite o array `faqs` original ao substituir — não mude o texto das perguntas/respostas.)

- [ ] **Step 3: Verificar `/faq` — categorias, busca, accordion.**

### Task 28: Redesign `/em-breve`

**Files:**
- Modify: `src/app/em-breve/page.tsx`

- [ ] **Step 1: Substituir conteúdo**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Construction } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, IconTile, LinkButton, SectionShell } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Em Breve - Laudok!',
  description: 'Esta funcionalidade está em construção. Em breve você poderá contratar diretamente pelo site.',
};

export default function EmBrevePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="cream" withGrid>
          <Card variant="emboss" withFillet className="max-w-xl mx-auto p-10 text-center">
            <IconTile icon={Construction} tone="soft" size="lg" className="mx-auto mb-6" />
            <h1 className="text-display-l text-laudok-900 mb-4">Em construção</h1>
            <p className="text-body-l text-ink-muted mb-3">
              Estamos finalizando a contratação direta pelo site. Em breve você poderá assinar seu plano com alguns cliques.
            </p>
            <p className="text-body text-ink-muted mb-8">
              Por enquanto, fale com a gente para conhecer os planos e iniciar o cadastro.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <LinkButton href="/contato" size="lg">Falar com a Laudok!</LinkButton>
              <Link href="/" className="inline-flex items-center justify-center text-body font-medium text-laudok-800 hover:text-laudok-500 transition-colors">
                Voltar para a Home
              </Link>
            </div>
          </Card>
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verificar `/em-breve`.**

### Task 29: Redesign `/login` (LoginForm)

**Files:**
- Modify: `src/components/login/LoginForm.tsx`
- Modify: `src/app/login/page.tsx`

- [ ] **Step 1: Ler arquivo atual**

```bash
cat src/components/login/LoginForm.tsx
```
Captar lógica de state e handler.

- [ ] **Step 2: Atualizar `LoginForm.tsx`**

Manter lógica. Wrapper vira `Card variant="emboss"`. Título `text-display-m text-laudok-900`. Inputs com as classes padrão de formulário (vide Task 26). Botão de submit usa `<Button type="submit" className="w-full">`. Link "Esqueceu a senha?" como `text-body-s text-laudok-700 hover:text-laudok-500`.

- [ ] **Step 3: Atualizar `src/app/login/page.tsx`**

```tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/login/LoginForm';
import { SectionShell } from '@/components/ui';

export const metadata = {
  title: 'Login - Laudok!',
  description: 'Faça login na sua conta Laudok! para acessar a plataforma de laudos de engenharia.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-grid-blueprint bg-grid-blueprint--masked">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Verificar `/login`.**

### Task 30: Redesign `/termos-de-uso` e `/politica-de-privacidade`

**Files:**
- Modify: `src/app/termos-de-uso/page.tsx`
- Modify: `src/app/politica-de-privacidade/page.tsx`

- [ ] **Step 1: Atualizar layout das duas páginas**

Mudanças (idênticas nos dois arquivos):
- Wrapper externo: `<div className="min-h-screen flex flex-col bg-surface-alt">` + `<main className="flex-grow pt-16">`.
- Substituir `<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">` por:
  ```tsx
  <SectionShell tone="dark" withGrid className="pt-20 pb-12">
    <div className="max-w-3xl mx-auto text-center">
      <div className="text-label text-laudok-200 mb-3">Legal</div>
      <h1 className="text-display-xl text-surface">[Termos de Uso | Política de Privacidade]</h1>
    </div>
  </SectionShell>
  <SectionShell tone="cream">
    <Card variant="emboss" className="max-w-3xl mx-auto p-10">
      {/* prose ... */}
    </Card>
  </SectionShell>
  ```
- Substituir `h2` por `text-display-s text-laudok-900`, parágrafos `text-body text-ink-muted leading-relaxed`. Listas `text-body text-ink-muted`. Links `text-laudok-700 hover:text-laudok-500`.

- [ ] **Step 2: Verificar ambas as rotas.**

### Task 31: Redesign `/checkout/success` e `/checkout/cancel`

**Files:**
- Modify: `src/app/checkout/success/page.tsx`
- Modify: `src/app/checkout/cancel/page.tsx`

- [ ] **Step 1: Ler conteúdo do `cancel/page.tsx`**

```bash
cat src/app/checkout/cancel/page.tsx
```

- [ ] **Step 2: Atualizar `success/page.tsx`**

```tsx
'use client';

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, IconTile, LinkButton, SectionShell } from '@/components/ui';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="cream" withGrid>
          <Card variant="emboss" withFillet className="max-w-xl mx-auto p-10 text-center">
            <IconTile icon={CheckCircle2} tone="filled" size="lg" className="mx-auto mb-6" />
            <h1 className="text-display-l text-laudok-900 mb-4">Pagamento confirmado!</h1>
            <p className="text-body-l text-ink-muted mb-8">
              Obrigado por assinar o Laudok! Seu cadastro está sendo processado e você receberá um e-mail com as instruções de acesso em breve.
            </p>
            <LinkButton href="/" size="lg">Voltar para a Home</LinkButton>
            <p className="text-body-s text-ink-muted mt-6">
              Se você tiver dúvidas, entre em contato em{' '}
              <Link href="mailto:contato@laudok.com.br" className="text-laudok-700 hover:text-laudok-500 transition-colors">
                contato@laudok.com.br
              </Link>
            </p>
          </Card>
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Atualizar `cancel/page.tsx` no mesmo padrão** (usar `XCircle` ou `AlertCircle` em `tone="soft"`, mensagem de cancelamento, CTA voltar aos planos).

- [ ] **Step 4: Verificar.**

### Task 32: Remover aliases legados

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Buscar usos remanescentes dos aliases**

```bash
grep -rn "bg-laudok-dark\|bg-laudok-light\|text-laudok-dark\|text-laudok-light\|shadow-laudok\|bg-gradient-laudok\|laudok-dark\|laudok-light" src/ --include="*.tsx" --include="*.ts"
```
Esperado: sem ocorrências (todas migradas). Se houver, migre cada uma:
- `bg-laudok-dark` → `bg-laudok-800`
- `bg-laudok-light` → `bg-laudok-100`
- `text-laudok-dark` → `text-laudok-800`
- `text-laudok-light` → `text-laudok-100`
- `shadow-laudok` → `shadow-[var(--shadow-card)]`
- `shadow-laudok-dark` → `shadow-[var(--shadow-hover)]`
- `bg-gradient-laudok` → manter (utilitário com mesma classe agora aponta para gradient tokenizado)

- [ ] **Step 2: Remover bloco de aliases legados de `globals.css`**

Em `:root`, deletar:
```css
--laudok: var(--laudok-500);
--laudok-dark: var(--laudok-800);
--laudok-light: var(--laudok-100);
```

Em `@theme inline`, deletar:
```css
--color-laudok: var(--laudok-500);
--color-laudok-dark: var(--laudok-800);
--color-laudok-light: var(--laudok-100);
--shadow-laudok: var(--shadow-card);
--shadow-laudok-dark: var(--shadow-hover);
```

Manter `.bg-gradient-laudok` (é um utility class agora — sem alias necessário).

- [ ] **Step 3: Verificar — typecheck + lint + visual em todas as páginas**

```bash
npx tsc --noEmit && npm run lint && npm run dev
```
Navegar por: `/`, `/contato`, `/faq`, `/em-breve`, `/login`, `/termos-de-uso`, `/politica-de-privacidade`, `/checkout/success`. Verificar que nada quebrou visualmente.

### Task 33: Verificação final integrada e commit da fase 4

- [ ] **Step 1: Rodar build de produção**

```bash
npm run build
```
Expected: build conclui sem erro. Tipos OK, lint OK, todas as rotas geradas.

- [ ] **Step 2: Smoke test visual completo**

```bash
npm run dev
```

Checklist de páginas:
- [ ] `/` — Hero, About, ProblemSolution, Features, HowItWorks, Plans (3 planos novos), Testimonials, CTA, FAQ teaser, Footer com Newsletter
- [ ] `/contato` — Hero escuro, ContactInfo+Form, redes sociais
- [ ] `/faq` — categorias funcionando, busca filtrando, accordion abrindo
- [ ] `/em-breve` — card central com ícone
- [ ] `/login` — formulário em card embossed
- [ ] `/termos-de-uso` — hero escuro + card com conteúdo
- [ ] `/politica-de-privacidade` — idem
- [ ] `/checkout/success` — card com ícone e CTA
- [ ] Header sticky com blur funcionando em todas as páginas
- [ ] Newsletter no Footer renderizando em todas as páginas
- [ ] Reveal animation aparecendo ao scrollar
- [ ] Hover em cards (filete + elevação)
- [ ] `prefers-reduced-motion` respeitado (testar via DevTools → Rendering → Emulate CSS media)

- [ ] **Step 3: Commitar fase 4**

```bash
git add -A
git commit -m "feat(site): redesign de Header, Footer, Newsletter e todas as páginas internas"
```

- [ ] **Step 4: Push da branch**

```bash
git push -u origin redesign/brand-bold-architectural
```

- [ ] **Step 5: Abrir PR (opcional, mas recomendado)**

```bash
gh pr create --title "feat: redesign visual Brand-Bold-Architectural" --body "$(cat <<'EOF'
## Summary
- Redesign visual completo do site Laudok! conforme spec em \`docs/superpowers/specs/2026-05-22-redesign-visual-design.md\`
- Brand Bold + Bricolage + Grid Blueprint + Neutros Quentes + Cards Embossed + Animação moderada
- 4 commits sequenciais: tokens → primitivos → home → páginas internas
- Sem novas libs; usa Tailwind 4 + lucide-react + IntersectionObserver para animação

## Test plan
- [ ] \`npm run build\` passa
- [ ] \`npm run lint\` passa
- [ ] Smoke test visual em todas as páginas: /, /contato, /faq, /em-breve, /login, /termos-de-uso, /politica-de-privacidade, /checkout/success
- [ ] \`prefers-reduced-motion\` respeitado
- [ ] Comportamento Stripe/checkout intacto (apenas visual mudou no PlansSection — CTA continua indo para /em-breve)
EOF
)"
```

---

## Notas finais

- **Não criar testes** automatizados nesta entrega (sem framework de teste configurado e nada foi prometido no escopo).
- **Não tocar** em: `src/lib/stripe.ts`, `src/app/api/checkout/route.ts`, `src/app/api/webhooks/stripe/route.ts`, `src/app/api/contato/route.ts`, `src/app/api/newsletter/route.ts`, `src/lib/pelip-api.ts`. Lógica de backend permanece igual.
- **Imagens** (`/images/about-image.jpg`, `engineer-*.jpg`, `architect-*.jpg`, `logo.svg`) são pré-existentes e devem continuar funcionando.
- **Acessibilidade**: cada `aria-label` mantido; foco visível via `focus-visible:ring-2 focus-visible:ring-laudok-500`. Contraste WCAG AA: `ink` sobre `surface`/`surface-alt` ≥ 7:1; `surface` sobre `laudok-800` ≥ 7:1.
- **Performance**: Bricolage Grotesque é variable font (~80 KB woff2 com display=swap). Inter idem. IntersectionObserver é nativo.
