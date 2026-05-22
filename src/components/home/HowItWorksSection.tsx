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
    <SectionShell id="how-it-works" tone="pale" withGrid>
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
