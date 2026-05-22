'use client';

import { useState, FormEvent } from 'react';
import { Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button, Card, Eyebrow } from '@/components/ui';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const inputClasses =
  'w-full px-4 py-3 rounded-md bg-surface border border-sand-200 text-ink placeholder:text-ink-faded focus:outline-none focus:ring-2 focus:ring-laudok-300 focus:border-laudok-500 transition-colors';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: 'loading', message: '' });

    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

      setFormState({
        status: 'success',
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      });

      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setFormState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Erro ao enviar mensagem. Tente novamente.',
      });
    }
  };

  return (
    <Card variant="emboss" withFillet className="p-8 md:p-10">
      <Eyebrow>Formulário</Eyebrow>
      <h2 className="text-display-m text-laudok-900 mt-3 mb-2">
        Envie sua mensagem.
      </h2>
      <p className="text-body text-ink-muted mb-8">
        Preencha os campos abaixo e responderemos em até 24 horas em dias úteis.
      </p>

      {formState.status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-green-700 text-body-s">{formState.message}</p>
        </div>
      )}

      {formState.status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-body-s">{formState.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-body-s font-medium text-ink mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Seu nome completo"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-body-s font-medium text-ink mb-2">
              E-mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-body-s font-medium text-ink mb-2">
              Telefone <span className="text-ink-faded font-normal">(opcional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-body-s font-medium text-ink mb-2">
            Mensagem *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`${inputClasses} resize-none`}
            placeholder="Como podemos ajudá-lo?"
          />
        </div>

        <Button type="submit" size="lg" disabled={formState.status === 'loading'} className="w-full">
          {formState.status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar mensagem
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
