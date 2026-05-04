// One-off enrichment script for public/emojis.json.
// Adds 2024-2026 coded-meaning emojis researched from DEA / FBI / ADL /
// Police nationale FR / Bark / Internet Sans Crainte sources.
import fs from 'node:fs';
import path from 'node:path';

const FILE = path.join(process.cwd(), 'public', 'emojis.json');
const TODAY = '2026-05-04';

const existing = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const existingSet = new Set(existing.map((e) => e.emoji.normalize('NFC')));

const additions = [
  // ─── Drogues ──────────────────────────────────────────────────
  { emoji: '🐌', signification: "Code dealer pour le fentanyl. L'escargot évoque le ralentissement du rythme cardiaque provoqué par cet opioïde mortel.", exemples: ["T'as du 🐌 pour ce soir ?", "Méfie-toi des 🐌 dans les pilules."], tags: ['drogue', 'fentanyl', 'alerte'] },
  { emoji: '🧀', signification: "Code dealer pour le fentanyl ou les pilules contrefaites (souvent jaunes). Aussi héroïne coupée.", exemples: ["Le 🧀 circule au lycée."], tags: ['drogue', 'fentanyl', 'alerte'] },
  { emoji: '🐉', signification: "Référence à l'héroïne (\"chasing the dragon\"). De plus en plus utilisé aussi pour le fentanyl.", exemples: ["Il court après le 🐉."], tags: ['drogue', 'héroïne'] },
  { emoji: '🤎', signification: "Cœur marron : code dealer pour l'héroïne (couleur de la substance). Peut aussi exprimer un soutien à la communauté noire.", exemples: ["T'as du 🤎 ?"], tags: ['drogue', 'héroïne'] },
  { emoji: '💎', signification: "Méthamphétamine cristalline (\"crystal meth\") ou MDMA en cristaux.", exemples: ["Du 💎 pur 100%."], tags: ['drogue', 'méthamphétamine', 'mdma'] },
  { emoji: '🧊', signification: "\"Ice\" : méthamphétamine cristalline. Glaçon = pureté de la substance.", exemples: ["🧊 dispo ce week-end."], tags: ['drogue', 'méthamphétamine'] },
  { emoji: '💙', signification: "Cœur bleu : méthamphétamine (\"Breaking Bad\") ou pilules de fentanyl bleues (M30 contrefaits, très mortels).", exemples: ["Que du 💙 chez moi."], tags: ['drogue', 'fentanyl', 'méthamphétamine', 'alerte'] },
  { emoji: '🅿️', signification: "Percocet (oxycodone). La lettre P du nom commercial.", exemples: ["T'as un 🅿️ pour la soirée ?"], tags: ['drogue', 'opioïde'] },
  { emoji: '🍌', signification: "Percocet jaune (forme et couleur du comprimé). Peut aussi désigner d'autres pilules jaunes.", exemples: ["🍌 dispo, MP."], tags: ['drogue', 'opioïde'] },
  { emoji: '🚌', signification: "Xanax : référence aux \"school bus\" (les barres jaunes d'alprazolam à 2 mg).", exemples: ["Monte dans le 🚌."], tags: ['drogue', 'xanax', 'benzodiazépine'] },
  { emoji: '🍫', signification: "\"Barre de chocolat\" : Xanax (référence aux barres). Peut aussi désigner l'héroïne brune.", exemples: ["Une barre de 🍫."], tags: ['drogue', 'xanax', 'héroïne'] },
  { emoji: '🏈', signification: "Forme du comprimé de Xanax (ovale comme un ballon de football américain).", exemples: ["Passe le 🏈."], tags: ['drogue', 'xanax'] },
  { emoji: '🚆', signification: "Adderall : \"A-train\". Stimulant détourné par les ados pour les études ou les soirées.", exemples: ["Besoin d'un 🚆 pour les exams."], tags: ['drogue', 'stimulant', 'adderall'] },
  { emoji: '🐱', signification: "Kétamine (\"kitty\", \"kit kat\"). En contexte manosphère, peut aussi être une insulte sexiste.", exemples: ["T'as du 🐱 ?"], tags: ['drogue', 'kétamine'] },
  { emoji: '🦇', signification: "Variante pour la kétamine (\"bat\"). Aussi univers gothique ou Halloween.", exemples: ["🦇 pour la nuit."], tags: ['drogue', 'kétamine'] },
  { emoji: '🌀', signification: "État dissociatif sous kétamine (\"K-hole\"). Spirale = perte de repères.", exemples: ['🌀🌀🌀 grosse soirée.'], tags: ['drogue', 'kétamine'] },
  { emoji: '🤧', signification: "Cocaïne : référence au reniflement.", exemples: ['🤧 toute la nuit.'], tags: ['drogue', 'cocaïne'] },
  { emoji: '🥥', signification: "Cocaïne (\"coco\", \"coke\"). La noix de coco contourne les filtres de modération.", exemples: ["T'as de la 🥥 fraîche ?"], tags: ['drogue', 'cocaïne'] },
  { emoji: '🎱', signification: "\"8-ball\" : 3,5 g de cocaïne (un huitième d'once).", exemples: ['Un 🎱 pour la soirée.'], tags: ['drogue', 'cocaïne'] },
  { emoji: '🐡', signification: "Cocaïne de qualité dite \"premium\" (poisson-globe = effet \"gonflé\").", exemples: ['🐡 de qualité.'], tags: ['drogue', 'cocaïne'] },
  { emoji: '🥦', signification: "Cannabis : la tête de brocoli ressemble aux têtes de weed.", exemples: ["T'as du 🥦 ?"], tags: ['drogue', 'cannabis'] },
  { emoji: '🍀', signification: "Cannabis : trèfle vert qui contourne la modération sur 🌿.", exemples: ['Soirée 🍀 ce soir.'], tags: ['drogue', 'cannabis'] },
  { emoji: '🌴', signification: "Cannabis (\"palm tree weed\") ou simplement vacances. Contexte indispensable.", exemples: ['Vacances 🌴.'], tags: ['drogue', 'cannabis'] },
  { emoji: '🌿', signification: "\"Herbe\", \"weed\" : cannabis. L'usage codé reste évident.", exemples: ['Du 🌿 médical.'], tags: ['drogue', 'cannabis'] },
  { emoji: '🚬', signification: "Joint de cannabis ou cigarette roulée avec weed. Pas seulement le tabac.", exemples: ['On se roule un 🚬.'], tags: ['drogue', 'cannabis', 'tabac'] },
  { emoji: '🍯', signification: "Concentrés de THC (\"honey oil\", \"wax\", \"BHO\"). Très puissants.", exemples: ['🍯 hyper puissant.'], tags: ['drogue', 'cannabis'] },
  { emoji: '🐝', signification: "Wax / cire de cannabis (l'abeille fait du miel = honey oil).", exemples: ['🐝🍯 = concentrés.'], tags: ['drogue', 'cannabis'] },
  { emoji: '💨', signification: "Vapotage ou fumée (cannabis, vape pen, nicotine). Peut aussi signifier \"je m'en vais discrètement\".", exemples: ["On part 💨 = aller fumer."], tags: ['drogue', 'cannabis', 'vapotage'] },
  { emoji: '🛒', signification: "Cartouches de vape THC (\"carts\"). Souvent contrefaites et dangereuses.", exemples: ['🛒 bien chargées.'], tags: ['drogue', 'cannabis', 'vapotage'] },
  { emoji: '👽', signification: "MDMA / ecstasy : sensations \"venues d'ailleurs\". Peut aussi désigner une personne marginalisée en mode insulte.", exemples: ['Soirée avec des 👽.'], tags: ['drogue', 'mdma'] },
  { emoji: '👹', signification: "Pilule d'ecstasy / MDMA, souvent un cachet imprimé d'un masque.", exemples: ['Distribution de 👹 en boîte.'], tags: ['drogue', 'mdma'] },
  { emoji: '👾', signification: "MDMA / ecstasy : forme et couleurs des cachets.", exemples: ['Des 👾 colorés.'], tags: ['drogue', 'mdma'] },
  { emoji: '✖️', signification: "\"X\" : ecstasy / MDMA.", exemples: ['Tu prends un ✖️ ?'], tags: ['drogue', 'mdma'] },
  { emoji: '🍬', signification: "Bonbons : ecstasy / MDMA (\"candy flipping\") ou drogues colorées en général.", exemples: ['🍬🍬 pour le festival.'], tags: ['drogue', 'mdma'] },
  { emoji: '🐰', signification: "Lapin blanc : MDMA / ecstasy (référence \"white rabbit\", Alice au pays des merveilles).", exemples: ['Course au 🐰 ce soir.'], tags: ['drogue', 'mdma'] },
  { emoji: '🍇', signification: "\"Purple drank\" / lean : sirop codéiné mélangé à du soda. Pratique mortelle popularisée par le rap US.", exemples: ['Une bouteille de 🍇.'], tags: ['drogue', 'codéine', 'lean'] },
  { emoji: '🔮', signification: "Lean / sirop codéiné (couleur violette de la boisson). Variante de 🍇.", exemples: ['🔮 dans le verre.'], tags: ['drogue', 'codéine', 'lean'] },
  { emoji: '💉', signification: "Injection de drogue (héroïne, drogues IV). Signal très grave en MP ado.", exemples: ['Plus jamais de 💉.'], tags: ['drogue', 'héroïne', 'alerte'] },
  { emoji: '🔌', signification: "\"Plug\" : le dealer / fournisseur. Très courant dans les MP de mineurs.", exemples: ["T'as un bon 🔌 ?"], tags: ['drogue', 'dealer'] },
  { emoji: '📦', signification: "Livraison de drogue. Les dealers utilisent ce code pour les colis.", exemples: ['🔌 envoie le 📦.'], tags: ['drogue', 'dealer'] },
  { emoji: '🪂', signification: "Drop / largage de drogue à un point de rendez-vous.", exemples: ['🪂 ce soir 22h.'], tags: ['drogue', 'dealer'] },
  { emoji: '⛽', signification: "Lieu de rendez-vous avec un dealer (souvent station-service) OU \"gas\" = weed haut de gamme.", exemples: ['RDV ⛽ dans 10 min.'], tags: ['drogue', 'dealer'] },
  { emoji: '🚀', signification: "Drogue très puissante / forte montée (\"rocket fuel\").", exemples: ['Du shit 🚀 incroyable.'], tags: ['drogue', 'argot'] },
  { emoji: '💣', signification: "Drogue très forte ou produit dangereux (selon contexte). Aussi \"banger\" dans le sens \"excellent\".", exemples: ['Cette weed est une 💣.'], tags: ['drogue', 'argot'] },
  { emoji: '🟢', signification: "Cercle vert : pilules contrefaites M30 (souvent fentanyl) OU cannabis. Attention au contexte.", exemples: ['Que des 🟢 chez moi.'], tags: ['drogue', 'fentanyl', 'cannabis', 'alerte'] },
  { emoji: '🍋', signification: "\"Lemon\" : stimulant doux ou drogue colorée. En sexualité, peut renvoyer à \"lemon party\". Contexte requis.", exemples: ['🍋 au programme.'], tags: ['drogue', 'sexualité'] },

  // ─── Suicide / automutilation ─────────────────────────────────
  { emoji: '🪒', signification: "Lame de rasoir : scarification, automutilation. Signal d'alerte très fort en MP d'ado.", exemples: ['🪒 ce soir.'], tags: ['automutilation', 'alerte'] },
  { emoji: '✂️', signification: "Algospeak pour automutilation (contournement des filtres TikTok / Instagram qui bloquent \"self-harm\").", exemples: ['Envie de ✂️.'], tags: ['automutilation', 'alerte'] },
  { emoji: '🦋', signification: "\"Butterfly project\" : papillon dessiné sur le poignet pour résister à l'envie de se scarifier. Si l'ado le mentionne, il/elle est en souffrance.", exemples: ['Mon 🦋 a tenu 3 jours.'], tags: ['automutilation', 'santé mentale', 'alerte'] },
  { emoji: '🪦', signification: "Pierre tombale : idéations suicidaires, \"je veux disparaître\". À prendre au sérieux.", exemples: ['Bientôt 🪦.'], tags: ['suicide', 'alerte'] },
  { emoji: '🔫', signification: "Arme à feu : menace, suicide ou cyberharcèlement violent. Combinaisons 😵🔫 / 🤯🔫 = idéation suicidaire.", exemples: ['🤯🔫 je n\'en peux plus.'], tags: ['suicide', 'violence', 'alerte'] },
  { emoji: '🪢', signification: "Corde / nœud : pendaison (algospeak suicide). Signal d'alarme.", exemples: ['💀🪢.'], tags: ['suicide', 'alerte'] },
  { emoji: '🪑', signification: "Chaise + corde : méthode de pendaison (algospeak). Sur TikTok peut aussi être un placeholder absurde — vérifier le contexte.", exemples: ['🪑🪢 = idéation par pendaison.'], tags: ['suicide', 'alerte'] },

  // ─── Santé mentale ────────────────────────────────────────────
  { emoji: '🌧️', signification: "Pluie : tristesse profonde, dépression chronique, journées noires.", exemples: ['🌧️ tous les jours.'], tags: ['santé mentale', 'dépression'] },
  { emoji: '🥀', signification: "Fleur fanée : déprime, \"je m'éteins\". En manosphère, peut aussi désigner une femme \"périmée\" passée 30 ans.", exemples: ['Je suis 🥀 en ce moment.'], tags: ['santé mentale', 'manosphère'] },
  { emoji: '⛓️', signification: "Sentiment d'être enchaîné : addiction, mal-être, esthétique \"edgy\" / dark.", exemples: ['⛓️😈 = mal-être affiché.'], tags: ['santé mentale'] },
  { emoji: '⛓️‍💥', signification: "Chaîne brisée : rupture, libération d'une relation toxique, ou divorce parental.", exemples: ['⛓️‍💥 enfin libre.'], tags: ['flirt', 'santé mentale'] },

  // ─── Troubles alimentaires ────────────────────────────────────
  { emoji: '🎀', signification: "Code esthétique \"coquette\" / \"waif\" associé aux communautés pro-ana sur TikTok et Pinterest. Recherche de la maigreur idéalisée.", exemples: ['Goal weight 🎀.'], tags: ['troubles alimentaires', 'pro-ana', 'alerte'] },
  { emoji: '⚖️', signification: "Balance : pesée obsessionnelle dans les communautés pro-ana / pro-mia.", exemples: ['⚖️ chaque matin.'], tags: ['troubles alimentaires', 'alerte'] },
  { emoji: '🍽️', signification: "Assiette vide : restriction alimentaire / jeûne (\"fasting\") en contexte pro-ana.", exemples: ['🍽️ depuis 3 jours.'], tags: ['troubles alimentaires', 'alerte'] },
  { emoji: '🐀', signification: "\"Rat mode\" : tendance TikTok pro-ana = manger très peu pour rester maigre.", exemples: ['Je suis en mode 🐀 cette semaine.'], tags: ['troubles alimentaires', 'pro-ana', 'alerte'] },

  // ─── Sexualité ────────────────────────────────────────────────
  { emoji: '🌶️', signification: "\"Spicy\" : contenu coquin / NSFW. Algospeak pour contourner les filtres.", exemples: ['Story 🌶️ sur mon compte privé.'], tags: ['sexualité'] },
  { emoji: '🌮', signification: "Vulve / sexe féminin.", exemples: ['Elle a un beau 🌮.'], tags: ['sexualité'] },
  { emoji: '🍝', signification: "\"Noods\" / \"noodles\" : nudes. Algospeak très répandu.", exemples: ['Envoie tes 🍝.'], tags: ['sexualité', 'nudes'] },
  { emoji: '🍜', signification: "Variante algospeak pour \"nudes\".", exemples: ["Tu m'envoies des 🍜 ?"], tags: ['sexualité', 'nudes'] },
  { emoji: '🥵', signification: "Excitation sexuelle, attirance forte, bien au-delà de \"il fait chaud\".", exemples: ['Ta photo 🥵🥵.'], tags: ['sexualité', 'flirt'] },
  { emoji: '🤤', signification: "Désir sexuel, \"je bave sur toi\".", exemples: ['🤤 sur cette story.'], tags: ['sexualité', 'flirt'] },
  { emoji: '⏳', signification: "Sablier : silhouette féminine, sexualisation du corps.", exemples: ['Elle a un corps 🥵⏳.'], tags: ['sexualité'] },
  { emoji: '🚛', signification: "\"Dump truck\" : gros postérieur. Sexualisation.", exemples: ['Elle a un 🚛 énorme.'], tags: ['sexualité'] },
  { emoji: '🔨', signification: "Rapport sexuel (\"hammering\").", exemples: ['On va 🔨 ce soir.'], tags: ['sexualité'] },
  { emoji: '🎤', signification: "Fellation / orgasme masculin selon contexte. Sinon usage musical normal.", exemples: ['Elle fait du 🎤.'], tags: ['sexualité'] },
  { emoji: '📬', signification: "Boîte ouverte : rapport sexuel (avec une personne).", exemples: ['📬 hier soir.'], tags: ['sexualité'] },
  { emoji: '🦄', signification: "Femme \"parfaite\" / \"licorne\" en manosphère, ou personne bisexuelle invitée dans un couple polyamoureux.", exemples: ['Cherche 🦄 pour notre couple.'], tags: ['sexualité', 'manosphère'] },
  { emoji: '👀', signification: "Demande discrète d'envoi de nudes ou de contenu intime en MP.", exemples: ['👀 ? = envoie une photo.'], tags: ['sexualité', 'nudes'] },
  { emoji: '🌭', signification: "Pénis (variante de 🍆).", exemples: ['Veux-tu mon 🌭 ?'], tags: ['sexualité'] },
  { emoji: '🍩', signification: "Anus / sexe anal.", exemples: ['Aime les 🍩.'], tags: ['sexualité'] },
  { emoji: '🥒', signification: "Pénis (variante de 🍆).", exemples: ['Belle taille 🥒.'], tags: ['sexualité'] },
  { emoji: '🫦', signification: "Lèvres mordues : désir sexuel intense, flirt.", exemples: ['Ta photo 🫦.'], tags: ['sexualité', 'flirt'] },

  // ─── Extrémisme / haine ───────────────────────────────────────
  { emoji: '⚫', signification: "\"Black pill\" : nihilisme incel. Croyance que rien ne sert d'essayer (apparence figée, monde injuste). Très alarmant chez un ado.", exemples: ['Je suis ⚫ depuis longtemps.'], tags: ['extrémisme', 'incel', 'manosphère', 'alerte'] },
  { emoji: '☕', signification: "Grain de café : variante du 🫘 incel pour s'auto-identifier dans la communauté masculiniste.", exemples: ['Profil rempli de ☕.'], tags: ['extrémisme', 'incel'] },
  { emoji: '💪', signification: "Manosphère : virilité dominante, \"alpha\", culture du gym, pression virilité chez les ados.", exemples: ['Vrai homme 💪🔴.'], tags: ['extrémisme', 'manosphère'] },
  { emoji: '🦍', signification: "Masculinité \"primale\" / mode \"alpha\". Peut aussi être une insulte raciste anti-Noirs selon contexte.", exemples: ['Mode 🦍 activé.'], tags: ['extrémisme', 'manosphère', 'racisme'] },
  { emoji: '🐺', signification: "\"Lone wolf\" : isolement revendiqué, rejet des relations sociales. Parfois marqueur précoce de radicalisation.", exemples: ['Je suis un 🐺 maintenant.'], tags: ['extrémisme', 'manosphère'] },
  { emoji: '🙋', signification: "Bras levé : utilisé après 2025 comme imitation discrète du salut nazi (suite à des gestes médiatisés). Vérifier le contexte.", exemples: ['🙋 mon frère.'], tags: ['extrémisme', 'nazisme', 'alerte'] },
  { emoji: '🐸', signification: "Pepe the Frog : symbole alt-right / suprémaciste blanc depuis 2016 (déclaré symbole de haine par l'ADL).", exemples: ['🐸 + drapeau US sur un profil = compte alt-right.'], tags: ['extrémisme', 'racisme', 'alerte'] },
  { emoji: '🥝', signification: "Kiwi : code transphobe (référence détournée au taux de suicide chez les jeunes trans).", exemples: ['🥝 dans bio = compte transphobe.'], tags: ['extrémisme', 'transphobie', 'alerte'] },
  { emoji: '🧃', signification: "\"Juicebox\" : code antisémite (\"juice\" → \"jew\"). Sinon usage normal \"drama / tea\". Contexte critique.", exemples: ['🧃🧃 dans des commentaires antisémites.'], tags: ['extrémisme', 'antisémitisme'] },
  { emoji: '🦎', signification: "Théorie complotiste antisémite des \"reptiliens\" / \"lizard people\" qui contrôleraient le monde.", exemples: ['Les 🦎 contrôlent tout.'], tags: ['extrémisme', 'antisémitisme', 'complotisme'] },
  { emoji: '🔻', signification: "Triangle rouge inversé : symbole nazi (prisonniers politiques). Depuis 2023, utilisé en ligne par le Hamas et ses soutiens pour cibler des Israéliens.", exemples: ['🔻 sur profil ou commentaire.'], tags: ['extrémisme', 'antisémitisme', 'alerte'] },
  { emoji: '1️⃣4️⃣8️⃣8️⃣', signification: "Code néonazi : \"14 words\" (slogan suprémaciste blanc) + \"88\" (HH = Heil Hitler).", exemples: ['1488 en pseudo Discord / Twitter.'], tags: ['extrémisme', 'nazisme', 'alerte'] },
  { emoji: '8️⃣8️⃣', signification: "\"HH\" = Heil Hitler (H = 8e lettre de l'alphabet). Année de naissance fictive 1988 souvent suspecte.", exemples: ['Compte créé en 88, pseudo se terminant par 88.'], tags: ['extrémisme', 'nazisme', 'alerte'] },
  { emoji: '6️⃣', signification: "Référence aux 6 millions de Juifs assassinés pendant la Shoah, en contexte négationniste / moqueur.", exemples: ['Seulement 6️⃣ ? 😏.'], tags: ['extrémisme', 'antisémitisme', 'alerte'] },
  { emoji: '2️⃣3️⃣', signification: "\"W\" (23e lettre) = \"white\". Code suprémaciste blanc.", exemples: ['23 dans bio nationaliste.'], tags: ['extrémisme', 'racisme'] },
  { emoji: '⬛', signification: "Combiné en ⬛⬜🟥 : drapeau de l'Allemagne nazie. Cherche le triplet, pas l'emoji isolé.", exemples: ['⬛⬜🟥 dans bio.'], tags: ['extrémisme', 'nazisme'] },
  { emoji: '🥷', signification: "Ninja : algospeak raciste pour contourner la modération du \"n-word\" (les filtres bloquent le mot, pas l'emoji).", exemples: ['Usage ciblé en commentaires sous des créateurs noirs.'], tags: ['extrémisme', 'racisme', 'alerte'] },
  { emoji: '🌅', signification: "\"Rising sun\" : nouvelle ère / \"réveil\" en rhétorique suprémaciste ou conspirationniste.", exemples: ['🌅 le réveil arrive.'], tags: ['extrémisme'] },
  { emoji: '🧬', signification: "ADN : suprématie \"génétique\" blanche en contexte raciste / eugéniste.", exemples: ['🧬 pure.'], tags: ['extrémisme', 'racisme'] },

  // ─── Identité / communauté ────────────────────────────────────
  { emoji: '🍉', signification: "Solidarité avec la Palestine (couleurs du drapeau). Algospeak pour contourner la modération automatique sur TikTok / Instagram.", exemples: ['🍉 dans bio = soutien Palestine.'], tags: ['communauté', 'palestine', 'algospeak'] },
  { emoji: '🌻', signification: "Solidarité avec l'Ukraine (fleur nationale).", exemples: ['🌻🇺🇦 = soutien Ukraine.'], tags: ['communauté', 'ukraine'] },
  { emoji: '⚧️', signification: "Drapeau / symbole transgenre (Unicode 13.0). Marqueur d'appartenance à la communauté trans, fréquemment ciblé par le harcèlement.", exemples: ['⚧️ en bio = personne trans.'], tags: ['communauté', 'trans', 'lgbtqia'] },

  // ─── Flirt / relations ────────────────────────────────────────
  { emoji: '🩷', signification: "Cœur rose : affection non sexuelle, \"ami spécial\". Code popularisé par la série Netflix \"Adolescence\" (2025) dans les communautés incel.", exemples: ['Tu es mon ami spécial 🩷.'], tags: ['flirt', 'incel'] },
  { emoji: '❤️', signification: "Cœur rouge : amour véritable. Pour la Gen Z, c'est le seul \"vrai\" cœur — les autres couleurs codent autre chose.", exemples: ["Je t'❤️ = sérieux."], tags: ['flirt'] },

  // ─── Harcèlement / insulte ────────────────────────────────────
  { emoji: '🐍', signification: "Trahison, \"faux ami\", hypocrite. Aussi insulte sexiste ou homophobe selon contexte.", exemples: ['Quel 🐍 ce mec.'], tags: ['harcèlement', 'insulte'] },
  { emoji: '🃏', signification: "Joker : \"loser\" / \"raté\". Variante du 🤡.", exemples: ['Ce gars c\'est un 🃏.'], tags: ['harcèlement', 'insulte'] },
  { emoji: '🍔', signification: "Grossophobie : moquerie sur le poids ou les habitudes alimentaires.", exemples: ["T'as fini ton 🍔 ?"], tags: ['harcèlement', 'grossophobie'] },
  { emoji: '🪳', signification: "Cafard : \"sous-humain\", \"nuisance\". Insulte déshumanisante, parfois à connotation raciste.", exemples: ['Sale 🪳.'], tags: ['harcèlement', 'racisme', 'alerte'] },
  { emoji: '🦗', signification: "Criquet : \"silence gênant\" / \"personne ne te répond\". Utilisé en cyberharcèlement pour signifier \"tu es invisible\".", exemples: ['Tes blagues : 🦗🦗.'], tags: ['harcèlement', 'argot'] },
  { emoji: '💩', signification: "Insulte sur l'hygiène, le dégoût ou la nullité de quelqu'un.", exemples: ["T'sens la 💩."], tags: ['harcèlement', 'insulte'] },
  { emoji: '😂', signification: "Rire moqueur exagéré en cyberharcèlement. Depuis 2023, est aussi un marqueur \"boomer\" — la Gen Z préfère 💀 ou 😭.", exemples: ['😂😂😂 t\'es trop nul.'], tags: ['harcèlement', 'tendance'] },
  { emoji: '🚩', signification: "\"Red flag\" : signal d'alerte sur quelqu'un, signaux toxiques en relation.", exemples: ['Ce mec a 10 🚩.'], tags: ['flirt', 'argot'] },

  // ─── Brainrot / tendance Gen Z & Alpha ────────────────────────
  { emoji: '🗿', signification: "Moai : esthétique \"sigma\" / stoïque. \"Je m'en fous\", virilité froide. Très utilisée par les jeunes garçons en 2024-2026.", exemples: ['Mode 🗿 face aux profs.'], tags: ['brainrot', 'manosphère', 'tendance'] },
  { emoji: '🍷', signification: "Combiné en 🗿🍷 : meme \"fino señores\" / sigma stoïque. Sinon usage normal vin.", exemples: ['🗿🍷 en silence.'], tags: ['brainrot', 'tendance'] },
  { emoji: '🚽', signification: "\"Skibidi toilet\" : meme Gen Alpha massivement viral 2023-2026. Marqueur d'appartenance brainrot.", exemples: ['Skibidi 🚽 sigma.'], tags: ['brainrot', 'tendance'] },
  { emoji: '🦈', signification: "\"Tralalero Tralala\" : personnage du \"Italian brainrot\" (requin avec des Nike). Tendance virale TikTok 2025.", exemples: ['🦈👟 tralalero.'], tags: ['brainrot', 'tendance'] },
  { emoji: '🐊', signification: "\"Bombardiro Crocodilo\" : crocodile-bombardier du Italian brainrot.", exemples: ['🐊✈️ bombardiro.'], tags: ['brainrot', 'tendance'] },
  { emoji: '🩰', signification: "\"Ballerina Cappuccina\" : personnage du Italian brainrot.", exemples: ['🩰☕ ballerina cappuccina.'], tags: ['brainrot', 'tendance'] },
  { emoji: '6️⃣7️⃣', signification: "Meme \"67\" / \"six seven\" : phénomène Gen Alpha 2025 sans signification précise, élu mot de l'année 2025 par Dictionary.com.", exemples: ['6️⃣7️⃣ ! en réaction à n\'importe quoi.'], tags: ['brainrot', 'tendance'] },
  { emoji: '🥶', signification: "Visage froid : sarcasme méchant, détachement \"alpha\", approbation glaciale.", exemples: ['🥶 bro.'], tags: ['brainrot', 'manosphère', 'tendance'] },

  // ─── Réseaux d'exploitation extrême ───────────────────────────
  { emoji: '7️⃣6️⃣4️⃣', signification: "ALERTE FBI : code du réseau criminel \"764\" qui extorque des mineurs en ligne pour les pousser à l'automutilation, à la production d'images CSAM ou au suicide en direct. Présence dans un pseudo, une bio ou un commentaire = signalement immédiat.", exemples: ['\"764\" dans pseudo Discord ou bio TikTok.'], tags: ['exploitation', 'pédocriminalité', 'alerte'] },
];

let added = 0;
let skipped = 0;
const conflicts = [];
for (const e of additions) {
  const key = e.emoji.normalize('NFC');
  if (existingSet.has(key)) {
    conflicts.push(e.emoji);
    skipped++;
    continue;
  }
  existing.push({ ...e, date_ajout: TODAY });
  existingSet.add(key);
  added++;
}

fs.writeFileSync(FILE, JSON.stringify(existing, null, 2) + '\n', 'utf8');

console.log(`Added: ${added}`);
console.log(`Skipped (already present): ${skipped}`);
if (conflicts.length) console.log('Conflicts:', conflicts.join(' '));
console.log(`Total in file: ${existing.length}`);
