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

export default function ProblemSolutionSection() {
  return (
    <SectionShell tone="surface">
      <div className="max-w-3xl mb-16">
        <Reveal>
          <Eyebrow>O problema · A solução</Eyebrow>
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
