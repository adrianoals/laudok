import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/login/LoginForm';

export const metadata = {
  title: 'Login - Laudok!',
  description: 'Faça login na sua conta Laudok! para acessar a plataforma de laudos de engenharia.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <Header />
      <main className="relative flex-grow flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-blueprint bg-grid-blueprint--masked pointer-events-none" aria-hidden />
        <div className="relative w-full max-w-md">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
