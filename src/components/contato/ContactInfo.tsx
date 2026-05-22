import { Mail, MapPin, Linkedin, Instagram, Youtube, type LucideIcon } from 'lucide-react';
import { IconTile } from '@/components/ui';

const socials: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/laudok' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/laudo.ok' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@Laudok' },
];

export default function ContactInfo() {
  return (
    <div className="space-y-10">
      <div>
        <div className="text-label text-laudok-700 mb-3">Fale com a gente</div>
        <h2 className="text-display-m text-laudok-900 mb-4">Entre em contato.</h2>
        <p className="text-body text-ink-muted">
          Estamos prontos para ajudar você. Use os canais abaixo ou preencha o formulário ao lado.
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <IconTile icon={Mail} tone="soft" size="md" />
          <div>
            <div className="text-label text-laudok-700 mb-1">E-mail</div>
            <a href="mailto:contato@laudok.com.br" className="text-body text-ink hover:text-laudok-500 transition-colors">
              contato@laudok.com.br
            </a>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <IconTile icon={MapPin} tone="soft" size="md" />
          <div>
            <div className="text-label text-laudok-700 mb-1">Localização</div>
            <p className="text-body text-ink">São Paulo, SP</p>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-sand-200">
        <div className="text-label text-laudok-700 mb-3">Redes sociais</div>
        <div className="flex gap-2">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-sand-200 text-laudok-800 hover:bg-laudok-800 hover:text-surface hover:border-laudok-800 transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <p className="text-caption text-ink-muted">
        Horário de atendimento: Segunda a Sexta, das 9h às 18h
      </p>
    </div>
  );
}
