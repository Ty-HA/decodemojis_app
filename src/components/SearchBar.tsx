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
    <form onSubmit={handleSearch} className="w-full max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row items-stretch w-full gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
