'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProposerPage() {
  const searchParams = useSearchParams();
  const initialEmoji = searchParams.get('emoji') || '';
  
  const [formData, setFormData] = useState({
    emoji: initialEmoji,
    signification: '',
    exemples: '',
    email: '',
    consent: false
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setFormData(prev => ({ ...prev, emoji: initialEmoji }));
  }, [initialEmoji]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.emoji || !formData.signification) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    if (!formData.consent) {
      setError('Veuillez accepter les conditions d\'utilisation.');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORM_ACCESS_KEY,
          subject: 'Nouvelle proposition emoji',
          from_name: 'DecodEmojis',
          emoji: formData.emoji,
          signification: formData.signification,
          exemples: formData.exemples,
          email: formData.email,
        })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setError('');
      } else {
        setError("Erreur lors de l'envoi. Veuillez réessayer.");
      }
    } catch {
      setError("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };
  
  if (submitted) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-700">
              Merci pour votre contribution ! Votre proposition a été enregistrée et sera examinée par notre équipe.
            </p>
          </div>
          
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                emoji: '',
                signification: '',
                exemples: '',
                email: '',
                consent: false
              });
            }}
            className="text-blue-500 hover:underline"
          >
            Proposer une autre définition
          </button>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Proposer une définition</h1>
          
          <p className="mb-6 text-gray-700">
            Aidez-nous à enrichir notre dictionnaire en proposant de nouvelles définitions ou significations d&apos;emojis.
            Vos contributions permettent de garder notre base à jour avec les dernières tendances.
          </p>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="emoji" className="block text-sm font-medium text-gray-700 mb-1">
                Emoji *
              </label>
              <input
                type="text"
                id="emoji"
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                placeholder="Insérez l'emoji ici"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="signification" className="block text-sm font-medium text-gray-700 mb-1">
                Signification *
              </label>
              <textarea
                id="signification"
                name="signification"
                value={formData.signification}
                onChange={handleChange}
                placeholder="Décrivez la signification de cet emoji..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="exemples" className="block text-sm font-medium text-gray-700 mb-1">
                Exemples d&apos;utilisation
              </label>
              <textarea
                id="exemples"
                name="exemples"
                value={formData.exemples}
                onChange={handleChange}
                placeholder="Donnez des exemples d'utilisation, un par ligne..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">Un exemple par ligne</p>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (optionnel)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Uniquement pour vous informer quand votre contribution sera publiée
              </p>
            </div>
            
            <div className="flex items-start">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleCheckboxChange}
                className="mt-1 mr-2"
                required
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                J&apos;accepte que ma contribution soit publiée sur DecodEmojis et je confirme qu&apos;elle ne contient pas de contenu inapproprié *
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Envoi en cours...' : 'Soumettre ma proposition'}
              </button>
            </div>
            
            <p className="text-xs text-gray-500">* Champs obligatoires</p>
            <p className="text-xs text-gray-400 mt-2">Les formulaires de ce site utilisent le service Web3Forms pour l’envoi sécurisé de vos messages.</p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
