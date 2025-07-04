'use client';

import Link from 'next/link';
import { Emoji } from '@/types';
import { encodeEmojiForUrl, normalizeEmoji } from '@/utils/emoji-utils';

interface EmojiCardProps {
  emoji: Emoji;
}

export default function EmojiCard({ emoji }: EmojiCardProps) {
  // Génère une couleur de fond aléatoire pastel à partir de l'emoji
  const getRandomGradient = () => {
    const gradients = [
      'from-rose-100 to-indigo-100',
      'from-amber-100 to-rose-100',
      'from-indigo-100 to-emerald-100',
      'from-purple-100 to-amber-100',
      'from-rose-100 to-teal-100',
      'from-amber-100 to-violet-100'
    ];
    // Utiliser le code du premier caractère de l'emoji comme seed pour la sélection
    const codePoint = emoji.emoji.codePointAt(0);
    const index = codePoint ? codePoint % gradients.length : 0;
    return gradients[index];
  };
  
  return (
    <Link 
      href={`/emoji/${encodeEmojiForUrl(emoji.emoji)}`}
      className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-1 sm:p-2 border border-transparent hover:border-indigo-200 hover:-translate-y-1 active:scale-97 duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400 animate-floating h-full"
    >
      {/* Card content */}
      <div className="bg-gradient-to-br rounded-xl p-2 sm:p-3 h-full flex flex-col min-h-[220px] justify-between">
        {/* Emoji display */}
        <div className="relative flex justify-center items-center mb-1 py-1">
          {/* Background circle */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getRandomGradient()} opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md`}></div>
          
          {/* Emoji normalisé pour éviter les problèmes d'affichage */}
          <span className="text-3xl group-hover:scale-110 transform transition-transform duration-500 relative z-10 select-none" style={{ fontFamily: `'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji','sans-serif'` }}>
            {normalizeEmoji(emoji.emoji)}
          </span>
        </div>
        
        {/* Signification */}
        <p className="text-gray-800 font-normal line-clamp-3 text-center mb-1 flex-grow text-xs sm:text-sm leading-tight">
          {emoji.signification}
        </p>
        {/* PT/MT padding top au-dessus des labels */}
        <div className="flex justify-center pt-2 mb-0.5 min-h-[18px]">
          {/* Espace réservé pour harmoniser l'alignement des labels */}
        </div>
        {/* Tags */}
        <div className="mt-auto flex flex-wrap justify-center gap-0.5">
          {emoji.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 px-2 py-1 rounded-xl font-medium border border-indigo-100 group-hover:bg-gradient-to-r group-hover:from-indigo-600/20 group-hover:to-purple-600/20 transition-colors"
            >
              {tag}
            </span>
          ))}
          {emoji.tags.length > 2 && (
            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium border border-gray-200">
              +{emoji.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
