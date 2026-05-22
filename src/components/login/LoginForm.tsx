'use client';

import { useState, FormEvent } from 'react';
import { Loader2, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui';

interface FormData {
  email: string;
  password: string;
}

interface FormState {
  status: 'idle' | 'loading' | 'error';
  message: string;
}

const inputClasses =
  'w-full rounded-md bg-laudok-50/60 border border-laudok-200/70 text-ink placeholder:text-ink-faded focus:outline-none focus:ring-4 focus:ring-laudok-500/15 focus:border-laudok-500 focus:bg-surface hover:border-laudok-300 transition-all duration-200 py-3';

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState<FormState>({ status: 'idle', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ status: 'loading', message: '' });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erro ao fazer login');
      if (data.redirectTo) {
        window.location.href = data.redirectTo;
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setFormState({
        status: 'error',
        message:
          error instanceof Error ? error.message : 'Erro ao fazer login. Verifique suas credenciais.',
      });
    }
  };

  return (
    <div className="bg-surface rounded-2xl shadow-[var(--shadow-emboss)] p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="text-label text-laudok-700 mb-3">Acesse sua conta</div>
        <h2 className="text-display-m text-laudok-900 mb-2">Entrar no Laudok!</h2>
        <p className="text-body text-ink-muted">Acesse sua conta para continuar</p>
      </div>

      {formState.status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-body-s">{formState.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-body-s font-medium text-ink mb-2">
            E-mail
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-laudok-500" />
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`${inputClasses} pl-11`}
              placeholder="seu@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-body-s font-medium text-ink mb-2">
            Senha
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-laudok-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`${inputClasses} pl-11 pr-12`}
              placeholder="Sua senha"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-faded hover:text-ink-muted"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-body-s text-ink-muted">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-sand-300 text-laudok-500 focus:ring-laudok-300"
            />
            Lembrar-me
          </label>
          <Link href="/recuperar-senha" className="text-body-s font-medium text-laudok-700 hover:text-laudok-500 transition-colors">
            Esqueceu a senha?
          </Link>
        </div>

        <Button type="submit" size="lg" disabled={formState.status === 'loading'} className="w-full">
          {formState.status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-body-s text-ink-muted">
          Não tem uma conta?{' '}
          <Link href="/cadastro" className="font-medium text-laudok-700 hover:text-laudok-500 transition-colors">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
