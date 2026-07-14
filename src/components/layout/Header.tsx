'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { LinkButton } from '@/components/ui';

const navLinks = [
  { href: '/#about', label: 'Sobre' },
  { href: '/#features', label: 'Funcionalidades' },
  { href: '/#how-it-works', label: 'Como Funciona' },
  { href: '/#plans', label: 'Planos' },
  { href: '/faq', label: 'Perguntas Frequentes' },
  { href: '/contato', label: 'Contato' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-vertical-sem-margens.png"
              alt="Laudok! Logo"
              width={845}
              height={1001}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-body-s font-medium text-ink hover:text-laudok-500 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="https://app.laudok.com.br" className="hidden sm:inline-flex text-body-s font-medium text-laudok-800 hover:text-laudok-500 transition-colors">
              Login
            </Link>
            <LinkButton href="https://laudok.com.br/Account/Register" size="sm" className="hidden sm:inline-flex">
              Experimente Grátis
            </LinkButton>
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-laudok-800 hover:bg-sand-100 transition-colors"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-sand-200">
          <nav className="px-4 sm:px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-body font-medium text-ink hover:text-laudok-500 hover:bg-sand-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="https://app.laudok.com.br" className="sm:hidden block px-3 py-2 rounded-md text-body font-medium text-laudok-800 hover:bg-sand-100 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
