import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';

export const metadata: Metadata = {
  title: "Rechercher un emoji",
  description:
    "Recherchez la signification d'un emoji par symbole, mot-clé ou tag dans le dictionnaire DecodEmojis.",
  alternates: { canonical: '/search' },
  robots: { index: true, follow: true },
};
import EmojiGrid from '@/components/EmojiGrid';
import { getAllEmojis, searchEmojis } from '@/utils/emoji-utils';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q || '';
  const allEmojis = await getAllEmojis();
  const results = searchEmojis(allEmojis, query);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-6 text-center">Résultats de recherche</h1>
          <div className="mb-8 max-w-xl mx-auto">
            <SearchBar />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {query.trim() ? (
                <>
                  <span className="font-semibold text-blue-600">{results.length}</span> résultat{results.length !== 1 ? 's' : ''} pour &quot;<span className="italic">{query}</span>&quot;
                </>
              ) : (
                <>
                  <span className="font-semibold text-blue-600">{allEmojis.length}</span> emojis enregistrés
                </>
              )}
            </p>
            
            <Link href="/glossaire" className="text-blue-600 hover:text-blue-800 flex items-center">
              <span className="mr-1">📖</span> Consulter le glossaire
            </Link>
          </div>
          
          <Suspense fallback={
            <div className="flex justify-center items-center h-40">
              <div className="animate-pulse flex items-center">
                <div className="h-16 w-16 bg-blue-100 rounded-full"></div>
                <div className="ml-4">
                  <div className="h-4 w-36 bg-blue-100 rounded"></div>
                  <div className="h-4 w-24 bg-blue-100 rounded mt-2"></div>
                </div>
              </div>
            </div>
          }>
            {results.length > 0 ? (
              <EmojiGrid emojis={results} />
            ) : (
              <div className="text-center py-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-4xl mb-4">😕</p>
                <h2 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h2>
                <p className="mb-4 text-gray-600 max-w-md mx-auto">
                  Nous n&apos;avons pas trouvé d&apos;emoji correspondant à votre recherche.
                </p>
                <Link 
                  href="/proposer" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                >
                  Proposer un nouvel emoji
                </Link>
              </div>
            )}
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
