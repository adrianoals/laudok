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

const heroDecorations = (
  <>
    <div className="hidden md:block absolute -top-16 -left-16 w-56 h-56 rounded-full border border-laudok-300/30" aria-hidden />
    <div className="hidden md:block absolute -top-8 -right-12 w-72 h-72 rounded-full border-2 border-laudok-300/30" aria-hidden />
    <div className="hidden md:block absolute top-16 right-32 w-10 h-10 rounded-full bg-laudok-300/30" aria-hidden />
    <div className="hidden md:block absolute -bottom-16 -left-8 w-48 h-48 rounded-full border border-laudok-200/30" aria-hidden />
    <div className="hidden md:block absolute bottom-12 right-20 w-3 h-3 rounded-full bg-laudok-200" aria-hidden />
  </>
);

const ctaDecorations = (
  <>
    <div className="hidden md:block absolute -top-12 left-12 w-40 h-40 rounded-full border-2 border-laudok-300/50" aria-hidden />
    <div className="hidden md:block absolute -bottom-16 -right-16 w-56 h-56 rounded-full border border-laudok-300/60" aria-hidden />
    <div className="hidden md:block absolute top-1/2 left-20 w-12 h-px bg-laudok-300/60" aria-hidden />
    <div className="hidden md:block absolute top-16 right-20 w-3 h-3 rounded-full bg-laudok-400" aria-hidden />
  </>
);

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="dark" withGrid decorations={heroDecorations} className="pt-20 pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-label text-laudok-200 mb-3">Auto atendimento</div>
            <h1 className="text-display-xl text-surface">Perguntas Frequentes</h1>
            <p className="text-body-l text-laudok-100 mt-4">
              Encontre rapidamente as respostas para as dúvidas mais comuns. Filtre por categoria ou use a busca.
            </p>
          </div>
        </SectionShell>
        <SectionShell tone="surface">
          <FAQContent />
        </SectionShell>
        <SectionShell tone="pale" decorations={ctaDecorations}>
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
