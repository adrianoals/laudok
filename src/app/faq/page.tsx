import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes - Laudok!',
  description:
    'Tire suas dúvidas sobre o Laudok!. Perguntas frequentes organizadas por categoria — Sobre o Produto, Atendimento à Norma, Financeiro e Pagamento, Segurança e Privacidade.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-laudok text-white pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Perguntas Frequentes
            </h1>
            <p className="text-xl text-laudok-light max-w-2xl mx-auto">
              Encontre rapidamente as respostas para as dúvidas mais comuns. Filtre por categoria ou use a busca.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQContent />
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-laudok-dark mb-4">
              Não encontrou a sua resposta?
            </h2>
            <p className="text-gray-600 mb-8">
              Nossa equipe está pronta para te ajudar. Fale com a gente e tire sua dúvida.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-laudok-dark hover:bg-laudok hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Fale com a Laudok!
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
