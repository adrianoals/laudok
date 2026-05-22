import { ArrowRight } from 'lucide-react';
import { Eyebrow, LinkButton, Reveal } from '@/components/ui';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-laudok-900 text-surface pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="absolute inset-0 bg-gradient-laudok opacity-90" aria-hidden />
      <div className="absolute inset-0 bg-grid-blueprint-light bg-grid-blueprint--masked opacity-40 pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <Eyebrow tone="light">Laudok! · NBR 16.747/2020</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-display-2xl">
                Laudos de engenharia,<br />
                <span className="text-laudok-300">com inteligência.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-body-l text-laudok-100 max-w-xl">
                Plataforma especializada em laudos técnicos para condomínios. Conformidade com a NBR 16.747/2020,
                produtividade para engenheiros e arquitetos.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-col sm:flex-row gap-3">
                <LinkButton href="/teste-gratis" size="lg" variant="inverse">
                  Experimente Grátis
                  <ArrowRight size={18} />
                </LinkButton>
                <LinkButton href="/#plans" variant="outline-light" size="lg">
                  Ver planos
                </LinkButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <Reveal delay={320}>
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-[var(--shadow-emboss)]">
                <div className="absolute inset-0 bg-laudok-900" aria-hidden />
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                >
                  <source src="/videos/hero-background.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-laudok-900 via-laudok-900/60 to-laudok-800/40" aria-hidden />
                <div className="absolute inset-0 bg-grid-blueprint-light bg-grid-blueprint--masked opacity-80 pointer-events-none" aria-hidden />
                <div className="absolute inset-3 rounded-xl border border-surface/30 pointer-events-none" aria-hidden />
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-laudok-200/80" aria-hidden />
                <div className="absolute top-9 right-9 w-6 h-6 rounded-full bg-laudok-200/90" aria-hidden />
                <div className="absolute top-24 left-6 w-16 h-px bg-laudok-200/60" aria-hidden />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-label text-laudok-100">NBR 16.747/2020</div>
                  <div className="text-display-s text-surface mt-2">Laudo gerado em minutos.</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
