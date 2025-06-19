import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="text-3xl font-bold mb-4">Page non trouvée</h1>
          <p className="text-gray-600 mb-6">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link 
            href="/" 
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors inline-block"
          >
            Retourner à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
