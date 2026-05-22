'use client';

import { useState, FormEvent } from 'react';
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
      setFeedback('Inscrição confirmada!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setFeedback(
        error instanceof Error ? error.message : 'Não foi possível concluir sua inscrição.',
      );
    }
  };

  return (
    <section className="relative border-b border-laudok-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
        >
          <div className="md:flex-shrink-0 text-center md:text-left">
            <div className="text-label text-laudok-200">Newsletter Laudok!</div>
            <p className="text-body-s text-laudok-100/80 mt-1">
              Conteúdos sobre laudos e novidades direto no seu e-mail.
            </p>
          </div>

          <div className="md:flex-grow md:max-w-md md:ml-auto flex flex-col gap-2 w-full">
            <div className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">Seu melhor e-mail</label>
              <div className="relative flex-grow">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faded" />
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full rounded-md bg-surface text-ink placeholder:text-ink-faded text-body-s py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-laudok-300 disabled:opacity-60"
                />
              </div>
              <Button type="submit" size="sm" variant="inverse" disabled={status === 'loading' || status === 'success'}>
                {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Inscrever-se'}
              </Button>
            </div>
            {status === 'success' && (
              <p className="flex items-center gap-2 text-caption text-laudok-100">
                <CheckCircle size={12} /> {feedback}
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-center gap-2 text-caption text-laudok-100">
                <AlertCircle size={12} /> {feedback}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
