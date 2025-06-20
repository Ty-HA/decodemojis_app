"use client";

import Image from "next/image";
import Link from "next/link";


export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-rose-50 py-4 md:py-16 px-0 flex flex-col items-center justify-center overflow-hidden rounded-b-3xl md:rounded-b-[2.5rem]">
      <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 mx-auto px-4 md:px-12">
        {/* Texte à gauche, image à droite (image au-dessus sur mobile) */}
        <div className="flex-1 flex flex-col items-start justify-center w-full md:w-1/2 mt-0 md:mt-0">
          <h1 className="text-4xl md:text-6xl font-black mb-2 text-indigo-900 leading-tight text-left w-full">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 text-transparent bg-clip-text">Decod</span><span className="text-amber-500">Emojis</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-6 font-medium text-left w-full">
            Le dictionnaire participatif pour mieux comprendre le langage, les codes et les emojis de vos enfants (et des ados) en ligne.
          </p>
          {/* Boutons glossaire */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
            <Link href="/glossaire" className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-bold text-lg">
              <span className="text-xl mr-2">📖</span>
              Glossaire emojis
            </Link>
            <Link href="/glossaire-argot" className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-bold text-lg">
              <span className="text-xl mr-2">🗣️</span>
              Glossaire argots
            </Link>
          </div>
          {/* Barre de recherche responsive */}
          <form onSubmit={e => { e.preventDefault(); const q = e.currentTarget.query.value.trim(); if(q) window.location.href = `/search?q=${encodeURIComponent(q)}`; }} className="w-full max-w-lg">
            <div className="flex flex-col sm:flex-row items-stretch w-full gap-2">
              <input
                name="query"
                type="text"
                placeholder="Rechercher un emoji ou une signification..."
                className="flex-grow p-4 outline-none text-lg bg-white border border-indigo-200 rounded-xl min-w-0 w-full"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all w-full sm:w-auto"
              >
                Rechercher
              </button>
            </div>
          </form>
        </div>
        {/* Image à droite sur desktop, au-dessus sur mobile */}
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0 mt-4 md:mt-0">
          <Image src="/img/hero-img.png" alt="Statistiques cyberharcèlement" width={400} height={400} className="w-full max-w-xs md:max-w-md rounded-2xl shadow-lg object-contain" priority />
        </div>
      </div>
      {/* Texte informatif large, aéré sur mobile et desktop */}
      <div className="max-w-7xl w-full px-4 md:px-12 mx-auto mt-8">
        <div className="text-base md:text-lg text-gray-800 bg-white/80 rounded-2xl shadow p-6 md:p-10 text-justify space-y-4">
          <p>
            En 2024, <span className="font-bold text-rose-600">23&nbsp;%</span> des enfants âgés de 6 à 18 ans en France ont déjà été confrontés à une situation de cyberharcèlement. Ce chiffre est en nette augmentation par rapport à l’année précédente (<span className="font-bold text-indigo-600">18&nbsp;% en 2023</span>).
          </p>
          <p>
            Le phénomène concerne tous les âges scolaires mais touche particulièrement&nbsp;:<br />
            <span className="font-bold text-amber-600">20&nbsp;%</span> des enfants en primaire (contre 13&nbsp;% en 2023),<br />
            <span className="font-bold text-amber-600">22&nbsp;%</span> des collégiens (contre 19&nbsp;% en 2023),<br />
            <span className="font-bold text-amber-600">29&nbsp;%</span> des lycéens (contre 21&nbsp;% en 2023).
          </p>
          <p>
            Les <span className="font-bold text-rose-600">filles</span> sont davantage concernées que les garçons&nbsp;:
            <span className="font-bold"> 26&nbsp;%</span> des filles contre <span className="font-bold">20&nbsp;%</span> des garçons déclarent avoir été victimes de cyberharcèlement.
          </p>
          <p>
            Le phénomène est aggravé par une exposition précoce aux réseaux sociaux&nbsp;: dès le primaire,
            <span className="font-bold text-indigo-600"> 67&nbsp;%</span> des enfants sont inscrits sur au moins une plateforme sociale, alors que ces dernières sont en principe interdites aux moins de 13 ans.
          </p>
        </div>
      </div>
    </section>
  );
}
