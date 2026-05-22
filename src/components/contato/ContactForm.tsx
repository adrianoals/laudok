'use client';

import { useState, FormEvent } from 'react';
import { Loader2, Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';
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

const fieldClasses =
  'w-full rounded-md bg-laudok-50/60 border border-laudok-200/70 text-ink placeholder:text-ink-faded focus:outline-none focus:ring-4 focus:ring-laudok-500/15 focus:border-laudok-500 focus:bg-surface hover:border-laudok-300 transition-all duration-200';

const inputClasses = `${fieldClasses} pl-11 pr-4 py-3`;
const textareaClasses = `${fieldClasses} px-4 py-3 resize-none`;
const iconClasses = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-laudok-500';

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
      <div className="text-center lg:text-left mb-8">
        <Eyebrow className="justify-center lg:justify-start">Formulário</Eyebrow>
        <h2 className="text-display-m text-laudok-900 mt-3 mb-2">
          Envie sua mensagem.
        </h2>
        <p className="text-body text-ink-muted">
          Preencha os campos abaixo e responderemos em até 24 horas em dias úteis.
        </p>
      </div>

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
          <div className="relative">
            <User size={18} className={iconClasses} />
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
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-body-s font-medium text-ink mb-2">
              E-mail *
            </label>
            <div className="relative">
              <Mail size={18} className={iconClasses} />
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
          </div>

          <div>
            <label htmlFor="phone" className="block text-body-s font-medium text-ink mb-2">
              Telefone <span className="text-ink-faded font-normal">(opcional)</span>
            </label>
            <div className="relative">
              <Phone size={18} className={iconClasses} />
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
        </div>

        <div>
          <label htmlFor="message" className="block text-body-s font-medium text-ink mb-2">
            Mensagem *
          </label>
          <div className="relative">
            <MessageSquare size={18} className="absolute left-3.5 top-4 text-laudok-500" />
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className={`${textareaClasses} pl-11`}
              placeholder="Como podemos ajudá-lo?"
            />
          </div>
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
