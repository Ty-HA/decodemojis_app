import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Ressources : signaler, écouter, comprendre",
  description:
    "Numéros d'urgence, lignes d'écoute, services de signalement officiels et sources documentaires institutionnelles (Police nationale, FBI, DEA, ADL, CIIVISE, e-Enfance, MILDECA…) pour aider parents, ados et éducateurs.",
  alternates: { canonical: '/ressources' },
  openGraph: {
    title: "Ressources : signaler, écouter, comprendre | DecodEmojis",
    description:
      "Numéros d'urgence, signalement, écoute, prévention et sources documentaires officielles.",
    url: '/ressources',
    type: 'website',
  },
};

type LinkItem = {
  label: string;
  href: string;
  desc?: string;
  external?: boolean;
};

const urgences: LinkItem[] = [
  { label: '15 — SAMU', href: 'tel:15', desc: 'Urgence médicale et psychiatrique vitale.' },
  { label: '17 — Police / Gendarmerie', href: 'tel:17', desc: 'Urgence policière, mineur en danger immédiat.' },
  { label: '119 — Enfance en danger', href: 'tel:119', desc: 'Numéro national gratuit, 24h/24, 7j/7. SMS et chat possibles.', external: true },
  { label: '3018 — Cyberharcèlement', href: 'tel:3018', desc: 'Violences numériques, retrait de contenu, écoute. Appli mobile dédiée.', external: true },
  { label: '3114 — Prévention du suicide', href: 'tel:3114', desc: 'Numéro national 24h/24, opéré par le ministère de la Santé.', external: true },
  { label: '3919 — Violences faites aux femmes', href: 'tel:3919', desc: 'Anonyme et gratuit, 24h/24.', external: true },
  { label: '114 — Urgences sourds et malentendants', href: 'tel:114', desc: 'SMS, fax ou conversation totale pour toutes urgences.' },
];

const signaler: LinkItem[] = [
  { label: 'Pharos — Signalement de contenus illicites', href: 'https://www.masecurite.interieur.gouv.fr/fr/demarches-en-ligne/portail-officiel-signalement-contenus-illicites-internet-pharos', desc: 'Portail officiel du Ministère de l\'Intérieur. Pédocriminalité, terrorisme, haine en ligne, escroquerie.', external: true },
  { label: 'e-Enfance / 3018', href: 'https://www.e-enfance.org/numero-3018/', desc: 'Association reconnue d\'utilité publique, partenaire officiel du 3018. Retrait de contenus, accompagnement.', external: true },
  { label: 'Allo 119 — Enfance en danger', href: 'https://www.allo119.gouv.fr/', desc: 'GIP France Enfance Protégée. Signaler une situation de maltraitance.', external: true },
  { label: 'Point de Contact', href: 'https://www.pointdecontact.net/', desc: 'Association FR habilitée par INHOPE/Internet Watch Foundation. Signalement contenus pédocriminels.', external: true },
  { label: 'Cybermalveillance.gouv.fr', href: 'https://www.cybermalveillance.gouv.fr/', desc: 'GIP ACYMA. Diagnostic, assistance, dépôt de plainte en ligne pour victimes.', external: true },
];

const ecoute: LinkItem[] = [
  { label: '3114.fr — Prévention du suicide', href: 'https://3114.fr/', desc: 'Site officiel du dispositif national, ressources pour les proches.', external: true },
  { label: 'Suicide Écoute', href: 'https://www.suicide-ecoute.fr/', desc: 'Association historique (1994), 01 45 39 40 00, 24h/24.', external: true },
  { label: 'Drogues Info Service', href: 'https://www.drogues-info-service.fr/', desc: 'Opéré par Santé publique France. 0 800 23 13 13, anonyme et gratuit.', external: true },
  { label: 'Maisons des Adolescents', href: 'https://anmda.fr/les-mda/annuaire/', desc: 'Annuaire officiel. Accueil gratuit pour les 11-21 ans dans toute la France.', external: true },
  { label: 'Arrêtons les violences', href: 'https://arretonslesviolences.gouv.fr/', desc: 'Plateforme gouvernementale. 3919 + chat anonyme 24h/24.', external: true },
];

