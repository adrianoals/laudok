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
        <div className="space-y-6 text-center md:text-left">
          <Reveal>
            <Eyebrow className="justify-center md:justify-start">Sobre nós</Eyebrow>
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
