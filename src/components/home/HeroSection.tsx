import { ArrowRight } from 'lucide-react';
import { Eyebrow, LinkButton, Reveal } from '@/components/ui';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-laudok-900 text-surface pt-32 md:pt-40 pb-24 md:pb-32">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-laudok opacity-80" aria-hidden />
      <div className="absolute inset-0 bg-laudok-900/30" aria-hidden />
      <div className="absolute inset-0 bg-grid-blueprint bg-grid-blueprint--masked opacity-40 pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8">
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
        </div>
      </div>
    </section>
  );
}
