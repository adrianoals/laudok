import { Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contato/ContactForm';
import ContactInfo from '@/components/contato/ContactInfo';
import { Eyebrow, Reveal, SectionShell } from '@/components/ui';

export const metadata = {
  title: 'Contato - Laudok!',
  description: 'Entre em contato com a Laudok! Estamos prontos para ajudar você com laudos de engenharia.',
};

const heroDecorations = (
  <>
    <div className="hidden md:block absolute -top-16 -left-16 w-56 h-56 rounded-full border border-laudok-300/30" aria-hidden />
    <div className="hidden md:block absolute -bottom-20 left-1/3 w-48 h-48 rounded-full border-2 border-laudok-200/25" aria-hidden />
    <div className="hidden md:block absolute top-20 left-1/3 w-3 h-3 rounded-full bg-laudok-200" aria-hidden />
  </>
);

const contentDecorations = (
  <>
    <div className="hidden md:block absolute -top-16 right-12 w-48 h-48 rounded-full border border-laudok-300/50" aria-hidden />
    <div className="hidden md:block absolute -bottom-20 -left-20 w-64 h-64 rounded-full border-2 border-laudok-300/40" aria-hidden />
    <div className="hidden md:block absolute top-32 left-8 w-2 h-2 rounded-full bg-laudok-400" aria-hidden />
    <div className="hidden md:block absolute bottom-32 right-12 flex items-center gap-2" aria-hidden>
      <div className="w-10 h-px bg-laudok-300/60" />
      <div className="w-2 h-2 rounded-full bg-laudok-300/80" />
    </div>
  </>
);

export default function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell
          tone="dark"
          withGrid
          decorations={heroDecorations}
          paddingY="py-16 md:py-24 lg:py-28"
        >
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 lg:space-y-6 text-center lg:text-left">
              <Reveal>
                <Eyebrow tone="light" className="justify-center lg:justify-start">Fale com a gente</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="text-display-xl text-surface">
                  Entre em contato.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-body-l text-laudok-100 max-w-xl mx-auto lg:mx-0">
                  Tire suas dúvidas, peça um orçamento ou solicite mais informações sobre o Laudok!
                  Respondemos em até 24 horas em dias úteis.
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
                      <Clock size={20} className="text-laudok-200" />
                      <span className="text-label text-laudok-200">Atendimento</span>
                    </div>
                    <div>
                      <div className="text-label text-laudok-200">Resposta em</div>
                      <div className="text-display-l text-surface mt-1">até 24 horas</div>
                      <div className="mt-6 pt-5 border-t border-surface/15">
                        <div className="text-caption text-laudok-200">Horário</div>
                        <div className="text-body-s text-surface mt-1">
                          Segunda a Sexta · 9h às 18h
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-caption text-laudok-200">E-mail direto</div>
                        <div className="text-body-s text-surface mt-1">
                          contato@laudok.com.br
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </SectionShell>

        <SectionShell tone="pale" decorations={contentDecorations}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}
