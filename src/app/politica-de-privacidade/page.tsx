import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, SectionShell } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Política de Privacidade - Laudok!',
  description: 'Política de Privacidade do Laudok! - Proteção e uso de dados.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="dark" withGrid className="pt-20 pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-label text-laudok-200 mb-3">Legal</div>
            <h1 className="text-display-xl text-surface">Política de Privacidade</h1>
          </div>
        </SectionShell>
        <SectionShell tone="cream">
          <Card variant="emboss" className="max-w-3xl mx-auto p-8 md:p-10 space-y-8">
            <p className="text-body-s text-ink-muted">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">1. Introdução</h2>
              <p className="text-body text-ink-muted leading-relaxed">
                A Laudok! está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como
                coletamos, usamos, divulgamos e protegemos suas informações pessoais quando você utiliza nossos serviços.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">2. Informações que Coletamos</h2>
              <p className="text-body text-ink-muted leading-relaxed">
                Coletamos informações que você nos fornece diretamente, incluindo:
              </p>
              <ul className="list-disc pl-6 text-body text-ink-muted space-y-1">
                <li>Nome e informações de contato</li>
                <li>Informações profissionais</li>
                <li>Dados de uso da plataforma</li>
                <li>Informações de pagamento</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">3. Como Usamos suas Informações</h2>
              <p className="text-body text-ink-muted leading-relaxed">Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 text-body text-ink-muted space-y-1">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Processar pagamentos</li>
                <li>Enviar comunicações importantes</li>
                <li>Personalizar sua experiência</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">4. Proteção de Dados</h2>
              <p className="text-body text-ink-muted leading-relaxed">
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais
                contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">5. Seus Direitos</h2>
              <p className="text-body text-ink-muted leading-relaxed">Você tem o direito de:</p>
              <ul className="list-disc pl-6 text-body text-ink-muted space-y-1">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir dados imprecisos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Retirar seu consentimento</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">6. Contato</h2>
              <p className="text-body text-ink-muted leading-relaxed">
                Para questões relacionadas a esta Política de Privacidade, entre em contato através do e-mail:{' '}
                <a href="mailto:privacidade@laudok.com.br" className="text-laudok-700 hover:text-laudok-500 transition-colors">
                  privacidade@laudok.com.br
                </a>
                .
              </p>
            </section>
          </Card>
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
