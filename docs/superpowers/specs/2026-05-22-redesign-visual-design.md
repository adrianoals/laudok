# Redesign visual do site Laudok!

**Data:** 2026-05-22
**Branch:** `redesign/brand-bold-architectural`
**Direção:** Brand Bold com toque editorial premium — tipografia com personalidade (Bricolage Grotesque), vocabulário decorativo blueprint (grids sutis), paleta azul Laudok + neutros quentes (cream/sand), cards embossed com filete lateral azul, animações moderadas (fade-in on scroll + micro-interações). Escopo: site inteiro.

## 1. Design tokens

### Paleta

| Token | Hex | Uso |
|---|---|---|
| `--laudok-50` | `#f0f9ff` | tints muito leves |
| `--laudok-100` | `#e6f4fa` | backgrounds suaves (era `laudok-light`) |
| `--laudok-200` | `#c6e7f5` | borda de badge |
| `--laudok-300` | `#9dd8ee` | accent secundário |
| `--laudok-400` | `#5cb9dc` | links e accents |
| `--laudok-500` | `#0086C2` | brand primário (era `laudok`) |
| `--laudok-600` | `#0276af` | hover de primário |
| `--laudok-700` | `#035e8e` | text on cream |
| `--laudok-800` | `#034575` | brand dark / titles (era `laudok-dark`) |
| `--laudok-900` | `#033458` | ultra dark |
| `--sand-50` | `#FBF9F4` | bg muito leve |
| `--sand-100` | `#FAF7F2` | cream principal — backgrounds de seção |
| `--sand-200` | `#ede7d8` | borders, dividers |
| `--sand-300` | `#d4cdb8` | borders fortes |
| `--ink` | `#0f172a` | texto principal |
| `--ink-muted` | `#475569` | texto secundário |
| `--ink-faded` | `#94a3b8` | texto desabilitado |
| `--surface` | `#ffffff` | cards |
| `--surface-alt` | `#FAF7F2` | seções |

**Aliases legados** (compatibilidade):
- `laudok` → `laudok-500`
- `laudok-dark` → `laudok-800`
- `laudok-light` → `laudok-100`

### Tipografia

- Display: **Bricolage Grotesque** variável 300–800 (loaded via `next/font/google`)
- Body: **Inter** variável 300–700
- Caption/Label: Inter uppercase, tracking +0.15em

**Escala**

| Token | Size/LH | Letter-spacing | Uso |
|---|---|---|---|
| `display-2xl` | 72/76 | -0.025em | Hero h1 |
| `display-xl` | 56/60 | -0.02em | h1 página interna |
| `display-l` | 44/48 | -0.02em | h2 seção |
| `display-m` | 32/36 | -0.015em | h3 |
| `display-s` | 24/28 | -0.01em | h4 |
| `body-l` | 20/30 | — | parágrafos hero |
| `body` | 16/24 | — | corpo padrão |
| `body-s` | 14/22 | — | meta, captions |
| `caption` | 12/18 | — | rótulos |
| `label` | 11/16 | +0.15em UC | tags, kickers |

**Responsivo**: títulos `display-2xl` e `display-xl` reduzem ~25% no mobile via `clamp()`.

### Espaçamento, radii, sombras

- Espaçamento: escala 4px — 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
- Radii: `sm 4`, `md 8`, `lg 12`, `xl 16`, `2xl 20`
- Sombras (tinta azul):
  - `shadow-card`: `0 1px 0 rgba(0,0,0,.04), 0 12px 30px -10px rgba(3,69,117,.18)`
  - `shadow-emboss`: `0 30px 60px -30px rgba(3,69,117,.25), 0 2px 4px rgba(3,69,117,.05)`
  - `shadow-hover`: `0 40px 80px -35px rgba(3,69,117,.35), 0 4px 8px rgba(3,69,117,.08)`

### Decoração

- **Grid blueprint** (background pattern):
  ```css
  background-image:
    linear-gradient(rgba(3,69,117,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(3,69,117,.06) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 90%);
  ```
- **Filete lateral** dos cards: barra de 3px com gradient `#0086C2 → #034575`, inset 24px top/bottom

### Motion

