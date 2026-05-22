import {
  Mail,
  MapPin,
  Clock,
  Linkedin,
  Instagram,
  Youtube,
  Share2,
  type LucideIcon,
} from 'lucide-react';
import { Card, Eyebrow, IconTile } from '@/components/ui';

const socials: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/laudok' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/laudo.ok' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@Laudok' },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="mb-2 text-center lg:text-left">
        <Eyebrow className="justify-center lg:justify-start">Canais de contato</Eyebrow>
        <h2 className="text-display-m text-laudok-900 mt-3">
          Como falar com a gente.
        </h2>
        <p className="text-body text-ink-muted mt-3 max-w-md mx-auto lg:mx-0">
          Escolha o melhor canal ou preencha o formulário ao lado. Respondemos em até 24 horas em dias úteis.
        </p>
      </div>

      <Card variant="emboss" withFillet hoverable className="p-6">
        <div className="flex items-start gap-4">
          <IconTile icon={Mail} tone="filled" size="md" />
          <div>
            <div className="text-label text-laudok-700">E-mail</div>
            <a
              href="mailto:contato@laudok.com.br"
              className="text-body font-semibold text-laudok-900 hover:text-laudok-500 transition-colors"
            >
              contato@laudok.com.br
            </a>
            <p className="text-body-s text-ink-muted mt-1">
              Resposta em até 24 horas em dias úteis.
            </p>
          </div>
        </div>
      </Card>

      <Card variant="emboss" hoverable className="p-6">
        <div className="flex items-start gap-4">
          <IconTile icon={MapPin} tone="soft" size="md" />
          <div>
            <div className="text-label text-laudok-700">Localização</div>
            <p className="text-body font-semibold text-laudok-900">São Paulo, SP</p>
            <p className="text-body-s text-ink-muted mt-1">
              Atendimento 100% online em todo o Brasil.
            </p>
          </div>
        </div>
      </Card>

      <Card variant="emboss" hoverable className="p-6">
        <div className="flex items-start gap-4">
          <IconTile icon={Clock} tone="soft" size="md" />
          <div>
            <div className="text-label text-laudok-700">Horário</div>
            <p className="text-body font-semibold text-laudok-900">Segunda a Sexta · 9h às 18h</p>
            <p className="text-body-s text-ink-muted mt-1">
              Fora deste horário, fale com a gente pelo e-mail.
            </p>
          </div>
        </div>
      </Card>

      <Card variant="emboss" className="p-6">
        <div className="flex items-start gap-4">
          <IconTile icon={Share2} tone="soft" size="md" />
          <div className="flex-grow">
            <div className="text-label text-laudok-700">Redes sociais</div>
            <p className="text-body-s text-ink-muted mt-1 mb-3">
              Siga a gente para novidades e conteúdo técnico.
            </p>
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
        </div>
      </Card>
    </div>
  );
}
