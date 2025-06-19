'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="relative bg-gradient-to-r from-indigo-600 via-purple-500 to-rose-500 text-white shadow-xl hidden md:block">
      {/* Sparkle effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-5 left-10 w-4 h-4 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-10 right-20 w-3 h-3 bg-yellow-300 rounded-full opacity-70 animate-pulse delay-150"></div>
        <div className="absolute bottom-4 left-36 w-2 h-2 bg-rose-300 rounded-full opacity-70 animate-pulse delay-300"></div>
        <div className="absolute top-12 left-1/2 w-3 h-3 bg-indigo-300 rounded-full opacity-70 animate-pulse delay-500"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="group text-2xl font-bold flex items-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-yellow-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative text-3xl mr-2 animate-bounce">�</span>
            </div>
            <span className="relative">
              <span className="font-black tracking-tight">Decod</span><span className="text-yellow-300 font-black">Emojis</span>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-yellow-300 to-rose-300 transition-all duration-300 mt-0.5 rounded-full"></div>
            </span>
          </Link>
          <nav>
            <ul className="flex space-x-1 sm:space-x-4">
              <li>
                <Link href="/" className="px-3 py-2 rounded-full hover:bg-white/20 transition-all flex items-center font-medium">
                  <span className="hidden sm:inline">Accueil</span>
                  <span className="sm:hidden">🏠</span>
                </Link>
              </li>
              <li>
                <Link href="/glossaire" className="px-3 py-2 rounded-full hover:bg-white/20 transition-all flex items-center font-medium">
                  <span className="hidden sm:inline">Emojis</span>
                  <span className="sm:hidden">📖</span>
                </Link>
              </li>
              <li>
                <Link href="/glossaire-argot" className="px-3 py-2 rounded-full hover:bg-white/20 transition-all flex items-center font-medium">
                  <span className="hidden sm:inline">Argot</span>
                  <span className="sm:hidden">�️</span>
                </Link>
              </li>
              <li>
                <Link href="/proposer" className="bg-amber-400 text-indigo-900 px-3 py-2 rounded-full hover:bg-amber-300 hover:scale-105 transition-all flex items-center font-bold shadow-md">
                  <span className="hidden sm:inline">Proposer</span>
                  <span className="sm:hidden">✏️</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="px-3 py-2 rounded-full hover:bg-white/20 transition-all flex items-center font-medium">
                  <span className="hidden sm:inline">Contact</span>
                  <span className="sm:hidden">📧</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
