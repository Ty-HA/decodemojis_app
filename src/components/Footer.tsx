"use client";

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative">
      {/* Main footer content */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white pt-12 pb-6 rounded-t-3xl md:rounded-t-[2.5rem]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12">
            {/* Logo & description */}
            <div className="mb-8 md:mb-0 md:w-1/3">
              <Link href="/" className="flex items-center group mb-4">
                <span className="relative">
                  <span className="absolute inset-0 rounded-full bg-amber-400 blur-md opacity-70 group-hover:opacity-100 transition-opacity"></span>
                  <span className="relative text-3xl mr-2">💬</span>
                </span>
                <span className="font-black text-xl tracking-tight">
                  Decod<span className="text-amber-400">Emojis</span>
                </span>
              </Link>
              <p className="text-indigo-100 mb-6 max-w-sm">
                Le dictionnaire évolutif et collaboratif pour déchiffrer les emojis et leurs significations cachées
              </p>
              <div className="flex space-x-3">
                <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <span role="img" aria-label="twitter">🐦</span>
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <span role="img" aria-label="instagram">📸</span>
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                  <span role="img" aria-label="github">🐙</span>
                </a>
              </div>
            </div>
            
            {/* Links grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-8 text-sm md:w-2/3">
              <div>
                <h3 className="font-bold text-amber-400 uppercase tracking-wider mb-4">Navigation</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-indigo-200 hover:text-white transition-colors hover:underline">
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <Link href="/glossaire" className="text-indigo-200 hover:text-white transition-colors hover:underline">
                      Glossaire
                    </Link>
                  </li>
                  <li>
                    <Link href="/search" className="text-indigo-200 hover:text-white transition-colors hover:underline">
                      Recherche
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-rose-400 uppercase tracking-wider mb-4">Participer</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/proposer" className="text-indigo-200 hover:text-white transition-colors hover:underline">
                      Proposer un emoji
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-indigo-200 hover:text-white transition-colors hover:underline">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-purple-400 uppercase tracking-wider mb-4">Légal</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/mentions-legales" className="text-indigo-200 hover:text-white transition-colors hover:underline">
                      Mentions légales
                    </Link>
                  </li>
                  <li>
                    <Link href="/cgu" className="text-indigo-200 hover:text-white transition-colors hover:underline">
                      CGU
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Bottom copyright */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-indigo-200">
              &copy; {currentYear} DecodEmojis - Un dictionnaire collaboratif d&apos;emojis
            </p>
            <p className="text-sm text-indigo-300 mt-3 md:mt-0">
              Fait avec 💜 pour aider à comprendre les emojis
            </p>
          </div>
        </div>
      </div>
      
      
    </footer>
  );
}
