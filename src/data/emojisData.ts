import { Emoji } from '@/types';
import fs from 'fs';
import path from 'path';

// Cette fonction charge directement les données à partir du fichier JSON
export function loadEmojisData(): Emoji[] {
  try {
    // Chemin relatif au répertoire racine du projet
    const filePath = path.join(process.cwd(), 'public', 'emojis.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const emojis: Emoji[] = JSON.parse(jsonData);
    return emojis;
  } catch (error) {
    console.error('Error loading emojis data:', error);
    return [];
  }
}
