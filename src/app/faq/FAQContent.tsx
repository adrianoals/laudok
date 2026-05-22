"use client";

import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Badge, Card } from '@/components/ui';

type CategoryId = 'todos' | 'produto' | 'norma' | 'financeiro' | 'seguranca';

interface FAQItem {
  category: Exclude<CategoryId, 'todos'>;
  question: string;
  answer: string;
}

const categories: { id: CategoryId; label: string }[] = [
  { id: 'todos', label: 'Todas' },
  { id: 'produto', label: 'Sobre o Produto' },
  { id: 'norma', label: 'Atendimento à Norma' },
  { id: 'financeiro', label: 'Financeiro e Pagamento' },
  { id: 'seguranca', label: 'Segurança e Privacidade' },
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
      'A Laudok! oferece uma plataforma que apoia o engenheiro/arquiteto na elaboração dos laudos em conformidade com a NBR 16.747/2020. A responsabilidade técnica pelo conteúdo, conclusões e recomendações do laudo é do profissional habilitado que o elabora e assina. A plataforma é uma ferramenta de produtividade — a decisão técnica permanece com o profissional responsável.',
  },
  {
    category: 'norma',
    question: 'O banco de dados contém todas as anomalias possíveis?',
    answer:
      'O banco de dados do Laudok! reúne as anomalias mais frequentes em edificações conforme a NBR 16.747/2020 e a experiência da nossa equipe técnica. O catálogo é atualizado periodicamente. Caso identifique uma anomalia que não esteja contemplada, você pode incluí-la manualmente no seu laudo ou enviar uma sugestão para contato@laudok.com.br para inclusão futura no catálogo.',
  },
  {
    category: 'financeiro',
    question: 'Como faço para atualizar meus dados cadastrais e formas de pagamento?',
    answer:
      'Acesse a sua conta na plataforma, vá em "Minha Conta" para atualizar dados cadastrais e em "Assinatura" para alterar a forma de pagamento. Se tiver qualquer dificuldade, fale com nosso time em contato@laudok.com.br.',
  },
  {
    category: 'seguranca',
    question: 'Posso compartilhar minha licença e usuário?',
    answer:
      'Não. A licença e o usuário do Laudok! são pessoais e intransferíveis. O compartilhamento viola os Termos de Uso da plataforma e compromete a segurança dos seus dados e dos laudos gerados. Cada profissional deve utilizar a sua própria conta.',
  },
];

export default function FAQContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const normalize = (text: string) =>
      text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const term = normalize(search.trim());
    return faqs.filter((faq) => {
      const matchCategory = activeCategory === 'todos' || faq.category === activeCategory;
      if (!matchCategory) return false;
      if (!term) return true;
      return normalize(faq.question).includes(term) || normalize(faq.answer).includes(term);
    });
  }, [activeCategory, search]);

  const handleCategoryChange = (id: CategoryId) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  return (
    <div className="space-y-10">
      <div className="max-w-2xl mx-auto">
        <label htmlFor="faq-search" className="sr-only">Buscar pergunta</label>
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faded" />
          <input
            id="faq-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por palavra-chave..."
            className="w-full rounded-full border border-sand-200 bg-surface py-3 pl-12 pr-4 text-ink placeholder:text-ink-faded focus:outline-none focus:ring-2 focus:ring-laudok-300 focus:border-laudok-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button key={category.id} type="button" onClick={() => handleCategoryChange(category.id)} aria-pressed={isActive}>
              <Badge variant={isActive ? 'solid' : 'outline'} size="md">{category.label}</Badge>
            </button>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {filtered.length === 0 ? (
          <Card variant="flat" className="p-10 text-center text-ink-muted">
            Nenhuma pergunta encontrada nesta categoria com esse termo de busca.
          </Card>
        ) : (
          filtered.map((faq, index) => (
            <Card key={faq.question} variant="flat" className="overflow-hidden">
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-display-s text-laudok-900">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-laudok-500 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-body text-ink leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
