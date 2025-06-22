'use client';

import { Emoji } from '@/types';
import EmojiCard from './EmojiCard';

interface EmojiGridProps {
  emojis: Emoji[];
  title?: string;
}

export default function EmojiGrid({ emojis, title }: EmojiGridProps) {
  if (emojis.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun emoji trouvé</p>
      </div>
    );
  }

  return (
    <div className="my-6">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {emojis.map((emoji, idx) => (
          <EmojiCard key={emoji.emoji + '-' + idx} emoji={emoji} />
        ))}
      </div>
    </div>
  );
}
