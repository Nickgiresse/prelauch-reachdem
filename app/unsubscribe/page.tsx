'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Composant de chargement
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement...</p>
      </div>
    </div>
  </div>
);

// Composant principal qui utilise useSearchParams
const UnsubscribeContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams ? searchParams.get("email") || "" : "";
  
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUnsubscribe = async () => {
    if (!email) {
      setError("Aucun email trouvé dans les paramètres");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setUnsubscribed(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erreur lors du désabonnement');
      }
    } catch {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Désabonnement
        </h1>
        
        {!unsubscribed ? (
          <div>
            <p className="text-gray-600 mb-4">
              Êtes-vous sûr de vouloir vous désabonner de notre newsletter ?
            </p>
            {email && (
              <p className="text-sm text-gray-500 mb-4">
                Email: {email}
              </p>
            )}
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <button
              onClick={handleUnsubscribe}
              disabled={loading || !email}
              className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Désabonnement...' : 'Me désabonner'}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-green-600 text-4xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Désabonnement réussi
            </h2>
            <p className="text-gray-600">
              Vous avez été désabonné avec succès de notre newsletter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant principal avec Suspense (obligatoire pour Next.js 15)
const UnsubscribePage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UnsubscribeContent />
    </Suspense>
  );
};

export default UnsubscribePage;