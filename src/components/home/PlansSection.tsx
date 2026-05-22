"use client";

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Badge, Button, Card, Eyebrow, Reveal, SectionShell } from '@/components/ui';

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  perLaudoPrice: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const plans: Plan[] = [
  {
    id: 'avulso',
    name: 'Avulso',
    description: 'Elaboração de apenas 1 laudo',
    monthlyPrice: 'R$ 0',
    perLaudoPrice: 'R$ 890',
    features: ['Sem assinatura mensal', '1 laudo gerado', 'Conformidade com NBR 16.747/2020', 'Suporte por e-mail'],
    cta: 'Começar agora',
    highlighted: false,
  },
  {
    id: 'semestral',
    name: 'Assinatura 6 meses',
    description: 'Para uso recorrente em projetos contínuos',
    monthlyPrice: 'R$ 170',
    perLaudoPrice: 'R$ 270',
    features: ['Assinatura semestral', 'Laudos sob demanda', 'Conformidade com NBR 16.747/2020', 'Suporte prioritário', 'Renovação automática'],
    cta: 'Assinar 6 meses',
    highlighted: false,
  },
  {
    id: 'anual',
    name: 'Assinatura 12 meses',
    description: 'Melhor custo-benefício para uso intensivo',
    monthlyPrice: 'R$ 160',
    perLaudoPrice: 'R$ 240',
    features: ['Assinatura anual', 'Menor custo por laudo', 'Laudos sob demanda', 'Conformidade com NBR 16.747/2020', 'Suporte prioritário', 'Renovação automática'],
    cta: 'Assinar 12 meses',
    highlighted: true,
  },
];

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect: () => void }) {
  return (
    <Card variant="emboss" withFillet={plan.highlighted} className="p-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-display-s text-laudok-900">{plan.name}</h3>
        {plan.highlighted && <Badge variant="solid" size="sm">Mais Popular</Badge>}
      </div>
      <p className="text-body-s text-ink-muted mb-6 min-h-[40px]">{plan.description}</p>
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-display-l text-laudok-900">{plan.monthlyPrice}</span>
          <span className="text-body-s text-ink-muted">/mês</span>
        </div>
        <div className="text-body-s text-ink-muted mt-2">
          + <span className="text-laudok-800 font-semibold">{plan.perLaudoPrice}</span> por laudo gerado
        </div>
      </div>
      <Button onClick={onSelect} variant={plan.highlighted ? 'primary' : 'secondary'} className="w-full mb-6">
        {plan.cta}
      </Button>
      <div className="pt-6 border-t border-sand-200 flex-grow">
        <div className="text-label text-laudok-700 mb-4">O que está incluso</div>
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-body-s text-ink">
              <Check size={16} className="text-laudok-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default function PlansSection() {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    slidesToScroll: 1,
    startIndex: 2,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const handleSelect = () => router.push('/em-breve');

  return (
    <SectionShell id="plans" tone="surface">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Reveal>
          <Eyebrow className="justify-center"><span>Planos e preços</span></Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-display-l text-laudok-900 mt-4">
            Pague apenas pelo que usar.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-body-l text-ink-muted mt-4">
            Cada plano combina uma mensalidade fixa com o valor por laudo gerado.
          </p>
        </Reveal>
      </div>

      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {plans.map((plan, idx) => (
          <Reveal key={plan.id} delay={idx * 80}>
            <PlanCard plan={plan} onSelect={handleSelect} />
          </Reveal>
        ))}
      </div>

      <div className="lg:hidden">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {plans.map((plan) => (
                <div key={plan.id} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-3">
                  <PlanCard plan={plan} onSelect={handleSelect} />
                </div>
              ))}
            </div>
          </div>
          <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-surface p-2 rounded-full shadow-[var(--shadow-card)] -ml-3" aria-label="Plano anterior">
            <ChevronLeft size={20} className="text-laudok-800" />
          </button>
          <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-surface p-2 rounded-full shadow-[var(--shadow-card)] -mr-3" aria-label="Próximo plano">
            <ChevronRight size={20} className="text-laudok-800" />
          </button>
        </div>
      </div>
    </SectionShell>
  );
}
