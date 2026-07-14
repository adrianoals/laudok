import { ArrowRight } from 'lucide-react';
import { Eyebrow, LinkButton, Reveal } from '@/components/ui';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-laudok-900 text-surface">
      <div className="absolute inset-0 bg-gradient-laudok opacity-90" aria-hidden />
      <div className="absolute inset-0 bg-grid-blueprint bg-grid-blueprint--masked opacity-40 pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow tone="light" className="justify-center"><span>Comece agora</span></Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-display-xl mt-4">
              Transforme sua produtividade hoje mesmo.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-body-l text-laudok-100 mt-4">
              Experimente gratuitamente e descubra como o Laudok! pode revolucionar sua forma de trabalhar.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10">
              <LinkButton href="https://laudok.com.br/Account/Register" size="lg" variant="inverse">
                Experimente Grátis
                <ArrowRight size={18} />
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