- Durações: 150ms (hover), 250ms (transição), 400ms (entrada), 700ms (reveal longo)
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` para entradas; `cubic-bezier(0.6, 0, 0.4, 1)` para interações

### Onde mora

- `src/app/globals.css` — `:root` com CSS vars + `@theme` (Tailwind 4) + utilitários customizados (`.bg-grid-blueprint`, `.card-emboss`, etc.)
- `src/app/layout.tsx` — `next/font/google` para Bricolage Grotesque + Inter
- Aliases legados mantidos até a fase de migração final (item 4)

## 2. Primitivos (componentes base)

Criados em `src/components/ui/`:

| Componente | Props relevantes | Resumo |
|---|---|---|
| `Button` | `variant` (primary/secondary/ghost/outline), `size` (sm/md/lg), `asChild` | Primary: `bg-laudok-800` text `surface`. Secondary: `surface` text `laudok-800` borda. Ghost: text-only. Outline: borda azul transparente. |
| `Badge` | `variant` (default/accent/outline), `size` | Pill com label uppercase. Default: `laudok-100` text `laudok-800`. |
| `Card` | `variant` (emboss/flat), `with-fillet` (boolean) | Container `surface` com `radius-xl`, `shadow-emboss`. `with-fillet` adiciona filete lateral. |
| `IconTile` | `size`, `tone` (filled/outlined) | Wrapper para ícone lucide. Filled: `laudok-800` bg, `surface` fg. Outlined: `surface` bg, `laudok-800` border + fg. |
| `SectionShell` | `tone` (cream/white/dark), `withGrid` | Wrapper de seção: padding consistente (`py-24 md:py-32`), max-width, opção de fundo cream/branco/dark, decoração grid opcional. |
| `Eyebrow` | — | Label uppercase pequeno + traço horizontal antes (`— LABEL`). |
| `NumberStep` | `n` | Numerador grande em Bricolage display-l para passos do "Como Funciona". |
| `Reveal` | `as`, `delay`, `direction` | Wrapper que anima fade-in + slide quando entra no viewport (IntersectionObserver). |

**Sem libs novas**: animação via IntersectionObserver + CSS transitions (sem Framer Motion). Mantém bundle leve.

## 3. Arquétipos de seção

Cada um reescrito com os primitivos acima:

**Hero** (`HeroSection`): bg `sand-100` com `bg-grid-blueprint` mascarado, Eyebrow + h1 em `display-2xl` + parágrafo `body-l`. CTA Primary "Experimente Grátis". Sem vídeo de fundo (mais clean) — possível ilustração SVG/lottie discreta à direita em fase 2. Decoração: círculo blueprint 1px outline atrás do título.

**About** (`AboutSection`): split 2-col em `sand-100`. Coluna texto: Eyebrow + h2 `display-l` ("Sobre a Laudok!") + 2 parágrafos `body-l`. Coluna mídia: imagem em `Card` emboss sem filete.

**ProblemSolution**: split antes/depois em `surface`. Duas colunas com Badges de "Antes / Depois" e listagem de bullets com IconTile mini.

**Features** (`FeaturesSection`): grid 3-col em `sand-100`. Cada feature é um `Card` emboss com filete + IconTile filled + h4 `display-s` + body `body-s`. Hover: `shadow-hover` + leve translateY.

**HowItWorks** (`HowItWorksSection`): 4 passos em `surface` com `bg-grid-blueprint`. Cada passo: `NumberStep` grande (01, 02, 03, 04) + título `display-s` + descrição. Linha pontilhada conectando os passos em desktop.

**Plans** (`PlansSection`): 3 `Card` emboss com filete em `sand-100`. Plano "12 meses" destaca com `shadow-emboss` mais profundo + filete em gradient ativo. Preço em `display-l`. Valor por laudo em `body-s` abaixo.

**Testimonials** (`TestimonialsSection`): carrossel (Embla mantido). Cards com `surface` + foto circular + nome em display-s + cita em body. Estrelas como ícones lucide.

**CTA** (`CTASection`): `surface-alt` cream com grid blueprint forte. h2 `display-l` central + um CTA Primary.

**FAQ teaser** (home, `FAQSection`): já reduzido — só ganha tokens novos.

**FAQ page** (`/faq`): hero `laudok-800` com grid em outline → seção `sand-100` com chips de categoria em `Badge` + busca + accordion de `Card` flat.

**ContactInfo, Footer, Newsletter, etc.**: ganham tokens novos.

## 4. Layouts de página

**Home**: ordem mantida (Hero → About → ProblemSolution → Features → HowItWorks → Plans → Testimonials → CTA → FAQ teaser). Alternância de fundos `sand-100` ↔ `surface` para ritmo. Sections com `py-24 md:py-32`.

**/contato**: hero `laudok-800` + grid blueprint, seção `sand-100` com ContactInfo (`Card` flat) + ContactForm (`Card` emboss).

**/faq**: vide arquétipo acima.

**/em-breve, /login, /termos-de-uso, /politica-de-privacidade, /checkout/success, /checkout/cancel**: layout shell com Header/Footer novos + seção `surface-alt` com card emboss centralizado.

**Header**: fundo `surface/90` com backdrop-blur, borda inferior 1px `sand-200`. Logo em Bricolage (placeholder text se SVG não estiver pronto). Menu mobile mantém estrutura, ganha tokens novos.

**Footer**: fundo gradient `laudok-800 → laudok-900`. Newsletter no topo com `Card` flat embutido. Grid 4-col com tipografia revista.

## 5. Sistema de animação

- **Entradas** (todos os `Reveal` wrappers): `opacity 0 → 1` + `translateY 24px → 0`, duração 700ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`. Trigger via IntersectionObserver `threshold: 0.15`, `rootMargin: 0px 0px -50px 0px`. Stagger entre filhos: 80ms.
- **Hover** em cards: `translateY -4px` + sombra `shadow-emboss` → `shadow-hover`, duração 250ms.
- **Hover** em botões Primary: brightness +5% + scale 1.02, duração 150ms.
- **Acessibilidade**: respeitar `prefers-reduced-motion` — desligar transforms, manter opacity.

## Plano de implementação (4 commits)

1. **chore(design): tokens, fontes e tema base** — `globals.css` (CSS vars + @theme), `layout.tsx` (fonts), utilitários CSS de decoração. Aliases legados mantidos.
2. **feat(ui): primitivos do design system** — `src/components/ui/{Button,Badge,Card,IconTile,SectionShell,Eyebrow,NumberStep,Reveal}.tsx`.
3. **feat(home): redesign de todas as seções** — Hero, About, ProblemSolution, Features, HowItWorks, Plans, Testimonials, CTA, FAQ teaser usando os primitivos.
4. **feat(site): redesign de páginas internas e shell global** — Header, Footer, NewsletterSignup, /contato, /faq, /em-breve, páginas legais, checkout, login. Remove aliases legados.

## Fora de escopo

- Ilustrações SVG customizadas (apenas placeholders; fase 2)
- Dark mode
- Refator de testes (não há suite)
- Reconfiguração do Stripe (decisão de produto separada)
- Implementação real do RD Station (continua placeholder)
- Chatbot
