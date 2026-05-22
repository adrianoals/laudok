import type { Metadata } from 'next';
import Link from 'next/link';
import { Construction } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, IconTile, LinkButton, SectionShell } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Em Breve - Laudok!',
  description: 'Esta funcionalidade está em construção. Em breve você poderá contratar diretamente pelo site.',
};

export default function EmBrevePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="cream" withGrid>
          <Card variant="emboss" withFillet className="max-w-xl mx-auto p-10 text-center">
            <IconTile icon={Construction} tone="soft" size="lg" className="mx-auto mb-6" />
            <h1 className="text-display-l text-laudok-900 mb-4">Em construção</h1>
            <p className="text-body-l text-ink-muted mb-3">
              Estamos finalizando a contratação direta pelo site. Em breve você poderá assinar seu plano com alguns cliques.
            </p>
            <p className="text-body text-ink-muted mb-8">
              Por enquanto, fale com a gente para conhecer os planos e iniciar o cadastro.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <LinkButton href="/contato" size="lg">Falar com a Laudok!</LinkButton>
              <Link href="/" className="inline-flex items-center justify-center text-body font-medium text-laudok-800 hover:text-laudok-500 transition-colors">
                Voltar para a Home
              </Link>
            </div>
          </Card>
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
