'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };
  
  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
      <div className="group relative">
        {/* Subtle glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-500 rounded-full opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex flex-col sm:flex-row items-stretch border-2 border-transparent rounded-full overflow-hidden shadow-lg bg-white w-full">
          <div className="pl-6 text-xl text-indigo-500 flex items-center justify-center">
            <span className="animate-pulse">🔍</span>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un emoji ou une signification..."
            className="flex-grow p-4 outline-none text-lg bg-transparent min-w-0 w-full"
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 px-8 font-bold hover:from-indigo-600 hover:to-purple-700 transition-all w-full sm:w-auto"
          >
            Rechercher
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <p className="text-sm text-gray-500 mr-2">
          Suggestions :
        </p>
        {['🍑', '💦', '👉👈', '🧢'].map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => setQuery(emoji)}
            className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full text-sm hover:from-indigo-100 hover:to-purple-100 transition-colors border border-indigo-100"
          >
            {emoji}
          </button>
        ))}
      </div>
    </form>
  );
}
