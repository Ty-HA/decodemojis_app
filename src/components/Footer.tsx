"use client";

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative mt-auto">
      {/* Decorative wave */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 -translate-y-1/2 transform wave-top"></div>
      
      {/* Main footer content */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white pt-12 pb-6">
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
              <p className="text-indigo-100 mb-6 max-w-md">
                Le dictionnaire évolutif et collaboratif pour déchiffrer les emojis et leurs significations cachées.
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
      
      <style jsx>{`
        .wave-top {
          -webkit-mask-image: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'%3E%3C/path%3E%3C/svg%3E");
          mask-image: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'%3E%3C/path%3E%3C/svg%3E");
          -webkit-mask-size: cover;
          mask-size: cover;
        }
      `}</style>
    </footer>
  );
}
