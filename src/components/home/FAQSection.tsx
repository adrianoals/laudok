import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FAQSection() {
  return (
    <section id="faq" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-laudok-dark mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Tire suas dúvidas sobre o Laudok! Filtre por categoria e encontre rapidamente o que precisa.
          </p>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-laudok-dark hover:bg-laudok hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Ver todas as perguntas frequentes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
