'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Loader2, Mail, CheckCircle, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

// TODO: substituir o submit pelo embed/integração oficial do RD Station Marketing
// quando o Henrique disponibilizar o formulário.
export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível concluir sua inscrição.');
      }

      setStatus('success');
      setFeedback('Inscrição confirmada! Em breve você receberá novidades da Laudok!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Não foi possível concluir sua inscrição. Tente novamente.'
      );
    }
  };

  return (
    <section className="bg-laudok-dark/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Assine a newsletter Laudok!
            </h2>
            <p className="text-laudok-light">
              Receba conteúdos exclusivos sobre laudos de engenharia, atualizações da NBR
              16.747 e novidades da plataforma direto no seu e-mail.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Seu melhor e-mail
              </label>
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-laudok-dark" />
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full rounded-md bg-white text-laudok-dark placeholder:text-gray-400 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-laudok-light disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold bg-white text-laudok-dark hover:bg-laudok-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Inscrever-se'
                )}
              </button>
            </div>

            {status === 'success' && (
              <div className="mt-4 flex items-start gap-2 text-sm text-white">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{feedback}</span>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 flex items-start gap-2 text-sm text-white">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{feedback}</span>
              </div>
            )}

            <p className="mt-4 text-xs text-laudok-light/80">
              Ao se inscrever, você concorda com a nossa{' '}
              <Link href="/politica-de-privacidade" className="underline hover:text-white">
                Política de Privacidade
              </Link>
              . Você pode cancelar a inscrição quando quiser.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
