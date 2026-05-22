'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Loader2, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui';

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
      if (!response.ok) throw new Error(data.error || 'Não foi possível concluir sua inscrição.');
      setStatus('success');
      setFeedback('Inscrição confirmada! Em breve você receberá novidades da Laudok!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setFeedback(
        error instanceof Error ? error.message : 'Não foi possível concluir sua inscrição. Tente novamente.',
      );
    }
  };

  return (
    <section className="relative border-b border-laudok-800/60 bg-laudok-900">
      <div className="absolute inset-0 bg-grid-blueprint bg-grid-blueprint--masked opacity-40 pointer-events-none" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="text-label text-laudok-200">Newsletter</div>
            <h2 className="text-display-m text-surface">Assine a newsletter Laudok!</h2>
            <p className="text-body text-laudok-100 max-w-md">
              Conteúdos sobre laudos de engenharia, atualizações da NBR 16.747 e novidades da plataforma — direto no seu e-mail.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="lg:col-span-6 w-full">
            <div className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">Seu melhor e-mail</label>
              <div className="relative flex-grow">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-laudok-700" />
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu melhor e-mail"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full rounded-md bg-surface text-ink placeholder:text-ink-faded py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-laudok-300 disabled:opacity-60"
                />
              </div>
              <Button type="submit" size="lg" disabled={status === 'loading' || status === 'success'}>
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Enviando...
                  </>
                ) : (
                  'Inscrever-se'
                )}
              </Button>
            </div>

            {status === 'success' && (
              <p className="mt-3 flex items-start gap-2 text-body-s text-laudok-100">
                <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                {feedback}
              </p>
            )}
            {status === 'error' && (
              <p className="mt-3 flex items-start gap-2 text-body-s text-laudok-100">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                {feedback}
              </p>
            )}

            <p className="mt-3 text-caption text-laudok-300">
              Ao se inscrever, você concorda com nossa{' '}
              <Link href="/politica-de-privacidade" className="underline hover:text-surface">
                Política de Privacidade
              </Link>
              . Cancele quando quiser.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
