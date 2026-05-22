import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contato/ContactForm';
import ContactInfo from '@/components/contato/ContactInfo';
import { SectionShell } from '@/components/ui';

export const metadata = {
  title: 'Contato - Laudok!',
  description: 'Entre em contato com a Laudok! Estamos prontos para ajudar você com laudos de engenharia.',
};

const heroDecorations = (
  <>
    <div className="hidden md:block absolute -top-16 -left-16 w-56 h-56 rounded-full border border-laudok-300/30" aria-hidden />
    <div className="hidden md:block absolute -top-8 -right-12 w-72 h-72 rounded-full border-2 border-laudok-300/30" aria-hidden />
    <div className="hidden md:block absolute top-16 right-32 w-10 h-10 rounded-full bg-laudok-300/30" aria-hidden />
    <div className="hidden md:block absolute -bottom-20 -left-8 w-56 h-56 rounded-full border border-laudok-200/30" aria-hidden />
    <div className="hidden md:block absolute bottom-12 right-20 w-3 h-3 rounded-full bg-laudok-200" aria-hidden />
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
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="dark" withGrid decorations={heroDecorations} className="pt-20 pb-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-label text-laudok-200 mb-3">Contato</div>
            <h1 className="text-display-xl text-surface">Entre em contato</h1>
            <p className="text-body-l text-laudok-100 mt-4">
              Tire suas dúvidas ou solicite mais informações sobre nossos serviços.
            </p>
          </div>
        </SectionShell>
        <SectionShell tone="pale" decorations={contentDecorations}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
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
