import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Badge, Card, Eyebrow, IconTile, Reveal, SectionShell } from '@/components/ui';

const problems = [
  'Tempo excessivo na elaboração de laudos',
  'Risco de erros e inconsistências entre relatórios',
  'Dificuldade em manter a conformidade com a NBR 16.747',
  'Gestão ineficiente de múltiplos projetos simultâneos',
];

const solutions = [
  'Automação inteligente da geração de laudos',
  'Conformidade automática com a NBR 16.747/2020',
  'Gestão centralizada de projetos e equipes',
  'Suporte especializado e materiais de treinamento',
];

const decorations = (
  <>
    <div className="hidden md:block absolute -top-16 -right-20 w-64 h-64 rounded-full border-2 border-laudok-300/50" aria-hidden />
    <div className="hidden md:block absolute top-16 right-16 w-12 h-12 rounded-full bg-laudok-300/40" aria-hidden />
    <div className="hidden md:block absolute -bottom-12 -left-12 w-40 h-40 rounded-full border border-laudok-300/60" aria-hidden />
    <div className="hidden md:block absolute bottom-24 left-16 w-3 h-3 rounded-full bg-laudok-400" aria-hidden />
    <div className="hidden lg:block absolute top-1/2 right-8 flex items-center gap-2" aria-hidden>
      <div className="w-10 h-px bg-laudok-300/60" />
      <div className="w-2 h-2 rounded-full bg-laudok-300/80" />
    </div>
  </>
);

export default function ProblemSolutionSection() {
  return (
    <SectionShell tone="pale" decorations={decorations}>
      <div className="max-w-3xl mb-16 text-center md:text-left mx-auto md:mx-0">
        <Reveal>
          <Eyebrow className="justify-center md:justify-start">O problema · A solução</Eyebrow>
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