const prevention: LinkItem[] = [
  { label: 'Internet Sans Crainte', href: 'https://www.internetsanscrainte.fr/', desc: 'Programme national de sensibilisation au numérique (Safer Internet UE).', external: true },
  { label: 'Non au Harcèlement (Éducation nationale)', href: 'https://www.education.gouv.fr/non-au-harcelement', desc: 'Programme PHARE et ressources pour parents, élèves, personnels.', external: true },
  { label: 'CIIVISE', href: 'https://www.ciivise.fr/', desc: 'Commission indépendante sur l\'inceste et les violences sexuelles faites aux enfants. Témoigner et ressources.', external: true },
  { label: 'CNIL — Accompagner son enfant', href: 'https://www.cnil.fr/fr/accompagnez-votre-enfant-pour-un-usage-dinternet-plus-sur', desc: 'Conseils officiels pour la protection des données et la vie privée des mineurs.', external: true },
  { label: 'MILDECA', href: 'https://www.mildeca.gouv.fr/', desc: 'Mission interministérielle de lutte contre les drogues et conduites addictives. Données officielles.', external: true },
  { label: 'Santé publique France', href: 'https://www.santepubliquefrance.fr/', desc: 'Agence nationale de santé publique. Études et campagnes de prévention.', external: true },
];

