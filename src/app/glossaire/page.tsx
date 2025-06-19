import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllEmojis } from '@/utils/emoji-utils';
import Link from 'next/link';
import { Emoji } from '@/types';

export default async function Glossaire() {
  const emojis = await getAllEmojis();
  
  // Regrouper les emojis par première lettre de leur signification
  const emojisByFirstLetter: Record<string, Emoji[]> = {};
  
  emojis.forEach(emoji => {
    const firstLetter = emoji.signification.trim().charAt(0).toUpperCase();
    if (!emojisByFirstLetter[firstLetter]) {
      emojisByFirstLetter[firstLetter] = [];
    }
    emojisByFirstLetter[firstLetter].push(emoji);
  });
  
  // Créer un tableau de lettres triées
  const sortedLetters = Object.keys(emojisByFirstLetter).sort();
  
  // Générer des couleurs pour chaque lettre
  const getColorClass = (index: number) => {
    const colorClasses = [
      'from-indigo-400 to-purple-400 text-white',
      'from-rose-400 to-pink-400 text-white',
      'from-amber-400 to-orange-400 text-white',
      'from-emerald-400 to-teal-400 text-white',
      'from-blue-400 to-indigo-400 text-white',
      'from-purple-400 to-indigo-400 text-white'
    ];
    return colorClasses[index % colorClasses.length];
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero section with animated background */}
        <div className="relative overflow-hidden mb-12">
          <div className="absolute -z-10 top-10 left-1/4 w-96 h-96 bg-indigo-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -z-10 -bottom-10 right-1/3 w-80 h-80 bg-rose-300 rounded-full opacity-20 blur-3xl"></div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Glossaire des <span className="text-amber-500">Emojis</span>
          </h1>
          
          <div className="mx-auto w-32 h-1.5 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full mb-8"></div>
          
          <div className="mb-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 p-8 rounded-3xl shadow-md max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl animated-emojis">✨</span>
              <span className="text-3xl mx-2 animated-emojis delay-300">📖</span>
              <span className="text-3xl animated-emojis delay-600">🔍</span>
            </div>
            <p className="text-xl text-center text-gray-700 font-medium">
              Parcourez notre catalogue complet d&apos;emojis et <span className="text-purple-600">découvrez</span> leurs significations <span className="text-rose-500">cachées</span>.
            </p>
          </div>
        </div>
        
        {/* Index alphabétique */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sticky top-0 bg-white/80 py-5 z-10 backdrop-blur-md rounded-xl shadow-lg">
          {sortedLetters.map((letter, index) => (
            <a 
              key={letter} 
              href={`#letter-${letter}`}
              className={`w-12 h-12 flex items-center justify-center bg-gradient-to-br ${getColorClass(index)} rounded-full font-bold shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300`}
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Sections par lettre */}
        {sortedLetters.map((letter, letterIndex) => (
          <section 
            key={letter} 
            id={`letter-${letter}`} 
            className="mb-16 relative"
          >
            {/* Background stripes alternating for visual interest */}
            {letterIndex % 2 === 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-transparent -z-10 rounded-2xl"></div>
            )}
            {letterIndex % 2 !== 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 to-transparent -z-10 rounded-2xl"></div>
            )}
            
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 flex items-center justify-center bg-gradient-to-br ${getColorClass(letterIndex)} rounded-lg shadow-md mr-4`}>
                  <span className="text-2xl font-black">{letter}</span>
                </div>
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                  Emojis commençant par &quot;{letter}&quot;
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {emojisByFirstLetter[letter].map((emoji) => (
                  <Link 
                    key={emoji.emoji}
                    href={`/emoji/${encodeURIComponent(emoji.emoji)}`}
                    className="group flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                  >
                    <div className="relative mr-4 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative text-5xl group-hover:scale-110 transform transition-transform duration-300">{emoji.emoji}</span>
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold line-clamp-1 text-gray-900">{emoji.signification}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {emoji.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium border border-indigo-100">
                            {tag}
                          </span>
                        ))}
                        {emoji.tags.length > 2 && (
                          <span className="text-xs bg-gray-50 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                            +{emoji.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
        
        {/* Back to top button */}
        <div className="fixed bottom-8 right-8 z-50">
          <a 
            href="#" 
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg text-white hover:shadow-xl hover:scale-110 transition-all duration-300"
            title="Retour en haut"
          >
            <span>↑</span>
          </a>
        </div>
        
      </main>
      <Footer />
    </>
  );
}
