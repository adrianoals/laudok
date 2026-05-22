'use client';

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, IconTile, LinkButton, SectionShell } from '@/components/ui';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="cream" withGrid>
          <Card variant="emboss" withFillet className="max-w-xl mx-auto p-10 text-center">
            <IconTile icon={CheckCircle2} tone="filled" size="lg" className="mx-auto mb-6" />
            <h1 className="text-display-l text-laudok-900 mb-4">Pagamento confirmado!</h1>
            <p className="text-body-l text-ink-muted mb-8">
              Obrigado por assinar o Laudok! Seu cadastro está sendo processado e você receberá um e-mail com as instruções de acesso em breve.
            </p>
            <LinkButton href="/" size="lg">Voltar para a Home</LinkButton>
            <p className="text-body-s text-ink-muted mt-6">
              Se você tiver dúvidas, entre em contato em{' '}
              <Link href="mailto:contato@laudok.com.br" className="text-laudok-700 hover:text-laudok-500 transition-colors">
                contato@laudok.com.br
              </Link>
            </p>
          </Card>
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
