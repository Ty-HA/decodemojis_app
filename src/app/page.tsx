import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import EmojiGrid from '@/components/EmojiGrid';
import { getAllEmojis, sortEmojisByDate } from '@/utils/emoji-utils';

export default async function Home() {
  const emojis = await getAllEmojis();
  const recentEmojis = sortEmojisByDate(emojis).slice(0, 10);
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with vibrant colors */}
        <section className="text-center mb-16 max-w-4xl mx-auto relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-400 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-16 w-64 h-64 bg-amber-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-40 left-20 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>
          
          {/* Content with improved typography */}
          <div className="mb-8 relative z-10">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 text-transparent bg-clip-text leading-tight">
              Decod<span className="text-amber-500">Emojis</span>
            </h1>
            <div className="mx-auto w-24 h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Le dictionnaire évolutif et collaboratif pour <span className="font-bold text-indigo-600">déchiffrer</span> les emojis 
              et leurs <span className="font-bold text-rose-600">significations cachées</span> 🔍
            </p>
          </div>
          
          <div className="my-8 relative z-10">
            <SearchBar />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8 relative z-10">
            <Link href="/glossaire" 
              className="flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-bold">
              <span className="text-xl mr-2">📖</span>
              <span>Consulter le glossaire</span>
            </Link>
            <Link href="/proposer" 
              className="flex items-center px-8 py-4 bg-gradient-to-br from-amber-400 to-rose-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-bold">
              <span className="text-xl mr-2">✨</span>
              <span>Proposer un emoji</span>
            </Link>
          </div>
        </section>
        
        {/* Recently added emojis with improved styling */}
        <section className="mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-rose-50 rounded-3xl -z-10"></div>
          <div className="p-8 md:p-10 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-indigo-900">
                <span className="inline-block animate-bounce-short mr-2">🆕</span> Emojis récemment ajoutés
              </h2>
              <Link href="/glossaire" 
                className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium bg-white/50 px-4 py-2 rounded-full hover:bg-white/80 transition-all">
                Voir tous <span className="ml-1">→</span>
              </Link>
            </div>
            <EmojiGrid emojis={recentEmojis} />
          </div>
        </section>
        
        {/* Why section with vibrant styling */}
        <section className="my-16 bg-gradient-to-br from-purple-900 to-indigo-800 p-10 rounded-3xl shadow-xl text-white relative overflow-hidden">
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
              <div className="grid grid-cols-2 gap-6 text-7xl">
                <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer animate-floating">🍑</div>
                <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer animate-floating-delay">💦</div>
                <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer animate-floating-delay-2">👉👈</div>
                <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer animate-floating-delay-3">🧢</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
