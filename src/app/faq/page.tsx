import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LinkButton, SectionShell } from '@/components/ui';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes - Laudok!',
  description:
    'Perguntas frequentes organizadas por categoria — Sobre o Produto, Atendimento à Norma, Financeiro e Pagamento, Segurança e Privacidade.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="dark" withGrid className="pt-20 pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-label text-laudok-200 mb-3">Auto atendimento</div>
            <h1 className="text-display-xl text-surface">Perguntas Frequentes</h1>
            <p className="text-body-l text-laudok-100 mt-4">
              Encontre rapidamente as respostas para as dúvidas mais comuns. Filtre por categoria ou use a busca.
            </p>
          </div>
        </SectionShell>
        <SectionShell tone="cream">
          <FAQContent />
        </SectionShell>
        <SectionShell tone="surface">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-display-m text-laudok-900 mb-4">Não encontrou a sua resposta?</h2>
            <p className="text-body-l text-ink-muted mb-8">
              Nossa equipe está pronta para te ajudar. Fale com a gente e tire sua dúvida.
            </p>
            <LinkButton href="/contato" size="lg">Fale com a Laudok!</LinkButton>
          </div>
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
