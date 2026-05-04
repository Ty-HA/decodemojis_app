import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez l'équipe DecodEmojis pour toute question, signalement ou proposition de partenariat.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: "Contact | DecodEmojis",
    description: "Une question, un signalement, une suggestion ? Écrivez-nous.",
    url: '/contact',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
