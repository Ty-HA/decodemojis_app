import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import EmojiGrid from '@/components/EmojiGrid';
import { getAllEmojis, sortEmojisByDate } from '@/utils/emoji-utils';
import HeroSection from '@/components/HeroSection';
import EmojiHeader from '@/components/EmojiHeader';

const LATEST_REVISION = '2026-05-04';

export default async function Home() {
  const emojis = await getAllEmojis();
  const recentEmojis = sortEmojisByDate(emojis).slice(0, 10);
  const recentlyAddedCount = emojis.filter((e) => e.date_ajout >= '2026-05-01').length;
  const formattedRevision = new Date(LATEST_REVISION).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <EmojiHeader />
      <Header />
      <main className="container mx-auto px-0 md:px-4 ">
        <HeroSection />

        {/* News / "Nouveau" banner */}
        <section
          aria-labelledby="news-heading"
          className="mb-8 mt-4 mx-2 md:mx-0 rounded-3xl overflow-hidden shadow-lg border border-white/40 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-indigo-50" aria-hidden="true" />
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-60" aria-hidden="true" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-50" aria-hidden="true" />

          <div className="relative p-5 md:p-7 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  🆕 Nouveau
                </span>
                <time
                  dateTime={LATEST_REVISION}
                  className="text-xs text-indigo-700 font-semibold bg-white/70 px-3 py-1 rounded-full"
                >
                  Mise à jour du {formattedRevision}
                </time>
              </div>
              <h2 id="news-heading" className="text-lg md:text-2xl font-black text-indigo-900 mb-2 leading-snug">
                +{recentlyAddedCount} nouvelles définitions et une page Ressources officielle
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Drogues (codes DEA), codes manosphère / incel, brainrot Gen Alpha,
                symboles d&apos;extrémisme (sources ADL), réseau FBI 764, soumission
                chimique. Une <Link href="/ressources" className="font-bold text-indigo-700 underline decoration-indigo-300 hover:decoration-indigo-700">page Ressources</Link>{' '}
                centralise désormais les numéros d&apos;urgence (3018, 119, 3114), les
                outils de signalement (Pharos) et toutes les sources documentaires.
              </p>
            </div>
            <div className="flex flex-row md:flex-col gap-2 md:shrink-0">
              <Link
                href="/glossaire"
                className="text-center bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-full hover:bg-indigo-700 transition-colors shadow-md text-sm"
              >
                Voir le glossaire
              </Link>
              <Link
                href="/ressources"
                className="text-center bg-white text-indigo-700 font-bold px-5 py-2.5 rounded-full border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-colors shadow-sm text-sm"
              >
                Page Ressources
              </Link>
            </div>
          </div>
        </section>

        {/* Recently added emojis with improved styling */}
        <section className="mb-8 relative mt-8">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-rose-50 rounded-3xl -z-10"></div>
          <div className="p-8 md:p-10 rounded-3xl">
            <h2 className="text-xl md:text-3xl font-black text-indigo-900 mb-8 flex items-center">
              <span className="inline-block animate-bounce-short mr-2">🆕</span> Emojis récemment ajoutés
            </h2>
            <EmojiGrid emojis={recentEmojis} />
            <div className="flex justify-center mt-8">
              <Link href="/glossaire" 
                className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium bg-white/50 px-6 py-3 rounded-full hover:bg-white/80 transition-all shadow-md">
                Voir tous <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Why section with vibrant styling */}
        <section className="mb-8 bg-gradient-to-br from-purple-900 to-indigo-800 p-10 rounded-3xl shadow-xl text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 opacity-10">
            <div className="text-9xl">😀</div>
          </div>
          <div className="absolute bottom-0 left-0 opacity-10">
            <div className="text-9xl">💬</div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-black mb-6 flex items-center">
                <span className="text-amber-400 mr-3">🤔</span> Pourquoi ce dictionnaire ?
              </h2>
              <p className="mb-6 leading-relaxed text-lg text-purple-100">
                Les emojis ont évolué au-delà de simples émoticônes pour devenir un langage codé que les jeunes utilisent quotidiennement.
                Certains emojis ont des <span className="font-bold text-amber-300">significations cachées</span> qui peuvent échapper aux parents et éducateurs.
              </p>
              <p className="leading-relaxed text-lg text-purple-100">
                DecodEmojis est un outil collaboratif pour aider à comprendre ce langage et favoriser une communication
                intergénérationnelle saine. Contribuez en partageant votre connaissance des emojis !
              </p>
              <div className="mt-8">
                <Link href="/proposer" 
                  className="inline-flex items-center px-6 py-3 bg-amber-400 text-purple-900 rounded-full font-bold hover:bg-amber-300 transition-colors shadow-lg hover:shadow-amber-400/30">
                  Participer maintenant <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center items-center">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-xs sm:max-w-sm">
                <div className="bg-white/10 rounded-2xl flex items-center justify-center aspect-square min-h-[64px] sm:min-h-[96px] text-4xl sm:text-7xl hover:scale-110 transition-transform duration-300 cursor-pointer animate-floating">🍑</div>
                <div className="bg-white/10 rounded-2xl flex items-center justify-center aspect-square min-h-[64px] sm:min-h-[96px] text-4xl sm:text-7xl hover:scale-110 transition-transform duration-300 cursor-pointer animate-floating-delay">💦</div>
                <div className="bg-white/10 rounded-2xl flex items-center justify-center aspect-square min-h-[64px] sm:min-h-[96px] text-4xl sm:text-7xl hover:scale-110 transition-transform duration-300 cursor-pointer animate-floating-delay-2">👉👈</div>
                <div className="bg-white/10 rounded-2xl flex items-center justify-center aspect-square min-h-[64px] sm:min-h-[96px] text-4xl sm:text-7xl hover:scale-110 transition-transform duration-300 cursor-pointer animate-floating-delay-3">🧢</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
