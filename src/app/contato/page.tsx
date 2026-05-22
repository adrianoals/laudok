import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contato/ContactForm';
import ContactInfo from '@/components/contato/ContactInfo';
import { SectionShell } from '@/components/ui';

export const metadata = {
  title: 'Contato - Laudok!',
  description: 'Entre em contato com a Laudok! Estamos prontos para ajudar você com laudos de engenharia.',
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="flex-grow pt-16">
        <SectionShell tone="dark" withGrid className="pt-20 pb-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-label text-laudok-200 mb-3">Contato</div>
            <h1 className="text-display-xl text-surface">Entre em contato</h1>
            <p className="text-body-l text-laudok-100 mt-4">
              Tire suas dúvidas ou solicite mais informações sobre nossos serviços.
            </p>
          </div>
        </SectionShell>
        <SectionShell tone="cream">
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
