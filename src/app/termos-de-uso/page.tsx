import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, SectionShell } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Termos de Uso - Laudok!',
  description: 'Termos de Uso do Laudok! - Condições e regras de utilização da plataforma.',
};

export default function TermsOfUse() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="dark" withGrid className="pt-20 pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-label text-laudok-200 mb-3">Legal</div>
            <h1 className="text-display-xl text-surface">Termos de Uso</h1>
          </div>
        </SectionShell>
        <SectionShell tone="cream">
          <Card variant="emboss" className="max-w-3xl mx-auto p-8 md:p-10 space-y-8">
            <p className="text-body-s text-ink-muted">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">1. Aceitação dos Termos</h2>
              <p className="text-body text-ink-muted leading-relaxed">
                Ao acessar e utilizar a plataforma Laudok!, você concorda em cumprir estes Termos de Uso e todas as leis
                e regulamentos aplicáveis. Se você não concordar com qualquer parte destes termos, não poderá acessar
                a plataforma.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">2. Uso da Plataforma</h2>
              <p className="text-body text-ink-muted leading-relaxed">A plataforma Laudok! é destinada a:</p>
              <ul className="list-disc pl-6 text-body text-ink-muted space-y-1">
                <li>Profissionais de engenharia e arquitetura</li>
                <li>Empresas do setor de construção civil</li>
                <li>Administradores de condomínios</li>
                <li>Usuários autorizados pela Laudok!</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">3. Responsabilidades do Usuário</h2>
              <p className="text-body text-ink-muted leading-relaxed">Ao utilizar nossa plataforma, você concorda em:</p>
              <ul className="list-disc pl-6 text-body text-ink-muted space-y-1">
                <li>Fornecer informações precisas e atualizadas</li>
                <li>Manter a confidencialidade de sua conta</li>
                <li>Utilizar a plataforma de acordo com as leis aplicáveis</li>
                <li>Não realizar atividades que possam prejudicar o funcionamento da plataforma</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">4. Propriedade Intelectual</h2>
              <p className="text-body text-ink-muted leading-relaxed">
                Todo o conteúdo, funcionalidades e design da plataforma Laudok! são protegidos por direitos autorais,
                marcas registradas e outras leis de propriedade intelectual. O uso não autorizado pode resultar em ações legais.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">5. Limitação de Responsabilidade</h2>
              <p className="text-body text-ink-muted leading-relaxed">A Laudok! não se responsabiliza por:</p>
              <ul className="list-disc pl-6 text-body text-ink-muted space-y-1">
                <li>Danos causados por uso inadequado da plataforma</li>
                <li>Interrupções temporárias do serviço</li>
                <li>Conteúdo gerado por terceiros</li>
                <li>Decisões tomadas com base nas informações fornecidas pela plataforma</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">6. Modificações dos Termos</h2>
              <p className="text-body text-ink-muted leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
                imediatamente após sua publicação na plataforma. O uso continuado da plataforma após as alterações
                constitui aceitação dos novos termos.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-display-s text-laudok-900">7. Contato</h2>
              <p className="text-body text-ink-muted leading-relaxed">
                Para questões relacionadas a estes Termos de Uso, entre em contato através do e-mail:{' '}
                <a href="mailto:termos@laudok.com.br" className="text-laudok-700 hover:text-laudok-500 transition-colors">
                  termos@laudok.com.br
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
