import Link from 'next/link';
import { Linkedin, Instagram, Youtube, Mail, MapPin } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

const quickLinks = [
  { href: '/#about', label: 'Sobre' },
  { href: '/#features', label: 'Funcionalidades' },
  { href: '/#how-it-works', label: 'Como Funciona' },
  { href: '/#plans', label: 'Planos e Preços' },
  { href: '/faq', label: 'Perguntas Frequentes' },
  { href: '/contato', label: 'Contato' },
];

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/laudok' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/laudo.ok' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@Laudok' },
];

export default function Footer() {
  return (
    <footer className="bg-laudok-900 text-surface">
      <NewsletterSignup />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-5">
              <span className="text-display-m text-surface">Laudok!</span>
            </Link>
            <p className="text-body-s text-laudok-200 max-w-sm">
              Transformando a forma como laudos técnicos são elaborados. Soluções inteligentes para engenheiros e arquitetos.
            </p>
            <div className="flex gap-2 mt-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-laudok-700 text-surface hover:bg-laudok-800 hover:border-laudok-500 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-label text-laudok-200 mb-5">Navegação</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-s text-laudok-100 hover:text-surface transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-label text-laudok-200 mb-5">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-body-s text-laudok-100">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a href="mailto:contato@laudok.com.br" className="hover:text-surface transition-colors">contato@laudok.com.br</a>
              </li>
              <li className="flex items-start gap-3 text-body-s text-laudok-100">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-laudok-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-s text-laudok-200">
            <Link href="/politica-de-privacidade" className="hover:text-surface transition-colors">Política de Privacidade</Link>
            <Link href="/termos-de-uso" className="hover:text-surface transition-colors">Termos de Uso</Link>
          </div>
          <p className="text-body-s text-laudok-300">
            © {new Date().getFullYear()} Laudok! Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
