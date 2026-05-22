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
