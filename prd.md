Product Requirements Document (PRD)
Projet : DecodEmojis (nom temporaire)
Résumé
DecodEmojis est un dictionnaire évolutif et collaboratif d’emojis, conçu pour aider parents, jeunes et éducateurs à comprendre et décrypter la signification des emojis utilisés en ligne, notamment dans le cadre du cyberharcèlement et du langage codé chez les jeunes.
La plateforme encourage la contribution de la communauté (parents, jeunes, pros) pour enrichir ou mettre à jour les définitions.

Objectifs
Offrir un outil simple, accessible sur mobile, pour rechercher la signification d’un emoji.

Mettre à disposition des définitions pédagogiques, actualisées et validées.

Permettre à chacun de suggérer une signification ou de signaler un usage.

Favoriser la co-construction (contributions des jeunes et parents).

Fournir un moyen de contact rapide pour signaler, suggérer ou collaborer.

Fonctionnalités (V1)
Recherche & Consultation
Barre de recherche par emoji, mot-clé ou signification.

Liste d’emojis (triée par popularité, pertinence ou ordre alpha).

Fiche emoji :

Emoji en grand

Définition simple, exemples d’utilisation

Date de mise à jour

Tags / thématiques

Contribution & Contact
Formulaire pour suggérer une nouvelle signification ou un nouvel emoji (champ texte, email optionnel).

Formulaire de contact (pour toute question, signalement, proposition de partenariat).

Pages principales
Accueil : intro pédagogique + recherche + derniers emojis ajoutés.

Détail emoji : fiche complète de l’emoji.

Proposer une définition : formulaire de suggestion.

Contact.

Mentions légales/CGU.

Approche technique
Framework : Next.js 14 (App Router)

Langage : TypeScript

UI : Tailwind CSS, mobile first

PWA : via next-pwa pour installation écran d’accueil & offline

Stockage : Fichier JSON local dans /public, versionné manuellement pour la V1

Structure du JSON
json
Copier
Modifier
[
  {
    "emoji": "🍑",
    "signification": "Utilisé pour représenter des fesses ou de la sexualité.",
    "exemples": ["Il a envoyé une 🍑 pour rigoler."],
    "tags": ["sexualité", "ado"],
    "date_ajout": "2025-06-19"
  }
]
Parcours utilisateur
L’utilisateur arrive sur la page d’accueil (mobile first) :

explication

recherche

emojis populaires/ajoutés récemment

Il recherche un emoji (ou scrolle la liste).

Il consulte la fiche emoji (définition, exemples).

Il peut, s’il le souhaite, suggérer une définition (formulaire rapide, pas de compte requis).

Il peut envoyer un message via le formulaire de contact.

Évolutions prévues (V2+)
Passage à une base de données (Supabase, Firebase)

Back-office pour modération des contributions

Authentification optionnelle (pour contributeurs réguliers)

Système de vote/upvote sur les définitions

Alertes tendances (emoji problématiques en hausse)

Multilingue

Points UX/UI
Responsive & mobile first (utilisation de Tailwind)

Accessibilité : contraste, taille de police, navigation simple

Icônes/visuels clairs

CTA visibles pour la participation

Ton pédagogique, inclusif et bienveillant

Stack à installer
next

react

typescript

tailwindcss

next-pwa
(+ éventuel package de formulaire type formspree/netlify pour le contact)

Livrables attendus V1
MVP fonctionnel, accessible mobile et desktop, installable en PWA

Dictionnaire de base (30-50 emojis principaux) au lancement

Formulaires de suggestion/contact opérationnels

Prêt à être enrichi avec la communauté