"use client";

import { useMemo, useState } from 'react';
import {
  ChevronDown,
  Search,
  Package,
  ShieldCheck,
  CreditCard,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import { Card, Eyebrow, IconTile } from '@/components/ui';

type CategoryId = 'produto' | 'norma' | 'financeiro' | 'seguranca';

interface FAQItem {
  category: CategoryId;
  question: string;
  answer: string;
}

const categories: { id: CategoryId; label: string; icon: LucideIcon }[] = [
  { id: 'produto', label: 'Sobre o Produto', icon: Package },
  { id: 'norma', label: 'Atendimento à Norma', icon: ShieldCheck },
  { id: 'financeiro', label: 'Financeiro e Pagamento', icon: CreditCard },
  { id: 'seguranca', label: 'Segurança e Privacidade', icon: Lock },
];

const faqs: FAQItem[] = [
  {
    category: 'produto',
    question: 'Quanto tempo leva para aprender a usar o Laudok!?',
    answer:
      'O Laudok! foi desenvolvido para ser intuitivo e fácil de usar. A maioria dos usuários consegue começar a utilizar o sistema em menos de 1 hora. Oferecemos materiais de apoio e tutoriais para acelerar ainda mais o aprendizado.',
  },
  {
    category: 'produto',
    question: 'Posso personalizar os laudos gerados?',
    answer:
      'Sim. Você tem liberdade para personalizar os laudos. O sistema oferece templates editáveis e permite adicionar observações, fotos e informações específicas de cada projeto.',
  },
  {
    category: 'produto',
    question: 'Posso usar o sistema em diferentes dispositivos?',
    answer:
      'Sim. O Laudok! é uma plataforma web responsiva que funciona em qualquer dispositivo com acesso à internet, incluindo computadores, tablets e smartphones.',
  },
  {
    category: 'produto',
    question: 'Como funciona o suporte técnico?',
    answer:
      'Oferecemos suporte técnico por e-mail e chat. Nossa central de Perguntas Frequentes foi pensada para que você encontre rapidamente as respostas mais comuns. Caso sua dúvida não esteja aqui, fale com a gente em contato@laudok.com.br.',
  },
  {
    category: 'norma',
    question: 'O sistema é compatível com a NBR 16.747?',
    answer:
      'Sim. O Laudok! foi desenvolvido especificamente para atender aos requisitos da NBR 16.747/2020, garantindo que seus laudos estejam sempre em conformidade com a norma.',
  },
  {
    category: 'norma',
    question: 'A Laudok! se responsabiliza pela qualidade dos laudos gerados através da plataforma?',
    answer:
      'A Laudok! oferece uma plataforma que auxilia o engenheiro ou arquiteto na elaboração dos laudos em conformidade com a NBR 16.747/2020. A responsabilidade técnica pelo conteúdo, pelas conclusões e pelas recomendações do laudo é do profissional habilitado que o elabora e assina. A plataforma é uma ferramenta de apoio e produtividade; a decisão técnica permanece com o profissional responsável.',
  },
  {
    category: 'norma',
    question: 'O banco de dados contém todas as anomalias possíveis?',
    answer:
      'O banco de dados do Laudok! reúne as anomalias mais frequentes em edificações, considerando a NBR 16.747/2020 e a experiência da equipe técnica. A base de conhecimento é atualizada periodicamente. Caso uma anomalia não esteja disponível, o profissional poderá incluí-la manualmente no laudo ou enviar uma sugestão para contato@laudok.com.br.',
  },
  {
    category: 'financeiro',
    question: 'Como faço para atualizar meus dados cadastrais e formas de pagamento?',
    answer:
      'Acesse sua conta na plataforma Laudok! para consultar e atualizar seus dados cadastrais e suas formas de pagamento. Caso precise de ajuda, entre em contato pelo e-mail contato@laudok.com.br.',
  },
  {
    category: 'seguranca',
    question: 'Posso compartilhar minha licença e usuário?',
    answer:
      'Não. A licença e o usuário do Laudok! são pessoais e intransferíveis. O compartilhamento viola os Termos de Uso da plataforma e compromete a segurança dos seus dados e dos laudos gerados. Cada profissional deve utilizar sua própria conta.',
  },
];

export default function FAQContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('produto');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const countByCategory = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      produto: 0,
      norma: 0,
      financeiro: 0,
      seguranca: 0,
    };
    faqs.forEach((f) => {
      counts[f.category]++;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const normalize = (text: string) =>
      text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const term = normalize(search.trim());
    return faqs.filter((faq) => {
      if (faq.category !== activeCategory) return false;
      if (!term) return true;
      return normalize(faq.question).includes(term) || normalize(faq.answer).includes(term);
    });
  }, [activeCategory, search]);

  const handleCategoryChange = (id: CategoryId) => {
    if (id === activeCategory) return;
    setActiveCategory(id);
    setOpenIndex(null);
  };

  return (
    <div className="grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-12">
      <aside className="md:col-span-5 lg:col-span-4 min-w-0">
        <div className="bg-laudok-50 border border-laudok-100 rounded-2xl p-5 md:p-6 md:sticky md:top-24 text-center md:text-left">
          <Eyebrow className="justify-center md:justify-start">Filtrar por categoria</Eyebrow>
          <h2 className="text-display-s text-laudok-900 mt-3 mb-5 hidden md:block">Categorias</h2>

          <div className="grid grid-cols-2 gap-3 mt-4 md:flex md:flex-col md:gap-3 md:mt-0">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              const count = countByCategory[cat.id];
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  aria-pressed={active}
                  className="text-left"
                >
                  <Card
                    variant={active ? 'emboss' : 'flat'}
                    withFillet={active}
                    hoverable={!active}
                    className="px-3 py-3 md:p-4 flex items-center gap-2.5 md:gap-4 h-full min-w-0"
                  >
                    <IconTile icon={cat.icon} tone={active ? 'filled' : 'soft'} size="sm" />
                    <div className="flex-grow min-w-0">
                      <div className="text-body-s md:text-body font-semibold text-laudok-900 leading-tight">{cat.label}</div>
                      <div className="text-caption text-ink-muted mt-0.5 hidden md:block">
                        {count} {count === 1 ? 'pergunta' : 'perguntas'}
                      </div>
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>

        </div>
      </aside>

      <div className="md:col-span-7 lg:col-span-8 min-w-0">
        <div className="bg-laudok-50 border border-laudok-100 rounded-2xl p-5 md:p-6">
          <div className="relative mb-5">
            <label htmlFor="faq-search" className="sr-only">Buscar pergunta</label>
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faded" />
            <input
              id="faq-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por palavra-chave..."
              className="w-full rounded-full border border-laudok-200/70 bg-surface py-3.5 pl-12 pr-4 text-ink placeholder:text-ink-faded focus:outline-none focus:ring-4 focus:ring-laudok-500/15 focus:border-laudok-500 transition-all"
            />
          </div>

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <Card variant="flat" className="p-10 text-center text-ink-muted">
                Nenhuma pergunta encontrada nesta categoria com esse termo de busca.
              </Card>
            ) : (
              filtered.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <Card
                    key={faq.question}
                    variant={isOpen ? 'emboss' : 'flat'}
                    withFillet={isOpen}
                    className={
                      isOpen
                        ? 'overflow-hidden'
                        : 'overflow-hidden shadow-[0_1px_3px_rgba(3,69,117,0.05)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] transition-all duration-200 cursor-pointer'
                    }
                  >
                    <button
                      type="button"
                      className="w-full max-w-full px-4 py-4 md:px-6 md:py-5 text-left flex items-center justify-between gap-3 md:gap-4 overflow-hidden"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="flex-1 min-w-0 break-words text-body-s md:text-body font-semibold text-laudok-900 leading-snug">
                        {faq.question}
                      </span>
                      <span
                        className={`flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-colors ${
                          isOpen
                            ? 'bg-laudok-800 text-surface'
                            : 'bg-laudok-100 text-laudok-700'
                        }`}
                        aria-hidden
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={2.5}
                          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 md:px-6 md:pb-6">
                        <p className="text-body-s md:text-body text-ink-muted leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
