import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Mentions Légales</h1>
          
          <div className="prose prose-blue">
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">1. Présentation du site</h2>
              <p>
                Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site DecodEmojis les informations suivantes :
              </p>
              <p className="mt-3">
                <strong>Nom du site :</strong> DecodEmojis<br />
                <strong>URL :</strong> www.decodemojis.fr<br />
                <strong>Objet :</strong> Dictionnaire collaboratif d'emojis
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">2. Conditions d'utilisation</h2>
              <p>
                L'utilisation du présent site implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment, sans préavis. Les utilisateurs sont donc invités à les consulter de manière régulière.
              </p>
              <p className="mt-3">
                Ce site est accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée, qui sera alors annoncée aux utilisateurs si possible.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">3. Contributions des utilisateurs</h2>
              <p>
                Le site permet aux utilisateurs de contribuer à son contenu. Les utilisateurs peuvent proposer des définitions d'emojis qui seront soumises à validation avant publication.
              </p>
              <p className="mt-3">
                Les utilisateurs s'engagent à ce que leurs contributions soient conformes aux lois et règlements en vigueur, notamment :
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Ne pas porter atteinte à la vie privée d'autrui</li>
                <li>Ne pas diffuser de contenus diffamatoires, injurieux, racistes ou discriminatoires</li>
                <li>Ne pas diffuser de contenus pornographiques ou contraires aux bonnes mœurs</li>
                <li>Ne pas inciter à la violence ou à la haine</li>
              </ul>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">4. Propriété intellectuelle</h2>
              <p>
                Tout le contenu du site, incluant, de façon non limitative, les graphismes, images, textes, vidéos, logos, marques, etc. ainsi que leur mise en forme sont la propriété exclusive de DecodEmojis, à l'exception des marques, logos ou contenus appartenant à d'autres organisations partenaires ou auteurs.
              </p>
              <p className="mt-3">
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de DecodEmojis ou des titulaires des droits concernés.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3">5. Contact</h2>
              <p>
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter via notre{' '}
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
