import { Emoji } from '@/types';
import { staticEmojisData } from '@/data/staticEmojisData';

/**
 * Normalise un emoji pour garantir sa consistance
 * Particulièrement important pour les emojis composés avec Zero Width Joiner (ZWJ)
 */
export function normalizeEmoji(emoji: string): string {
  // La normalisation Unicode peut aider à garantir une représentation cohérente
  return emoji.normalize('NFC');
}

/**
 * Encode un emoji pour une utilisation sécurisée dans les URLs
 * Particulièrement utile pour les emojis composés avec Zero Width Joiner
 */
export function encodeEmojiForUrl(emoji: string): string {
  try {
    // Normaliser d'abord l'emoji
    const normalizedEmoji = normalizeEmoji(emoji);
    
    // Convertir chaque point de code Unicode en une chaîne hexadécimale
    // Cette méthode est plus fiable que btoa qui peut avoir des problèmes avec certains caractères Unicode
    const codePoints = [];
    for (let i = 0; i < normalizedEmoji.length; i++) {
      const codePoint = normalizedEmoji.codePointAt(i);
      if (codePoint) {
        // Certains emojis utilisent deux positions dans la chaîne de caractères (paires de substitution)
        // On saute le second élément de la paire
        if (codePoint > 0xFFFF) {
          i++;
        }
        codePoints.push(codePoint.toString(16).padStart(4, '0'));
      }
    }
    return codePoints.join('-');
  } catch (e) {
    console.error("Erreur lors de l'encodage de l'emoji:", e);
    // Fallback au cas où quelque chose se passe mal
    return encodeURIComponent(emoji);
  }
}

/**
 * Décode un emoji qui a été encodé avec encodeEmojiForUrl
 */
export function decodeEmojiFromUrl(encoded: string): string {
  try {
    // Si l'encodage est au format que nous utilisons (hexadécimal séparé par des tirets)
    if (encoded.match(/^[0-9a-f]{1,6}(-[0-9a-f]{1,6})*$/i)) {
      const codePoints = encoded.split('-').map(hex => parseInt(hex, 16));
      return String.fromCodePoint(...codePoints);
    }
    
    // Sinon, essayer le décodage standard d'URL
    return decodeURIComponent(encoded);
  } catch (e) {
    console.warn('Échec du décodage de l\'emoji:', e);
    // Retourner tel quel en cas d'erreur
    return encoded;
  }
}

export async function getAllEmojis(): Promise<Emoji[]> {
  // Méthode 1: essayer de charger via fetch API
  try {
    // In a real production environment, this would be a DB call
    // For V1, we're using a local JSON file as specified in the PRD
    
    // En développement, utilisez une URL absolue vers le serveur local
    const url = new URL('/emojis.json', process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_BASE_URL || 'https://decodemojis.fr');
    
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!res.ok) {
      throw new Error(`Failed to fetch emoji data: ${res.status} ${res.statusText}`);
    }
    
    const data: Emoji[] = await res.json();
    
    // Normaliser les emojis pour éviter les problèmes d'encodage
    return data.map(emoji => ({
      ...emoji,
      emoji: normalizeEmoji(emoji.emoji),
      exemples: emoji.exemples // Ne pas transformer les exemples !
    }));
  } catch (fetchError) {
    console.error('Error fetching emojis via fetch:', fetchError);
    
    // Suppression de la méthode du système de fichiers qui cause des problèmes
    // Passons directement à la méthode des données statiques
    
    // Méthode 3: utiliser les données statiques en dernier recours
    console.log('Falling back to static emoji data');
    return staticEmojisData;
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
  // Normaliser le symbole recherché
  const normalizedSymbol = normalizeEmoji(symbol);
  
  // D'abord essayer une correspondance exacte après normalisation
  const exactMatch = emojis.find(emoji => normalizeEmoji(emoji.emoji) === normalizedSymbol);
  if (exactMatch) return exactMatch;
  
  // Si pas de correspondance exacte, essayer une recherche plus souple
  // Comparer les points de code individuels pour gérer les différences de représentation
  return emojis.find(emoji => {
    const normalizedEmojiSymbol = normalizeEmoji(emoji.emoji);
    
    // Si les longueurs sont différentes, comparer les points de code
    const symbolPoints = [...normalizedSymbol].map(c => c.codePointAt(0));
    const emojiPoints = [...normalizedEmojiSymbol].map(c => c.codePointAt(0));
    
    // Vérifier si les points de code principaux correspondent
    // Ignorer les caractères Zero Width Joiner (U+200D) qui peuvent causer des problèmes
    const symbolMainPoints = symbolPoints.filter(p => p !== 0x200D);
    const emojiMainPoints = emojiPoints.filter(p => p !== 0x200D);
    
    // Si les points principaux correspondent, c'est probablement le même emoji
    if (JSON.stringify(symbolMainPoints) === JSON.stringify(emojiMainPoints)) {
      return true;
    }
    
    return false;
  });
}

/**
 * Normalise tous les emojis trouvés dans un texte
 * Utile pour les exemples et autres textes contenant des emojis
 */
export function normalizeEmojisInText(text: string): string {
  if (!text) return '';
  
  // Cette regex tente de détecter les séquences d'emojis, y compris celles avec ZWJ
  // Elle recherche:
  // 1. Des emojis de présentation ou des emojis suivis d'un sélecteur de variation emoji (FE0F)
  // 2. Suivis éventuellement par une séquence ZWJ et d'autres emojis
  return text.replace(
    /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)(\u200D(\p{Emoji_Presentation}|\p{Emoji}\uFE0F))*/gu, 
    match => normalizeEmoji(match)
  );
}
