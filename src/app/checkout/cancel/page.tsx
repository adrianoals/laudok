'use client';

import { XCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, IconTile, LinkButton, SectionShell } from '@/components/ui';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="cream" withGrid>
          <Card variant="emboss" className="max-w-xl mx-auto p-10 text-center">
            <IconTile icon={XCircle} tone="soft" size="lg" className="mx-auto mb-6" />
            <h1 className="text-display-l text-laudok-900 mb-4">Pagamento cancelado</h1>
            <p className="text-body-l text-ink-muted mb-8">
              Seu pagamento foi cancelado. Nenhuma cobrança foi realizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <LinkButton href="/#plans" size="lg">Ver planos novamente</LinkButton>
              <LinkButton href="/" variant="secondary" size="lg">Voltar para a Home</LinkButton>
            </div>
          </Card>
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
