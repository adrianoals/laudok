import { ArrowRight } from 'lucide-react';
import { Eyebrow, LinkButton, Reveal, SectionShell } from '@/components/ui';

export default function FAQSection() {
  return (
    <SectionShell id="faq" tone="surface">
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
