# Guide de gestion des emojis dans DecodEmojis

## Problématique des emojis composés

Les emojis composés, comme `👨‍❤️‍👨` (homme-cœur-homme), sont formés de plusieurs caractères Unicode liés par des caractères de jointure (ZWJ - Zero Width Joiner, U+200D). Ces emojis peuvent provoquer plusieurs types de problèmes:

1. **Problèmes d'encodage/décodage**: Lors de la manipulation dans les URL ou le stockage
2. **Rendu inconsistant**: Le même emoji peut apparaître différemment selon l'endroit où il est utilisé
3. **Corruption partielle**: Une partie de l'emoji composé peut être corrompue (par exemple: `��‍❤️‍👨` au lieu de `👨‍❤️‍👨`)

## Solutions mises en place

### 1. Normalisation des emojis

Tous les emojis sont normalisés avec Unicode NFC pour garantir une représentation cohérente:

```typescript
export function normalizeEmoji(emoji: string): string {
  return emoji.normalize('NFC');
}
```

### 2. Encodage spécial pour les URLs

Les emojis sont encodés en convertissant chaque point de code en hexadécimal:

```typescript
export function encodeEmojiForUrl(emoji: string): string {
  // Voir l'implémentation dans emoji-utils.ts
}
```

### 3. Normalisation des emojis dans les textes

Une fonction spéciale détecte et normalise tous les emojis présents dans un texte:

```typescript
export function normalizeEmojisInText(text: string): string {
  // Voir l'implémentation dans emoji-utils.ts
}
```

### 4. Recherche robuste des emojis

La fonction `getEmojiBySymbol` utilise plusieurs méthodes pour correspondre aux emojis, même si leur représentation diffère légèrement.

## Bonnes pratiques à suivre

1. **Pour les URLs**: Toujours utiliser `encodeEmojiForUrl` et `decodeEmojiFromUrl`
2. **Pour l'affichage**: Toujours utiliser `normalizeEmoji` sur les emojis individuels
3. **Pour les textes contenant des emojis**: Utiliser `normalizeEmojisInText`
4. **Pour la comparaison d'emojis**: La fonction `getEmojiBySymbol` gère déjà les cas complexes

## Cas spécifiques à surveiller

- Les emojis avec modificateurs de couleur de peau
- Les emojis avec sélecteurs de variation (VS15, VS16)
- Les séquences d'emojis liés par ZWJ comme les familles et les couples

En cas de problème persistant avec un emoji spécifique, l'ajouter ci-dessous avec une note:

### Emojis problématiques connus

- `👨‍❤️‍👨` (homme-cœur-homme): Peut être mal rendu dans certains contextes - RÉSOLU
