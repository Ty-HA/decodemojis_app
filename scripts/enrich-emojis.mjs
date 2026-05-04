// Enriches existing entries with additional documented meanings
// (multi-meaning emojis) and adds FBI-2007 pedo-symbol codes
// flagged with strong contextual warnings.
//
// Sources:
// - FBI Cyber Division, "Symbols and Logos Used by Pedophiles to
//   Identify Sexual Preferences" (2007 leaked memo). Reported by
//   Wired, The Guardian, Le Monde, France Info.
// - DEA Emoji Drug Code Decoded, deadiversion.usdoj.gov.
// - ADL Hate Symbols Database.
// - Police nationale (FR) — note interne sur les emojis et l'argot.
import fs from 'node:fs';
import path from 'node:path';

const FILE = path.join(process.cwd(), 'public', 'emojis.json');
const TODAY = '2026-05-04';

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const byEmoji = new Map(data.map((e) => [e.emoji.normalize('NFC'), e]));

// --- 1. Enrichments to existing entries ----------------------------------
const enrichments = {
  '🧠': {
    signification:
      "Plusieurs sens. Sarcasme \"manque d'intelligence\" ; en manosphère et brainrot 2024-2026 = \"mewing\" (posture langue/mâchoire pour redessiner le visage) ; en sexualité = fellation (\"give brain\").",
    exemples: [
      "Tu mewing 🧠 pour la jawline ?",
      "Elle 🧠 trop bien.",
      "Y a vraiment pas de 🧠 dans cette tête.",
    ],
    addTags: ['manosphère', 'brainrot', 'sexualité'],
  },
  '🐷': {
    signification:
      "Plusieurs sens. Insulte sur l'hygiène ou le poids ; ACAB / argot anti-police (\"les cochons\" = les flics) ; insulte islamophobe ou antisémite selon contexte.",
    exemples: [
      "T'es vraiment un 🐷.",
      "Les 🐷 ont débarqué dans le quartier.",
    ],
    addTags: ['acab', 'racisme'],
  },
  '🩸': {
    signification:
      "Plusieurs sens. Règles, blessure, mais aussi marqueur d'automutilation (combiné à 🪒 ou ✂️) et code dealer pour l'injection de drogues.",
    exemples: [
      "🪒🩸 = scarification.",
      "🩸 ce mois-ci.",
    ],
    addTags: ['automutilation', 'alerte'],
  },
  // FBI 2007 — symboles "GirlLover" / "BoyLover" / "Childlover"
  '💗': {
    signification:
      "Plusieurs sens. Affection adolescente sans intention sexuelle. À interpréter avec prudence : un mémo du FBI (Cyber Division, 2007) recense le motif \"cœur dans cœur\" comme logo \"Girl Lover\" utilisé par certains pédocriminels pour s'identifier en ligne. Ce signe seul n'a aucune valeur diagnostique — il n'est inquiétant qu'en combinaison avec d'autres signaux (pseudo suspect, contact non sollicité avec un mineur, demande d'images).",
    exemples: [
      "Cœur sincère entre amis : 💗 c'est mon BFF.",
      "Pseudo adulte avec 💗💗 contactant des mineurs sur Discord = signal à recouper.",
    ],
    addTags: ['fbi-2007', 'pédocriminalité'],
  },
  '🦋': {
    signification:
      "Plusieurs sens. \"Butterfly project\" : papillon dessiné sur le poignet pour résister à l'automutilation (signal de souffrance). Esthétique pro-ana \"thinspo\". Selon le mémo FBI 2007, le motif \"papillon\" est aussi recensé comme logo \"Childlover\" — usage majoritairement innocent, signal uniquement combiné à d'autres éléments.",
    exemples: [
      "Mon 🦋 a tenu 3 jours.",
      "Goal 🦋 forever skinny.",
    ],
    addTags: ['fbi-2007', 'pédocriminalité'],
  },
};

let enriched = 0;
for (const [em, patch] of Object.entries(enrichments)) {
  const e = byEmoji.get(em.normalize('NFC'));
  if (!e) continue;
  e.signification = patch.signification;
  if (patch.exemples) e.exemples = patch.exemples;
  if (patch.addTags) {
    const set = new Set([...e.tags, ...patch.addTags]);
    e.tags = [...set];
  }
  e.date_ajout = TODAY;
  enriched++;
}

// --- 2. Net new entries: FBI 2007 symbols not yet in the dictionary ------
const additions = [
  {
    emoji: '🔺',
    signification:
      "Plusieurs sens. Décoration, alerte, géométrie. Selon le mémo FBI Cyber Division 2007, le motif \"triangle dans triangle\" (\"BoyLover Logo\") est utilisé par certains pédocriminels pour s'identifier en ligne. À prendre avec énormément de précaution : usage très majoritairement innocent, signal uniquement combiné à un pseudo suspect, à un contact non sollicité avec un mineur ou à des demandes d'images.",
    exemples: [
      "🔺 dans bio = à recouper avec d'autres signaux, jamais conclusif seul.",
    ],
    tags: ['pédocriminalité', 'fbi-2007', 'alerte'],
  },
  {
    emoji: '🌪️',
    signification:
      "Plusieurs sens. Tempête, chaos, événement météo. Selon le mémo FBI 2007, certaines variantes de \"spirale dans cœur\" sont décrites comme logo \"Little Girl Lover\". Comme pour les autres symboles FBI 2007 : signal uniquement en combinaison.",
    exemples: [
      "🌪️ dans la vraie vie = ouragan, ado qui s'amuse.",
    ],
    tags: ['pédocriminalité', 'fbi-2007', 'alerte'],
  },
];

let added = 0;
for (const a of additions) {
  const key = a.emoji.normalize('NFC');
  if (byEmoji.has(key)) {
    // already exists, skip (we'd enrich via the map above instead)
    continue;
  }
  const entry = { ...a, date_ajout: TODAY };
  data.push(entry);
  byEmoji.set(key, entry);
  added++;
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');

console.log(`Enriched: ${enriched}`);
console.log(`Added: ${added}`);
console.log(`Total in file: ${data.length}`);
