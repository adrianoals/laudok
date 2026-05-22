import Link from 'next/link';
import { Linkedin, Instagram, Youtube } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/laudok' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/laudo.ok' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@Laudok' },
];

export default function Footer() {
  return (
    <footer className="bg-laudok-900 text-surface">
      <NewsletterSignup />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Link href="/" className="inline-block">
              <span className="text-display-m text-surface">Laudok!</span>
            </Link>
            <p className="text-body-s text-laudok-200 mt-1 max-w-md">
              Laudos de engenharia inteligentes para condomínios.
            </p>
          </div>

          <div className="flex gap-2">
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

        <div className="mt-8 pt-6 border-t border-laudok-800 flex flex-col md:flex-row justify-between items-center gap-3 text-body-s text-laudok-200">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="mailto:contato@laudok.com.br" className="hover:text-surface transition-colors">
              contato@laudok.com.br
            </a>
            <Link href="/politica-de-privacidade" className="hover:text-surface transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="hover:text-surface transition-colors">
              Termos de Uso
            </Link>
          </div>
          <p className="text-laudok-300">
            © {new Date().getFullYear()} Laudok!
          </p>
        </div>
      </div>
    </footer>
  );
}
