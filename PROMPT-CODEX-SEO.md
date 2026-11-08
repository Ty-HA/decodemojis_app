# Prompt pour Codex — Référencement Google de DecodEmojis

Copie le bloc ci-dessous dans Codex, dans le dossier du projet.

```text
Contexte
Projet : DecodEmojis, PWA Next.js 15 (App Router, React 19, TypeScript, Tailwind v4) en français, qui explique le sens des emojis (usages codés chez les ados : drogues, harcèlement, incel, nudes…) plus un glossaire d'argot. Déployé sur Vercel. Domaine de production : https://decodemojis.fr. Lis d'abord CLAUDE.md et prd.md à la racine.

Données : pas de base de données. public/emojis.json (≈180 emojis) et public/argots.json, chargés par src/utils/emoji-utils.ts (getAllEmojis). Les pages /emoji/[symbol] utilisent un paramètre encodé en hex (encodeEmojiForUrl). Ne casse pas cet encodage.

Objectif
Auditer puis améliorer le référencement du site sur Google Search, et me dire où on en est. Un premier constat : une recherche web « site:decodemojis.fr » ne renvoie aucune page du site, donc l'indexation est peut-être faible ou nulle. Vérifie-le avec des preuves, ne suppose rien.

Étape 1 — Diagnostic (lecture seule, aucune modification)
1. Récupère https://decodemojis.fr/robots.txt, /sitemap.xml, la page d'accueil, /glossaire, /ressources et 3 fiches /emoji/<hex> avec curl. Indique : code HTTP, redirections (www vs apex, http vs https), balises <title>, meta description, canonical, robots/noindex, Open Graph, JSON-LD, hreflang/lang.
2. Vérifie le sitemap : les URL listées sont-elles bien en https://decodemojis.fr (et pas decodemojis.vercel.app) ? Combien d'URL d'emojis contient-il ? Correspond-il aux ~180 fiches ? Cause probable : src/app/sitemap.ts lit NEXT_PUBLIC_BASE_URL, et .env contient https://decodemojis.vercel.app. Contrôle la valeur réellement utilisée au build sur Vercel (vercel env ls, sans afficher les valeurs secrètes) et celle de .env.
3. Vérifie que l'URL .vercel.app ne reste pas indexable en doublon (redirection 301 vers le domaine principal ou noindex).
4. Vérifie src/app/robots.ts : pas de Disallow involontaire, ligne Sitemap correcte.
5. Vérifie metadata par page (generateMetadata sur /emoji/[symbol], glossaires, ressources) : titres uniques, descriptions uniques, canonical absolue, pas de contenu dupliqué entre /glossaire, /glossaire-alphabetique, /glossaire-argot-categories.
6. Lance un Lighthouse (ou PageSpeed Insights API si pas de clé requise) sur accueil + une fiche emoji : SEO, performance mobile, accessibilité. Donne les scores et les 5 problèmes principaux.
7. Contrôle que les pages rendent bien leur contenu côté serveur (HTML initial contient le sens de l'emoji), pas seulement après JavaScript.

Étape 2 — Corrections (petits commits, un sujet par commit, ne pousse pas sans mon accord)
- Corrige l'URL de base du sitemap, du canonical et des Open Graph pour qu'elles pointent vers https://decodemojis.fr.
- Ajoute ou corrige : title/description uniques par fiche emoji (ex. « 🐸 : que veut dire cet emoji ? | DecodEmojis »), JSON-LD adapté (WebSite + SearchAction sur l'accueil, BreadcrumbList sur les fiches, FAQPage ou DefinedTerm si pertinent), liens internes entre fiches liées (tags communs), fil d'Ariane.
- Ne touche pas à la logique d'encodage des emojis dans les URL. Ne modifie pas le contenu éditorial de public/emojis.json (sens des emojis) sauf demande explicite.
- Si next.config.ts et next.config.js coexistent, ne modifie que next.config.js (le PWA y est configuré).
- Lance npm run lint et npm run build avant chaque commit ; indique le résultat réel.

Étape 3 — Ce que je dois faire moi-même (tu me donnes la procédure exacte, tu ne peux pas le faire)
- Déclarer decodemojis.fr dans Google Search Console (propriété « Domaine », validation DNS), soumettre /sitemap.xml, demander l'indexation de l'accueil et de 5 fiches clés via « Inspection d'URL ».
- Si tu as un accès Search Console (API ou export), analyse : pages indexées vs exclues et motif, impressions, clics, CTR, position moyenne, top requêtes. Sinon, liste précisément les rapports à m'exporter.

Contraintes
- Site sensible (drogues, automutilation, extrémisme, mineurs). Ne rédige aucun contenu qui détaille comment se procurer des drogues ou nuire. Garde le ton informatif et préventif, avec les numéros d'aide déjà présents (3018, 3114, 119).
- Ne propose pas de techniques de référencement abusives (texte caché, bourrage de mots-clés, achat de liens).
- Rapporte les résultats avec les commandes lancées et leurs sorties. Dis clairement ce que tu n'as pas pu vérifier.

Livrable final : un rapport court (état actuel mesuré, problèmes classés par impact, corrections faites avec les commits, actions restantes pour moi, et mots-clés/pages à créer ensuite, par exemple « emoji harcèlement ado », « emoji drogue signification », « codes emoji ados parents »).
```
