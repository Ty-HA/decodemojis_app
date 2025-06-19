import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Fonction pour récupérer les argots
async function getArgots() {
  try {
    // Essayer de récupérer les argots depuis le fichier JSON
    const url = new URL('/argots.json', process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_BASE_URL || 'https://decodemojis.fr');
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 } // Mettre en cache pendant 1 heure
    });
    
    if (!res.ok) {
      throw new Error(`Erreur lors du chargement des argots: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Erreur lors du chargement des argots:', error);
    return [];
  }
}

export default async function GlossaireArgot() {
  const argots = await getArgots();
  
  // Regrouper les argots par première lettre
  // Type pour les argots
  interface Argot {
    mot: string;
    signification?: string;
    definition?: string;
    exemples?: string[];
    exemple?: string;
    categorie?: string;
  }
  
  const argotsByFirstLetter: Record<string, Argot[]> = {};
  
  argots.forEach((argot: Argot) => {
    const firstLetter = argot.mot ? argot.mot.trim().charAt(0).toUpperCase() : 'A';
    if (!argotsByFirstLetter[firstLetter]) {
      argotsByFirstLetter[firstLetter] = [];
    }
    argotsByFirstLetter[firstLetter].push(argot);
  });
  
  // Créer un tableau de lettres triées
  const sortedLetters = Object.keys(argotsByFirstLetter).sort();
  
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
          <div className="absolute -z-10 top-10 left-1/4 w-96 h-96 bg-amber-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -z-10 -bottom-10 right-1/3 w-80 h-80 bg-emerald-300 rounded-full opacity-20 blur-3xl"></div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-center bg-gradient-to-r from-amber-500 to-emerald-500 text-transparent bg-clip-text">
            Glossaire de l&apos;<span className="text-indigo-500">Argot</span>
          </h1>
          
          <div className="mx-auto w-32 h-1.5 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full mb-8"></div>
          
          <div className="mb-10 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 p-8 rounded-3xl shadow-md max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl animated-emojis">✨</span>
              <span className="text-3xl mx-2 animated-emojis delay-300">🗣️</span>
              <span className="text-3xl animated-emojis delay-600">📝</span>
            </div>
            <p className="text-xl text-center text-gray-700 font-medium">
              Découvrez le <span className="text-amber-600">vocabulaire</span> de la rue et son <span className="text-emerald-500">évolution</span> constante.
            </p>
          </div>
          
          {/* Onglet pour le glossaire par catégories */}
          <div className="flex justify-center mb-8">
            <Link 
              href="/glossaire-argot-categories" 
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
            >
              <span>Voir le glossaire par catégories</span> 
              <span className="text-xl">🏷️</span>
            </Link>
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
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-transparent -z-10 rounded-2xl"></div>
            )}
            {letterIndex % 2 !== 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-transparent -z-10 rounded-2xl"></div>
            )}
            
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 flex items-center justify-center bg-gradient-to-br ${getColorClass(letterIndex)} rounded-lg shadow-md mr-4`}>
                  <span className="text-2xl font-black">{letter}</span>
                </div>
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                  Argot commençant par &quot;{letter}&quot;
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {argotsByFirstLetter[letter].map((argot) => (
                  <div 
                    key={argot.mot}
                    className="group flex flex-col p-5 bg-white rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-xl font-bold text-gray-900 mr-2">{argot.mot}</span>
                      {argot.categorie && (
                        <span className="px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 rounded-full border border-amber-100">
                          {argot.categorie}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mb-3">{argot.signification || argot.definition}</p>
                    
                    {argot.exemples && argot.exemples.length > 0 && (
                      <div className="mt-auto">
                        <h4 className="text-xs uppercase tracking-wide text-gray-500 font-bold mb-1">Exemple:</h4>
                        <p className="text-sm text-gray-600 italic">&quot;{argot.exemples[0]}&quot;</p>
                      </div>
                    )}
                    {argot.exemple && (
                      <div className="mt-auto">
                        <h4 className="text-xs uppercase tracking-wide text-gray-500 font-bold mb-1">Exemple:</h4>
                        <p className="text-sm text-gray-600 italic">&quot;{argot.exemple}&quot;</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
        
        {/* Button to scroll back to top */}
        <div className="fixed bottom-24 md:bottom-6 right-6">
          <a 
            href="#top" 
            className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
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
