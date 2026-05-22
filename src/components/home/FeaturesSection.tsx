import { FileText, Clock, Shield, Users, Zap, BarChart } from 'lucide-react';
import { Card, Eyebrow, IconTile, Reveal, SectionShell } from '@/components/ui';

const features = [
  { icon: FileText, title: 'Laudos padronizados', desc: 'Geração automática conforme a NBR 16.747/2020.' },
  { icon: Clock, title: 'Economia de tempo', desc: 'Reduza até 80% do tempo gasto na elaboração de laudos.' },
  { icon: Shield, title: 'Conformidade garantida', desc: 'Sempre atualizado com as normas técnicas mais recentes.' },
  { icon: Users, title: 'Colaboração em equipe', desc: 'Compartilhe projetos e documentos com fluidez.' },
  { icon: Zap, title: 'Processo otimizado', desc: 'Fluxo de trabalho que guia você em cada etapa.' },
  { icon: BarChart, title: 'Análises detalhadas', desc: 'Relatórios completos com gráficos e estatísticas.' },
];

export default function FeaturesSection() {
  return (
    <SectionShell id="features" tone="surface">
      <div className="max-w-3xl mb-16 text-center md:text-left mx-auto md:mx-0">
        <Reveal><Eyebrow className="justify-center md:justify-start">Funcionalidades</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="text-display-l text-laudok-900 mt-4">
            Tudo que sua equipe técnica precisa.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-body-l text-ink-muted mt-4">
            Ferramentas pensadas para profissionais de engenharia e arquitetura que valorizam tempo e precisão.
          </p>
        </Reveal>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <Reveal key={feature.title} delay={idx * 60}>
            <Card variant="emboss" withFillet hoverable className="p-6 h-full text-center md:text-left">
              <IconTile icon={feature.icon} tone="filled" size="md" className="mb-5 mx-auto md:mx-0" />
              <h3 className="text-display-s text-laudok-900 mb-2">{feature.title}</h3>
              <p className="text-body-s text-ink-muted">{feature.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
