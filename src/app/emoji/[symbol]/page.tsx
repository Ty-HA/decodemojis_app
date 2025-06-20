import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  getAllEmojis, 
  getEmojiBySymbol, 
  decodeEmojiFromUrl, 
  encodeEmojiForUrl,
  normalizeEmojisInText,
  normalizeEmoji
} from '@/utils/emoji-utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface EmojiDetailPageProps {
  params: { symbol: string };
}

export async function generateStaticParams() {
  const emojis = await getAllEmojis();
  return emojis.map((emoji) => ({
    symbol: encodeEmojiForUrl(emoji.emoji),
  }));
}

export default async function EmojiDetailPage({ params }: EmojiDetailPageProps) {
  // Await params before accessing its properties
  const symbolParam = await params.symbol;
  // Utiliser notre fonction spéciale de décodage pour les emojis composés
  const decodedSymbol = decodeEmojiFromUrl(symbolParam);
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
  
  return (
    <>
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
                <span className="text-9xl relative z-10 mb-6 inline-block transform hover:scale-125 transition-transform duration-500 hover:rotate-12">{emoji.emoji}</span>
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
                    // S'assurer que tous les emojis sont correctement normalisés
                    const normalizedEmoji = normalizeEmoji(emoji.emoji);
                    const normalizedExemple = normalizeEmojisInText(exemple);
                    
                    return (
                      <li key={index} className="bg-gradient-to-r from-rose-50/70 to-amber-50/70 p-5 rounded-xl border border-rose-100 shadow-sm flex items-start transform hover:scale-102 transition-transform cursor-pointer">
                        <span className="text-xl mr-3 text-rose-500 shrink-0">{normalizedEmoji}</span>
                        <span className="text-gray-800 font-medium">{normalizedExemple}</span>
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
          
          {/* Share buttons */}
          <div className="max-w-2xl mx-auto mt-8 flex justify-center gap-3">
            <button className="bg-indigo-100 text-indigo-700 p-3 rounded-full hover:bg-indigo-200 transition-colors">
              <span className="text-lg">🔄</span>
            </button>
            <button className="bg-indigo-100 text-indigo-700 p-3 rounded-full hover:bg-indigo-200 transition-colors">
              <span className="text-lg">💌</span>
            </button>
            <button className="bg-indigo-100 text-indigo-700 p-3 rounded-full hover:bg-indigo-200 transition-colors">
              <span className="text-lg">📋</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
