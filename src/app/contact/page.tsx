'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'question',
    consent: false,
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    if (!formData.consent) {
      setError('Veuillez accepter notre politique de confidentialité.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Envoi via Web3Forms
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORM_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
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
        <div className="min-h-screen flex flex-col">
          <main className="container mx-auto px-4 py-12 flex-grow flex flex-col justify-center">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 max-w-2xl mx-auto">
              <p className="text-green-700">
                Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    message: '',
                    subject: 'question',
                    consent: false,
                  });
                }}
                className="text-blue-500 hover:underline"
              >
                Envoyer un autre message
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Contactez-nous</h1>
          
          <p className="mb-6 text-gray-700">
            Une question, une suggestion, un partenariat ? N&apos;hésitez pas à nous contacter via ce formulaire et nous vous répondrons dans les plus brefs délais.
          </p>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
            />
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Sujet *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="question">Question générale</option>
                <option value="suggestion">Suggestion</option>
                <option value="signalement">Signalement de contenu</option>
                <option value="partenariat">Proposition de partenariat</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message..."
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
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
                J&apos;accepte que mes données soient utilisées dans le cadre de ma demande de contact conformément à la politique de confidentialité *
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
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