const sources: LinkItem[] = [
  { label: 'DEA — Emoji Drug Code Decoded (PDF)', href: 'https://www.dea.gov/sites/default/files/2022-04/Emoji%20Decoded_FO%20One%20Page_v2.pdf', desc: 'Document officiel de la Drug Enforcement Administration (US, 2022). Codes emoji utilisés par les dealers.', external: true },
  { label: 'DEA — Facts About Fentanyl', href: 'https://www.dea.gov/resources/facts-about-fentanyl', desc: 'Source de référence sur les pilules contrefaites M30 (codes 💙, 🟢).', external: true },
  { label: 'FBI — Alerte sur le réseau 764 (2025)', href: 'https://www.fbi.gov/investigate/cyber/alerts/2025/violent-online-networks-target-vulnerable-and-underage-populations-across-the-united-states-and-around-the-globe', desc: 'Alerte officielle du FBI sur les réseaux d\'extorsion ciblant les mineurs.', external: true },
  { label: 'ADL — Coded Hate (emojis détournés)', href: 'https://www.adl.org/resources/article/coded-hate-extremists-weaponize-seemingly-innocuous-content-promote-bigotry', desc: 'Anti-Defamation League. Référence académique sur les emojis détournés par les extrémistes.', external: true },
  { label: 'ADL — Hate Symbols Database', href: 'https://www.adl.org/hate-symbols', desc: 'Base de données de référence sur les symboles de haine (Pepe 🐸, codes numériques 1488, 88, 14, etc.).', external: true },
  { label: 'Service-Public.gouv.fr — Cyberharcèlement', href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F32239', desc: 'Cadre légal officiel et démarches en France.', external: true },
];

const actualites: { titre: string; date: string; resume: string; href: string; source: string }[] = [
  {
    titre: 'Verdict du procès des viols de Mazan (affaire Pelicot)',
    date: '19 décembre 2024',
    resume:
      "Procès historique sur la soumission chimique : Dominique Pelicot et 50 coaccusés condamnés. L'affaire a remis au cœur du débat public l'usage de benzodiazépines, GHB et autres substances pour droguer une victime à son insu. Implications pour la vigilance en boîte, festivals et sphère privée.",
    href: 'https://www.francetvinfo.fr/faits-divers/affaire-des-viols-de-mazan/verdict-du-proces-des-viols-de-mazan-une-peine-de-vingt-ans-de-prison-prononcee-contre-dominique-pelicot-ses-50-coaccuses-tous-reconnus-coupables_6962732.html',
    source: 'franceinfo (service public audiovisuel)',
  },
  {
    titre: 'Série "Adolescence" sur Netflix : la manosphère sous les projecteurs',
    date: 'Mars 2025',
    resume:
      "La mini-série britannique a popularisé en grand public les codes utilisés par les communautés incel et masculinistes : pilules de couleur (🔴 red pill, ⚫ black pill), cœurs codés (🩷, 💛, 💜) et règle dite \"des 80/20\" (💯). Référence éducative pour comprendre la radicalisation en ligne des adolescents.",
    href: 'https://www.franceinfo.fr/culture/series/violence-masculinisme-la-serie-britannique-netflix-adolescence-inquiete-au-royaume-uni_7153302.html',
    source: 'franceinfo (service public audiovisuel)',
  },
  {
    titre: 'Alerte du FBI sur le réseau "764"',
    date: '2024-2025',
    resume:
      "Le FBI alerte sur des groupes en ligne (souvent désignés \"764\", \"CVLT\", \"Court\") qui ciblent des mineurs vulnérables sur Discord, Roblox et Telegram pour les pousser à l'automutilation, au suicide en direct ou à la production d'images. La présence du nombre 764 dans un pseudo, une bio ou une signature doit être signalée immédiatement (Pharos en France).",
    href: 'https://www.fbi.gov/investigate/cyber/alerts/2025/violent-online-networks-target-vulnerable-and-underage-populations-across-the-united-states-and-around-the-globe',
    source: 'FBI (Federal Bureau of Investigation)',
  },
];

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isTel = href.startsWith('tel:');
  return (
    <a
      href={href}
      {...(!isTel ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-indigo-700 hover:text-indigo-900 underline decoration-indigo-300 hover:decoration-indigo-500 underline-offset-2 font-semibold break-words"
    >
      {children}
    </a>
  );
}

function Section({
  id,
  title,
  emoji,
  intro,
  items,
  accent = 'indigo',
}: {
  id: string;
  title: string;
  emoji: string;
  intro?: string;
  items: LinkItem[];
  accent?: 'rose' | 'indigo' | 'amber' | 'emerald' | 'purple';
}) {
  const ringByAccent: Record<string, string> = {
    rose: 'border-rose-200 bg-rose-50/70',
    indigo: 'border-indigo-200 bg-indigo-50/70',
    amber: 'border-amber-200 bg-amber-50/70',
    emerald: 'border-emerald-200 bg-emerald-50/70',
    purple: 'border-purple-200 bg-purple-50/70',
  };
  const titleByAccent: Record<string, string> = {
    rose: 'text-rose-900',
    indigo: 'text-indigo-900',
    amber: 'text-amber-900',
    emerald: 'text-emerald-900',
    purple: 'text-purple-900',
  };
  return (
    <section id={id} className={`mb-10 rounded-3xl border ${ringByAccent[accent]} p-6 md:p-8 shadow-sm`}>
      <h2 className={`text-2xl md:text-3xl font-black mb-2 flex items-center ${titleByAccent[accent]}`}>
        <span className="mr-3 text-3xl" aria-hidden="true">
          {emoji}
        </span>
        {title}
      </h2>
      {intro && <p className="text-gray-700 mb-5 leading-relaxed">{intro}</p>}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href} className="bg-white rounded-2xl p-4 border border-white/60 shadow-sm">
            <ExternalLink href={item.href}>{item.label}</ExternalLink>
            {item.desc && <p className="text-sm text-gray-700 mt-1 leading-relaxed">{item.desc}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function RessourcesPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page title */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-indigo-900 mb-4">
            Ressources & sources officielles
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Tous les liens de cette page sont vérifiés et renvoient à des
            organismes publics français, des associations reconnues d&apos;utilité
            publique, ou des institutions internationales reconnues (FBI, DEA,
            ADL). Aucune source militante ou non vérifiée.
          </p>
        </div>

        {/* Quick TOC */}
        <nav aria-label="Sommaire" className="mb-10 bg-white/80 backdrop-blur rounded-2xl p-5 border border-indigo-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3">Sommaire</p>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <li><a href="#urgences" className="text-rose-700 hover:underline font-semibold">⚠️ Urgences</a></li>
            <li><a href="#signaler" className="text-indigo-700 hover:underline font-semibold">🚨 Signaler</a></li>
            <li><a href="#ecoute" className="text-emerald-700 hover:underline font-semibold">💬 Écoute</a></li>
            <li><a href="#prevention" className="text-purple-700 hover:underline font-semibold">🛡️ Prévention</a></li>
            <li><a href="#actualites" className="text-amber-700 hover:underline font-semibold">📰 Actualités</a></li>
            <li><a href="#sources" className="text-indigo-700 hover:underline font-semibold">📚 Sources</a></li>
          </ul>
        </nav>

        <Section
          id="urgences"
          title="Urgences"
          emoji="⚠️"
          accent="rose"
          intro="En cas de danger immédiat — physique ou psychologique — appelez sans hésiter. Tous ces numéros sont gratuits depuis un téléphone fixe ou mobile, en France métropolitaine et outre-mer."
          items={urgences}
        />

        <Section
          id="signaler"
          title="Signaler un contenu ou un comportement"
          emoji="🚨"
          accent="indigo"
          intro="Pour signaler un contenu illicite (pédocriminalité, haine, terrorisme, escroquerie) ou demander le retrait d'une publication."
          items={signaler}
        />

        <Section
          id="ecoute"
          title="Lignes d'écoute & accompagnement"
          emoji="💬"
          accent="emerald"
          intro="Pour parler, être écouté·e, demander de l'aide. Anonyme et gratuit."
          items={ecoute}
        />

        <Section
          id="prevention"
          title="Prévention & éducation"
          emoji="🛡️"
          accent="purple"
          intro="Ressources officielles pour parents, professionnels de l'éducation et adolescents."
          items={prevention}
        />

        {/* Actualités */}
        <section id="actualites" className="mb-10 rounded-3xl border border-amber-200 bg-amber-50/70 p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black mb-2 flex items-center text-amber-900">
            <span className="mr-3 text-3xl" aria-hidden="true">📰</span>
            Actualités & affaires marquantes
          </h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            Quelques événements récents qui ont fait évoluer la connaissance
            publique des codes en ligne. Chaque référence renvoie à une source
            de presse de service public ou à une institution officielle.
          </p>
          <div className="space-y-4">
            {actualites.map((a) => (
              <article key={a.href} className="bg-white rounded-2xl p-5 border border-white/60 shadow-sm">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-lg font-bold text-amber-900">{a.titre}</h3>
                  <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {a.date}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3 text-sm">{a.resume}</p>
                <ExternalLink href={a.href}>Lire sur {a.source} →</ExternalLink>
              </article>
            ))}
          </div>
        </section>

        <Section
          id="sources"
          title="Sources documentaires"
          emoji="📚"
          accent="indigo"
          intro="Les définitions du dictionnaire DecodEmojis s'appuient sur ces sources institutionnelles. Vous pouvez les consulter directement pour aller plus loin."
          items={sources}
        />

        {/* Editorial note */}
        <section className="mb-10 rounded-3xl bg-gradient-to-br from-indigo-50 to-rose-50 p-6 md:p-8 border border-indigo-100">
          <h2 className="text-xl md:text-2xl font-black mb-3 text-indigo-900 flex items-center">
            <span className="mr-2" aria-hidden="true">📝</span>
            Note éditoriale
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            <p>
              <strong>Aucun emoji isolé ne signifie quoi que ce soit.</strong> Un
              code n&apos;a de sens qu&apos;associé à un contexte (pseudo, message,
              relation, changement de comportement). Cette page documente ce qui
              <em> peut </em> être un signal, jamais un diagnostic.
            </p>
            <p>
              <strong>Sources écartées.</strong> Ce site ne référence pas de
              blogs militants, de médias d&apos;extrême droite, de chaînes
              YouTube de complotisme ou de sites tirant des conclusions de
              codes vus isolément. En cas de doute sur une source, écrivez-nous
              via la page <Link href="/contact" className="text-indigo-700 underline">Contact</Link>.
            </p>
            <p>
              <strong>Mise à jour.</strong> Les codes évoluent rapidement. La
              dernière révision documentaire de cette page est datée de{' '}
              <time dateTime="2026-05-04">mai 2026</time>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
