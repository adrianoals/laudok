import type { Metadata } from 'next';
import { MessageCircle, BookOpen } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, Eyebrow, IconTile, LinkButton, Reveal, SectionShell } from '@/components/ui';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes - Laudok!',
  description:
    'Perguntas frequentes organizadas por categoria — Sobre o Produto, Atendimento à Norma, Financeiro e Pagamento, Segurança e Privacidade.',
};

const heroDecorations = (
  <>
    <div className="hidden md:block absolute -top-16 -left-16 w-56 h-56 rounded-full border border-laudok-300/30" aria-hidden />
    <div className="hidden md:block absolute -bottom-20 left-1/3 w-48 h-48 rounded-full border-2 border-laudok-200/25" aria-hidden />
    <div className="hidden md:block absolute top-20 left-1/3 w-3 h-3 rounded-full bg-laudok-200" aria-hidden />
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
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell
          tone="dark"
          withGrid
          decorations={heroDecorations}
          className="pt-20 pb-16"
        >
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <Eyebrow tone="light">Auto atendimento</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="text-display-xl text-surface">
                  Perguntas Frequentes.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-body-l text-laudok-100 max-w-xl">
                  Encontre rapidamente as respostas para as dúvidas mais comuns sobre o Laudok!
                  Filtre por categoria ou use a busca.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <Reveal delay={240}>
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-[var(--shadow-emboss)]">
                  <div className="absolute inset-0 bg-laudok-900/45 backdrop-blur-md" aria-hidden />
                  <div className="absolute inset-3 rounded-xl border border-surface/20" aria-hidden />
                  <div className="absolute inset-3 rounded-xl bg-grid-blueprint-light bg-grid-blueprint--masked opacity-70 pointer-events-none" aria-hidden />
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-laudok-200/80" aria-hidden />
                  <div className="absolute top-9 right-9 w-6 h-6 rounded-full bg-laudok-200/90" aria-hidden />
                  <div className="absolute top-24 left-6 w-14 h-px bg-laudok-200/60" aria-hidden />

                  <div className="absolute inset-0 p-10 flex flex-col">
                    <div className="flex items-center gap-3 mb-auto">
                      <BookOpen size={20} className="text-laudok-200" />
                      <span className="text-label text-laudok-200">Base de conhecimento</span>
                    </div>
                    <div>
                      <div className="text-display-2xl text-surface leading-none">9</div>
                      <div className="text-body text-laudok-100 mt-2">
                        perguntas em <span className="text-surface font-semibold">4 categorias</span>
                      </div>
                      <div className="mt-6 pt-5 border-t border-surface/15">
                        <div className="text-caption text-laudok-200">Atualizado periodicamente</div>
                        <div className="text-body-s text-surface mt-1">
                          conforme retorno dos usuários e da equipe técnica.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </SectionShell>

        <SectionShell tone="surface">
          <FAQContent />
        </SectionShell>

        <SectionShell tone="pale" decorations={ctaDecorations}>
          <Reveal>
            <Card
              variant="emboss"
              withFillet
              className="max-w-2xl mx-auto p-10 md:p-12 text-center"
            >
              <IconTile icon={MessageCircle} tone="filled" size="lg" className="mx-auto mb-6" />
              <h2 className="text-display-m text-laudok-900 mb-4">
                Não encontrou a sua resposta?
              </h2>
              <p className="text-body-l text-ink-muted mb-8">
                Nossa equipe está pronta para te ajudar. Fale com a gente e tire sua dúvida.
              </p>
              <LinkButton href="/contato" size="lg">
                Fale com a Laudok!
              </LinkButton>
            </Card>
          </Reveal>
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
