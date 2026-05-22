"use client";

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

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
    features: [
      'Sem assinatura mensal',
      '1 laudo gerado',
      'Conformidade com NBR 16.747/2020',
      'Suporte por e-mail',
    ],
    cta: 'Começar Agora',
    highlighted: false,
  },
  {
    id: 'semestral',
    name: 'Assinatura 6 meses',
    description: 'Para uso recorrente em projetos contínuos',
    monthlyPrice: 'R$ 170',
    perLaudoPrice: 'R$ 270',
    features: [
      'Assinatura semestral',
      'Laudos sob demanda',
      'Conformidade com NBR 16.747/2020',
      'Suporte prioritário',
      'Renovação automática',
    ],
    cta: 'Assinar 6 meses',
    highlighted: false,
  },
  {
    id: 'anual',
    name: 'Assinatura 12 meses',
    description: 'Melhor custo-benefício para uso intensivo',
    monthlyPrice: 'R$ 160',
    perLaudoPrice: 'R$ 240',
    features: [
      'Assinatura anual',
      'Menor custo por laudo',
      'Laudos sob demanda',
      'Conformidade com NBR 16.747/2020',
      'Suporte prioritário',
      'Renovação automática',
    ],
    cta: 'Assinar 12 meses',
    highlighted: true,
  },
];

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect: (id: string) => void }) {
  return (
    <div
      className={`rounded-lg shadow-laudok divide-y divide-gray-200 hover:shadow-laudok-dark transition-all duration-300 hover:scale-105 bg-white ${
        plan.highlighted ? 'border-2 border-laudok relative' : 'border border-gray-200'
      }`}
    >
      {plan.highlighted && (
        <div className="absolute md:-top-3 md:right-4 top-2 right-2 z-10">
          <span className="inline-flex rounded-full bg-laudok-dark px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Mais Popular
          </span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-medium text-laudok-dark">{plan.name}</h3>
        <p className="mt-4 text-sm text-gray-600 min-h-[40px]">{plan.description}</p>

        <div className="mt-8 space-y-2">
          <div>
            <span className="text-4xl font-extrabold text-laudok-dark">{plan.monthlyPrice}</span>
            <span className="text-base font-medium text-gray-500">/mês</span>
          </div>
          <div className="text-sm text-gray-600">
            + <span className="font-semibold text-laudok-dark">{plan.perLaudoPrice}</span> por laudo gerado
          </div>
        </div>

        <button
          onClick={() => onSelect(plan.id)}
          className="mt-8 block w-full bg-laudok-dark border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-laudok transition-colors"
        >
          {plan.cta}
        </button>
      </div>
      <div className="pt-6 pb-8 px-6">
        <h4 className="text-sm font-medium text-laudok-dark tracking-wide uppercase">
          O que está incluso
        </h4>
        <ul className="mt-6 space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex space-x-3">
              <svg
                className="flex-shrink-0 h-5 w-5 text-laudok"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PlansSection() {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    slidesToScroll: 1,
    startIndex: 2, // Começa com o plano anual (12 meses)
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handlePlanClick = () => {
    router.push('/em-breve');
  };

  return (
    <section id="plans" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-laudok-dark font-bold tracking-wide uppercase">Planos e Preços</h2>
          <p className="mt-2 text-3xl font-extrabold text-laudok-dark sm:text-4xl">
            Escolha o plano ideal para o seu uso
          </p>
          <p className="mt-4 text-xl text-gray-500">
            Pague apenas pelo que usar. Cada plano combina uma mensalidade fixa com o valor por laudo gerado.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:mt-12 lg:max-w-4xl lg:mx-auto xl:max-w-none">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={handlePlanClick} />
          ))}
        </div>

        {/* Mobile and Tablet View */}
        <div className="lg:hidden mt-12">
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-4"
                  >
                    <PlanCard plan={plan} onSelect={handlePlanClick} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10 -ml-4"
              aria-label="Plano anterior"
            >
              <ChevronLeft className="w-6 h-6 text-laudok-dark" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10 -mr-4"
              aria-label="Próximo plano"
            >
              <ChevronRight className="w-6 h-6 text-laudok-dark" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
