"use client";

import { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, Eyebrow, Reveal, SectionShell } from '@/components/ui';

const testimonials = [
  {
    name: 'Eng. Carlos Silva',
    role: 'Engenheiro Civil',
    company: 'Construtora XYZ',
    image: '/images/engineer-1.jpg',
    content: 'O Laudok! revolucionou nossa forma de trabalhar. Conseguimos reduzir o tempo de elaboração dos laudos em mais de 70% e a qualidade melhorou significativamente.',
    rating: 5,
  },
  {
    name: 'Arq. Ana Santos',
    role: 'Arquiteta',
    company: 'Escritório ABC',
    image: '/images/architect-1.jpg',
    content: 'A conformidade com a NBR 16.747 é automática e isso nos dá muita segurança. O suporte é excelente e sempre nos ajuda quando precisamos.',
    rating: 5,
  },
  {
    name: 'Eng. Roberto Lima',
    role: 'Engenheiro de Perícias',
    company: 'Consultoria Técnica',
    image: '/images/engineer-2.jpg',
    content: 'A automação dos relatórios fotográficos é impressionante. O que antes levava dias, agora fazemos em horas. Recomendo fortemente!',
    rating: 5,
  },
  {
    name: 'Profa. Dra. Maria Oliveira',
    role: 'Engenheira Civil e Professora',
    company: 'Universidade Federal',
    image: '/images/engineer-3.jpg',
    content: 'Como professora, posso dizer que o Laudok! é uma ferramenta essencial para nossos alunos. A interface intuitiva e a conformidade com as normas técnicas tornam o aprendizado muito mais prático e eficiente.',
    rating: 5,
  },
  {
    name: 'Arq. Pedro Mendes',
    role: 'Arquiteto',
    company: 'Studio de Arquitetura',
    image: '/images/architect-2.jpg',
    content: 'A precisão e rapidez na geração de laudos técnicos com o Laudok! nos permite focar mais no design e menos na burocracia. Uma ferramenta indispensável para arquitetos modernos.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true, slidesToScroll: 1 });

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  useEffect(() => autoplay(), [autoplay]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <SectionShell id="testimonials" tone="surface">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Reveal>
          <Eyebrow className="justify-center"><span>Depoimentos</span></Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-display-l text-laudok-900 mt-4">O que dizem nossos clientes.</h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-body-l text-ink-muted mt-4">
            Profissionais que já transformaram a produtividade com o Laudok!
          </p>
        </Reveal>
      </div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t) => (
              <div key={t.name} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 px-3">
                <Card variant="emboss" withFillet className="p-7 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-laudok-500 fill-laudok-500" />
                    ))}
                  </div>
                  <p className="text-body text-ink italic mb-6">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-sand-200">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="text-body font-semibold text-laudok-900">{t.name}</div>
                      <div className="text-body-s text-ink-muted">{t.role} · {t.company}</div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-surface p-2 rounded-full shadow-[var(--shadow-card)] -ml-3" aria-label="Depoimento anterior">
          <ChevronLeft size={20} className="text-laudok-800" />
        </button>
        <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-surface p-2 rounded-full shadow-[var(--shadow-card)] -mr-3" aria-label="Próximo depoimento">
          <ChevronRight size={20} className="text-laudok-800" />
        </button>
      </div>
    </SectionShell>
  );
}
