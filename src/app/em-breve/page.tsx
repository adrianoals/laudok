import type { Metadata } from 'next';
import Link from 'next/link';
import { Construction } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Em Breve - Laudok!',
  description: 'Esta funcionalidade está em construção. Em breve você poderá contratar diretamente pelo site.',
};

export default function EmBrevePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-6 bg-laudok-light rounded-full">
              <Construction className="w-16 h-16 text-laudok-dark" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-laudok-dark">
              Em construção
            </h1>
            <p className="text-lg text-gray-600">
              Estamos finalizando a contratação direta pelo site. Em breve você poderá assinar seu plano com apenas alguns cliques.
            </p>
            <p className="text-base text-gray-600">
              Por enquanto, fale com a gente para conhecer os planos e iniciar o seu cadastro.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/contato"
              className="block w-full bg-laudok-dark text-white py-3 px-4 rounded-md hover:bg-laudok transition-colors font-medium"
            >
              Falar com a Laudok!
            </Link>
            <Link
              href="/"
              className="block w-full text-laudok-dark hover:text-laudok transition-colors font-medium"
            >
              Voltar para a Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
