import { Emoji } from '@/types';
import { loadEmojisData } from '@/data/emojisData';
import { staticEmojisData } from '@/data/staticEmojisData';

export async function getAllEmojis(): Promise<Emoji[]> {
  // Méthode 1: essayer de charger via fetch API
  try {
    // In a real production environment, this would be a DB call
    // For V1, we're using a local JSON file as specified in the PRD
    
    // En développement, utilisez une URL absolue vers le serveur local
    const url = new URL('/emojis.json', process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : typeof window !== 'undefined' ? window.location.origin : '');
    
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!res.ok) {
      throw new Error(`Failed to fetch emoji data: ${res.status} ${res.statusText}`);
    }
    
    const data: Emoji[] = await res.json();
    return data;
  } catch (fetchError) {
    console.error('Error fetching emojis via fetch:', fetchError);
    
    // Méthode 2: charger directement à partir du système de fichiers
    try {
      console.log('Falling back to direct file system loading');
      const fsData = loadEmojisData();
      if (fsData.length > 0) {
        return fsData;
      }
      throw new Error('No emojis loaded from file system');
    } catch (fsError) {
      console.error('Error loading emojis from file system:', fsError);
      
      // Méthode 3: utiliser les données statiques en dernier recours
      console.log('Falling back to static emoji data');
      return staticEmojisData;
    }
  }
}

export function searchEmojis(emojis: Emoji[], query: string): Emoji[] {
  if (!query.trim()) return emojis;
  
  const lowerCaseQuery = query.toLowerCase().trim();
  
  return emojis.filter(emoji => 
    emoji.emoji.includes(lowerCaseQuery) ||
    emoji.signification.toLowerCase().includes(lowerCaseQuery) ||
    emoji.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)) ||
    emoji.exemples.some(exemple => exemple.toLowerCase().includes(lowerCaseQuery))
  );
}

export function sortEmojisByDate(emojis: Emoji[]): Emoji[] {
  return [...emojis].sort((a, b) => 
    new Date(b.date_ajout).getTime() - new Date(a.date_ajout).getTime()
  );
}

export function getEmojiBySymbol(emojis: Emoji[], symbol: string): Emoji | undefined {
  return emojis.find(emoji => emoji.emoji === symbol);
}
