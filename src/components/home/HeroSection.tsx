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
