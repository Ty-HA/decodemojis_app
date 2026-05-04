import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Argot des jeunes par catégories",
  description:
    "Mots et expressions de l'argot des jeunes regroupés par thématiques pour mieux comprendre le langage ado.",
  alternates: { canonical: '/glossaire-argot-categories' },
  openGraph: {
    title: "Argot des jeunes par catégories | DecodEmojis",
    description: "L'argot des jeunes classé par catégories thématiques.",
    url: '/glossaire-argot-categories',
    type: 'website',
  },
};

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

export default async function GlossaireArgotCategories() {
  const argots = await getArgots();
  
  // Type pour les argots
  interface Argot {
    mot: string;
    signification?: string;
    definition?: string;
    exemples?: string[];
    exemple?: string;
    categorie?: string;
  }
  
  // Regrouper les argots par catégories
  const argotsByCategory: Record<string, Argot[]> = {
    "Incel": [],
    "Cyberharcèlement": [],
    "Internet": [],
    "Drogue": [],
    "Communication": [],
    "Santé mentale": [],
    "Code": [],
    "Argent": [],
    "Identité": [],
    "Personnes": [],
    "Actions": [],
    "Famille": [],
    "Sentiments": [],
    "Comportement": [],
    "Transport": [],
    "Insultes": [],
    "Appréciation": [],
    "Autorité": [],
    "Autres": []
  };
  
  argots.forEach((argot: Argot) => {
    let categorized = false;
    
    if (argot.categorie) {
      // Si l'argot a une catégorie explicite, l'utiliser
      const category = argot.categorie.charAt(0).toUpperCase() + argot.categorie.slice(1);
      if (argotsByCategory[category]) {
        argotsByCategory[category].push(argot);
        categorized = true;
      }
    }
    
    // Catégorisation approximative basée sur des mots-clés dans la signification
    if (!categorized) {
      const signification = (argot.signification || argot.definition || "").toLowerCase();
      
      if (/incel|blackpill|redpill|chad|virgin|célibataire involontaire/.test(signification)) {
        argotsByCategory["Incel"].push(argot);
      } else if (/cyberharc|harcel|doxx|stalker|stalk|revenge porn|shark|catfish|grooming|prédateur/.test(signification)) {
        argotsByCategory["Cyberharcèlement"].push(argot);
      } else if (/internet|en ligne|forum|réseau social|ratio|normie/.test(signification)) {
        argotsByCategory["Internet"].push(argot);
      } else if (/drogue|cannabis|beuh|joint|bédave|coke|cocaïne|ecsta|trip|champignon|mdma|lsd|défoncé|hallucinog/.test(signification)) {
        argotsByCategory["Drogue"].push(argot);
      } else if (/dépression|santé mentale|scarification|automutilation|entaille|cicatrice|psychologique/.test(signification)) {
        argotsByCategory["Santé mentale"].push(argot);
      } else if (/code|symbole|point violet|signaler|alerte|message caché/.test(signification)) {
        argotsByCategory["Code"].push(argot);
      } else if (/argent|billet|fric|thune|euros?|payer|prix/.test(signification)) {
        argotsByCategory["Argent"].push(argot);
      } else if (/parler|dire|discuter|communication|chat|message/.test(signification)) {
        argotsByCategory["Communication"].push(argot);
      } else if (/nom|surnom|pseudo|identité/.test(signification)) {
        argotsByCategory["Identité"].push(argot);
      } else if (/personne|gens|mec|fille|meuf|gars|jeune|enfant|garçon/.test(signification)) {
        argotsByCategory["Personnes"].push(argot);
      } else if (/faire|action|prendre|voler|chourave|cramer/.test(signification)) {
        argotsByCategory["Actions"].push(argot);
      } else if (/mère|père|daron|daronne|parent|famille/.test(signification)) {
        argotsByCategory["Famille"].push(argot);
      } else if (/aimer|sentiment|kiff|content|heureux|triste|énerver/.test(signification)) {
        argotsByCategory["Sentiments"].push(argot);
      } else if (/plomb|comportement|attitude|réaction/.test(signification)) {
        argotsByCategory["Comportement"].push(argot);
      } else if (/voiture|véhicule|gova|transport|trajet/.test(signification)) {
        argotsByCategory["Transport"].push(argot);
      } else if (/insulte|naïf|ridicule|boloss/.test(signification)) {
        argotsByCategory["Insultes"].push(argot);
      } else if (/bien|cool|génial|super|top|béton/.test(signification)) {
        argotsByCategory["Appréciation"].push(argot);
      } else if (/police|flic|keuf|autorité|skeuf/.test(signification)) {
        argotsByCategory["Autorité"].push(argot);
      } else {
        argotsByCategory["Autres"].push(argot);
      }
    }
  });
  
  // Supprimer les catégories vides
  Object.keys(argotsByCategory).forEach(category => {
    if (argotsByCategory[category].length === 0) {
      delete argotsByCategory[category];
    }
  });
  
  // Trier les catégories
  const sortedCategories = Object.keys(argotsByCategory);
  
  // Couleurs et icônes pour chaque catégorie
  const categoryConfig: Record<string, {color: string, icon: string}> = {
    "Incel": {color: "from-red-600 to-purple-700", icon: "🔴"},
    "Cyberharcèlement": {color: "from-purple-500 to-red-500", icon: "🔗"},
    "Internet": {color: "from-blue-500 to-cyan-400", icon: "🌐"},
    "Drogue": {color: "from-emerald-500 to-green-600", icon: "�"},
    "Communication": {color: "from-blue-400 to-indigo-500", icon: "💬"},
    "Santé mentale": {color: "from-violet-400 to-purple-500", icon: "🧠"},
    "Code": {color: "from-cyan-500 to-blue-600", icon: "💻"},
    "Argent": {color: "from-green-400 to-emerald-500", icon: "💰"},
    "Identité": {color: "from-purple-400 to-indigo-500", icon: "🪪"},
    "Personnes": {color: "from-pink-400 to-rose-500", icon: "👥"},
    "Actions": {color: "from-amber-400 to-orange-500", icon: "🏃"},
    "Famille": {color: "from-rose-400 to-pink-500", icon: "👨‍👩‍👧‍👦"},
    "Sentiments": {color: "from-red-400 to-rose-500", icon: "❤️"},
    "Comportement": {color: "from-indigo-400 to-blue-500", icon: "🧠"},
    "Transport": {color: "from-sky-400 to-blue-500", icon: "🚗"},
    "Insultes": {color: "from-orange-400 to-red-500", icon: "🤬"},
    "Appréciation": {color: "from-yellow-400 to-amber-500", icon: "👍"},
    "Autorité": {color: "from-slate-500 to-gray-600", icon: "👮"},
    "Autres": {color: "from-gray-400 to-slate-500", icon: "📌"}
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
            L&apos;<span className="text-indigo-500">Argot</span> par Catégories
          </h1>
          
          <div className="mx-auto w-32 h-1.5 bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full mb-8"></div>
          
          <div className="mb-10 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 p-8 rounded-3xl shadow-md max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl animated-emojis">✨</span>
              <span className="text-3xl mx-2 animated-emojis delay-300">🗣️</span>
              <span className="text-3xl animated-emojis delay-600">🏷️</span>
            </div>
            <p className="text-xl text-center text-gray-700 font-medium">
              Explorez le <span className="text-amber-600">vocabulaire de la rue</span> organisé par <span className="text-emerald-500">thématiques</span>.
            </p>
          </div>
          
          {/* Onglet pour le glossaire alphabétique */}
          <div className="flex justify-center mb-8">
            <Link 
              href="/glossaire-argot" 
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2"
            >
              <span>Voir le glossaire alphabétique</span> 
              <span className="text-xl">📚</span>
            </Link>
          </div>
        </div>
        
        {/* Index des catégories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sticky top-0 bg-white/80 py-5 z-10 backdrop-blur-md rounded-xl shadow-lg">
          {sortedCategories.map((category) => (
            <a 
              key={category} 
              href={`#category-${category}`}
              className={`flex items-center gap-1.5 px-4 py-2 bg-gradient-to-br ${categoryConfig[category]?.color || 'from-gray-400 to-slate-500'} text-white rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}
            >
              <span>{categoryConfig[category]?.icon || '📌'}</span>
              <span>{category}</span>
            </a>
          ))}
        </div>

        {/* Sections par catégorie */}
        {sortedCategories.map((category, categoryIndex) => (
          <section 
            key={category} 
            id={`category-${category}`} 
            className="mb-16 relative"
          >
            {/* Background stripes alternating for visual interest */}
            {categoryIndex % 2 === 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-transparent -z-10 rounded-2xl"></div>
            )}
            {categoryIndex % 2 !== 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-transparent -z-10 rounded-2xl"></div>
            )}
            
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className={`w-14 h-14 flex items-center justify-center bg-gradient-to-br ${categoryConfig[category]?.color || 'from-gray-400 to-slate-500'} text-white rounded-lg shadow-md mr-4`}>
                  <span className="text-2xl">{categoryConfig[category]?.icon || '📌'}</span>
                </div>
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                  {category}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {argotsByCategory[category].map((argot) => (
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
