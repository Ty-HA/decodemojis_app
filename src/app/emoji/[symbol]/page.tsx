import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareButton from '@/components/ShareButton';
import {
  getAllEmojis,
  getEmojiBySymbol,
  decodeEmojiFromUrl,
  encodeEmojiForUrl,
  normalizeEmoji
} from '@/utils/emoji-utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const emojis = await getAllEmojis();
  return emojis.map((emoji) => ({
    symbol: encodeEmojiForUrl(emoji.emoji),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ symbol: string }>;
}): Promise<Metadata> {
  const { symbol } = await params;
  const decodedSymbol = decodeEmojiFromUrl(symbol);
  const emojis = await getAllEmojis();
  const emoji = getEmojiBySymbol(emojis, decodedSymbol);

  if (!emoji) {
    return {
      title: 'Emoji introuvable',
      robots: { index: false, follow: false },
    };
  }

  const title = `${emoji.emoji} Signification de l'emoji ${emoji.emoji}`;
  const description = emoji.signification.length > 160
    ? emoji.signification.slice(0, 157) + '…'
    : emoji.signification;
  const path = `/emoji/${encodeEmojiForUrl(emoji.emoji)}`;

  return {
    title,
    description,
    keywords: [
      `signification ${emoji.emoji}`,
      `emoji ${emoji.emoji}`,
      ...emoji.tags,
    ],
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title,
      description,
      url: path,
      locale: 'fr_FR',
      tags: emoji.tags,
      publishedTime: emoji.date_ajout,
      modifiedTime: emoji.date_ajout,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function EmojiDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const decodedSymbol = decodeEmojiFromUrl(symbol);
  const emojis = await getAllEmojis();
  const emoji = getEmojiBySymbol(emojis, decodedSymbol);
  
  if (!emoji) {
    notFound();
  }
  
  const formattedDate = new Date(emoji.date_ajout).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://decodemojis.fr';
  const pageUrl = `${siteUrl}/emoji/${encodeEmojiForUrl(emoji.emoji)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': pageUrl,
    name: emoji.emoji,
    description: emoji.signification,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'DecodEmojis',
      url: siteUrl,
    },
    inLanguage: 'fr-FR',
    url: pageUrl,
    keywords: emoji.tags.join(', '),
    dateModified: emoji.date_ajout,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Glossaire', item: `${siteUrl}/glossaire` },
      { '@type': 'ListItem', position: 3, name: emoji.emoji, item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Navigation links */}
        <div className="flex mb-6 items-center">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 flex items-center group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
            <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span>
            <span className="ml-1">Retour à l&apos;accueil</span>
          </Link>
          <Link href="/glossaire" className="text-indigo-600 hover:text-indigo-800 ml-4 flex items-center group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all">
            <span className="mr-1">📖</span>
            <span>Glossaire</span>
          </Link>
        </div>
        
        {/* Main emoji card */}
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute -z-10 top-10 left-1/4 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -z-10 bottom-10 right-1/4 w-72 h-72 bg-rose-300 rounded-full opacity-20 blur-3xl"></div>
          
          <div className="glass-effect rounded-3xl shadow-xl p-8 max-w-2xl mx-auto border border-white/20">
            {/* Emoji display */}
            <div className="text-center mb-10 relative">
              <div className="relative inline-block">
                {/* Pulsing glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-rose-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <h1 className="text-9xl relative z-10 mb-6 inline-block transform hover:scale-125 transition-transform duration-500 hover:rotate-12 leading-none">
                  <span aria-label={`Signification de l'emoji ${emoji.emoji}`}>{emoji.emoji}</span>
                </h1>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mt-8 mb-3">
                {emoji.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-200 hover:from-indigo-200 hover:to-purple-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4 font-medium">
                Mis à jour le {formattedDate}
              </p>
            </div>
            
            {emoji.tags.includes('alerte') && (
              <div className="mb-6 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-xl flex items-start gap-3" role="alert">
                <span className="text-2xl shrink-0" aria-hidden="true">⚠️</span>
                <div className="text-sm text-rose-900 leading-relaxed">
                  <strong className="font-bold">Signal d&apos;alerte.</strong> Cet emoji peut être associé à des contenus graves (drogue, automutilation, exploitation, haine). Un emoji isolé ne signifie rien : c&apos;est la <em>combinaison</em> avec d&apos;autres éléments (pseudo, contexte, changement de comportement) qui doit attirer l&apos;attention. Numéros et services officiels sur notre <Link href="/ressources" className="underline font-semibold">page Ressources</Link> (3018, 119, 3114, Pharos…).
                </div>
              </div>
            )}

            {emoji.tags.includes('fbi-2007') && (
              <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl flex items-start gap-3" role="note">
                <span className="text-2xl shrink-0" aria-hidden="true">📚</span>
                <div className="text-sm text-amber-900 leading-relaxed">
                  <strong className="font-bold">À prendre avec précaution.</strong> Ce symbole apparaît dans un mémo de la <em>FBI Cyber Division (2007)</em> sur les logos utilisés par certains pédocriminels. <strong>L&apos;usage est à plus de 99 % innocent</strong> et n&apos;a aucune valeur diagnostique seul. Il ne devient un signal qu&apos;associé à un contexte préoccupant (pseudo adulte ciblant des mineurs, demandes d&apos;images, etc.).
                </div>
              </div>
            )}

            {/* Signification section */}
            <div className="mb-10 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 p-6 rounded-2xl border border-indigo-100 shadow-sm">
              <h2 className="text-2xl font-black mb-4 text-indigo-900 flex items-center">
                <span className="text-xl bg-indigo-100 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">💡</span>
                Signification
              </h2>
              <p className="text-gray-800 leading-relaxed text-lg">{emoji.signification}</p>
            </div>
            
            {/* Examples section */}
            {emoji.exemples.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-black mb-4 text-indigo-900 flex items-center">
                  <span className="text-xl bg-rose-100 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">💬</span>
                  Exemples d&apos;utilisation
                </h2>
                <ul className="space-y-4">
                  {emoji.exemples.map((exemple, index) => {
                    const normalizedEmoji = normalizeEmoji(emoji.emoji);
                    // Afficher l'exemple tel quel, sans transformation
                    return (
                      <li key={index} className="bg-gradient-to-r from-rose-50/70 to-amber-50/70 p-5 rounded-xl border border-rose-100 shadow-sm flex items-start transform hover:scale-102 transition-transform cursor-pointer">
                        <span className="text-xl mr-3 text-rose-500 shrink-0">{normalizedEmoji}</span>
                        <span className="text-gray-800 font-medium">{exemple}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            
            {/* Call to action */}
            <div className="pt-6 mt-10 border-t border-indigo-100">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-black mb-3 flex items-center">
                    <span className="text-2xl mr-2">✨</span>
                    Vous avez une autre définition ?
                  </h3>
                  <p className="mb-6 text-indigo-100 leading-relaxed">
                    Aidez-nous à enrichir notre dictionnaire d&apos;emojis en proposant votre définition. Votre contribution aide toute la communauté !
                  </p>
                  <Link 
                    href={`/proposer?emoji=${encodeURIComponent(emoji.emoji)}`}
                    className="bg-gradient-to-r from-amber-400 to-rose-400 text-white px-6 py-3 rounded-full inline-block hover:from-amber-500 hover:to-rose-500 transition-all shadow-md font-bold hover:shadow-lg hover:scale-105 transform"
                  >
                    Proposer une définition
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Share button */}
          <div className="max-w-2xl mx-auto mt-8 flex justify-center mb-4">
            <ShareButton />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
