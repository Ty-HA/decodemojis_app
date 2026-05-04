import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Proposer une définition d'emoji",
  description:
    "Contribuez au dictionnaire DecodEmojis : proposez la signification d'un emoji ou suggérez un nouvel emoji à ajouter.",
  alternates: { canonical: '/proposer' },
  openGraph: {
    title: "Proposer une définition d'emoji | DecodEmojis",
    description: "Aidez la communauté en partageant votre connaissance des emojis.",
    url: '/proposer',
    type: 'website',
  },
};

export default function ProposerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
