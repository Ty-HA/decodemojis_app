import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CGUPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Conditions Générales d&apos;Utilisation</h1>
          
          <div className="prose prose-blue">
            <p className="mb-4 text-gray-600">
              Dernière mise à jour : 19 juin 2025
            </p>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">1. Acceptation des conditions</h2>
              <p>
                En utilisant le site DecodEmojis, vous acceptez pleinement et sans réserve les présentes conditions générales d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser ce site.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">2. Description du service</h2>
              <p>
                DecodEmojis est un dictionnaire collaboratif d&apos;emojis conçu pour aider parents, jeunes et éducateurs à comprendre et décrypter la signification des emojis utilisés en ligne.
              </p>
              <p className="mt-3">
                Notre service permet :
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>De consulter la signification des emojis</li>
                <li>De rechercher des emojis par symbole ou signification</li>
                <li>De contribuer en proposant de nouvelles définitions</li>
                <li>De contacter l&apos;équipe pour toute question ou suggestion</li>
              </ul>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">3. Utilisation du service</h2>
              <p>
                L&apos;utilisation du service DecodEmojis est gratuite et ouverte à tous. Cependant, vous vous engagez à l&apos;utiliser conformément à sa destination et à ne pas:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Utiliser le service à des fins illégales</li>
                <li>Tenter d&apos;accéder à des zones non autorisées du site</li>
                <li>Interférer avec le fonctionnement normal du site</li>
                <li>Soumettre des contenus inappropriés</li>
              </ul>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">4. Contributions des utilisateurs</h2>
              <p>
                En soumettant une proposition de définition ou tout autre contenu sur DecodEmojis, vous accordez à DecodEmojis le droit non exclusif, transférable, sous-licenciable, gratuit et mondial d&apos;utiliser ce contenu pour le service.
              </p>
              <p className="mt-3">
                Les contributions sont soumises à validation avant publication. DecodEmojis se réserve le droit de refuser ou de modifier toute contribution qui ne respecterait pas les présentes conditions ou qui serait inappropriée.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">5. Modération</h2>
              <p>
                Afin de maintenir un environnement sûr et respectueux, nos équipes modèrent régulièrement les contributions. Les contenus suivants seront systématiquement refusés :
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Contenus à caractère discriminatoire, raciste ou incitant à la haine</li>
                <li>Contenus pornographiques ou contraires aux bonnes mœurs</li>
                <li>Contenus diffamatoires ou injurieux</li>
                <li>Informations personnelles ou confidentielles concernant des tiers</li>
                <li>Contenus promouvant des activités illégales</li>
              </ul>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">6. Limitation de responsabilité</h2>
              <p>
                DecodEmojis s&apos;efforce de fournir des informations aussi précises que possible. Toutefois, nous ne pouvons garantir l&apos;exactitude, la complétude ou l&apos;actualité des informations diffusées sur le site.
              </p>
              <p className="mt-3">
                Les définitions d&apos;emojis peuvent varier selon les contextes et les régions. Nous ne saurions être tenus responsables d&apos;une mauvaise interprétation des informations fournies.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">7. Modification des conditions</h2>
              <p>
                DecodEmojis se réserve le droit de modifier ces conditions générales d&apos;utilisation à tout moment. Les utilisateurs seront informés des modifications substantielles par une notification sur le site.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
              <p>
                Pour toute question concernant ces conditions générales d&apos;utilisation, vous pouvez nous contacter via notre{' '}
                <Link href="/contact" className="text-blue-500 hover:underline">
                  formulaire de contact
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
