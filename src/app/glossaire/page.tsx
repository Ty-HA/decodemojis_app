import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllEmojis } from '@/utils/emoji-utils';
import Link from 'next/link';
import { Emoji } from '@/types';

export default async function Glossaire() {
  const emojis = await getAllEmojis();
  
  // Regrouper les emojis par catégories basées sur les tags
  const emojisByCategory: Record<string, Emoji[]> = {
    "sexualité": [],
    "racisme": [],
    "insultes": [],
    "flirt": [],
    "incel": [],
    "masculinisme": [], 
    "cyberharcèlement": [],
    "drogue": [],
    "danger": [],
    "scarification": [],
    "populaire": [],
    "ambiguïté": [],
    "communication": [],
    "émotions": [],
    "compliment": [],
    "autres": []
  };
  
  emojis.forEach(emoji => {
    let categorized = false;
    
    if (emoji.tags && emoji.tags.length > 0) {
      for (const tag of emoji.tags) {
        if (emojisByCategory[tag]) {
          emojisByCategory[tag].push(emoji);
          categorized = true;
          break; // Assigner à la première catégorie trouvée
        }
      }
    }
    
    // Si aucune catégorie correspondante n'est trouvée, mettre dans "autres"
    if (!categorized) {
      emojisByCategory["autres"].push(emoji);
    }
  });
  
  // Supprimer les catégories vides
  Object.keys(emojisByCategory).forEach(category => {
    if (emojisByCategory[category].length === 0) {
      delete emojisByCategory[category];
    }
  });
  
  // Trier les catégories
  const sortedCategories = Object.keys(emojisByCategory);
  
  // Couleurs et icônes pour chaque catégorie
  const categoryConfig: Record<string, {color: string, icon: string}> = {
    "sexualité": {color: "from-rose-400 to-pink-400", icon: "💋"},
    "racisme": {color: "from-red-500 to-red-700", icon: "⚠️"},
    "insultes": {color: "from-orange-400 to-red-400", icon: "🗯️"},
    "flirt": {color: "from-pink-400 to-purple-400", icon: "💘"},
    "incel": {color: "from-red-600 to-purple-800", icon: "🔴"},
    "masculinisme": {color: "from-blue-700 to-cyan-800", icon: "♂️"},
    "cyberharcèlement": {color: "from-purple-500 to-red-500", icon: "🔗"},
    "drogue": {color: "from-emerald-500 to-green-700", icon: "💊"},
    "danger": {color: "from-red-400 to-orange-400", icon: "⚠️"},
    "scarification": {color: "from-violet-400 to-purple-600", icon: "|||"},
    "populaire": {color: "from-amber-400 to-yellow-400", icon: "🔥"},
    "ambiguïté": {color: "from-purple-400 to-indigo-400", icon: "🤔"},
    "communication": {color: "from-blue-400 to-cyan-400", icon: "💬"},
    "émotions": {color: "from-yellow-400 to-amber-400", icon: "😊"},
    "compliment": {color: "from-emerald-400 to-teal-400", icon: "👏"},
    "autres": {color: "from-slate-400 to-gray-400", icon: "📌"}
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
              <span className="text-3xl mx-2 animated-emojis delay-300">🏷️</span>
              <span className="text-3xl animated-emojis delay-600">🔍</span>
            </div>
            <p className="text-xl text-center text-gray-700 font-medium">
              Parcourez notre catalogue d&apos;emojis classés par <span className="text-purple-600">catégories</span> pour découvrir leurs significations <span className="text-rose-500">cachées</span>.
            </p>
          </div>
          
          {/* Onglet pour le glossaire alphabétique 
          <div className="flex justify-center mb-8">
            <Link 
              href="/glossaire-alphabetique" 
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
            >
              <span>Voir le glossaire alphabétique</span> 
              <span className="text-xl">📚</span>
            </Link>
          </div>
          */}
        
        </div>
        
        {/* Index des catégories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sticky top-0 bg-white/80 py-5 z-10 backdrop-blur-md rounded-xl shadow-lg">
          {sortedCategories.map((category) => (
            <a 
              key={category} 
              href={`#category-${category}`}
              className={`flex items-center gap-1.5 px-4 py-2 bg-gradient-to-br ${categoryConfig[category].color} text-white rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}
            >
              <span>{categoryConfig[category].icon}</span>
              <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </a>
          ))}
        </div>

        {/* Sections par catégorie */}
        {sortedCategories.map((category, categoryIndex) => (
          <section 
            key={category} 
            id={`category-${category}`} 
            className="mb-16 relative scroll-mt-28" // Ajout scroll-mt pour ancrage correct
          >
            {/* Background stripes alternating for visual interest */}
            {categoryIndex % 2 === 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-transparent -z-10 rounded-2xl"></div>
            )}
            {categoryIndex % 2 !== 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 to-transparent -z-10 rounded-2xl"></div>
            )}
            
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 flex items-center justify-center bg-gradient-to-br ${categoryConfig[category].color} text-white rounded-lg shadow-md mr-4`}>
                  <span className="text-2xl">{categoryConfig[category].icon}</span>
                </div>
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {emojisByCategory[category].map((emoji) => (
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
                        {emoji.tags && emoji.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs md:text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full font-medium border border-indigo-100 md:border block md:inline-block">
                            {tag}
                          </span>
                        ))}
                        {emoji.tags && emoji.tags.length > 2 && (
                          <span className="text-xs md:text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full md:border block md:inline-block">
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
        
        {/* Button to scroll back to top */}
        <div className="fixed bottom-24 md:bottom-6 right-6">
          <a 
            href="#top" 
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            aria-label="Retour en haut"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
