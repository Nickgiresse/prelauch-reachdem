"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const UnsubscribePage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUnsubscribe = async () => {
    if (!email) {
      setError("Email non trouvé");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setUnsubscribed(true);
      } else {
        setError("Erreur lors du désabonnement");
      }
    } catch (_error) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              className="w-8 h-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Se désabonner
          </h1>
          
          {email && (
            <p className="text-gray-600 mb-6">
              Email: <span className="font-semibold">{email}</span>
            </p>
          )}

          {!unsubscribed ? (
            <>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Êtes-vous sûr de vouloir vous désabonner de notre newsletter ? 
                Vous ne recevrez plus nos actualités et contenus exclusifs.
              </p>
              
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 mb-4 text-sm"
                >
                  {error}
                </motion.p>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={handleUnsubscribe}
                  disabled={loading}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  {loading ? "Désabonnement..." : "Se désabonner"}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  disabled={loading}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Désabonnement réussi !
              </h2>
              
              <p className="text-gray-700 mb-6">
                Vous avez été désabonné avec succès de notre newsletter.
                Vous ne recevrez plus nos emails.
              </p>
              
              <Button
                onClick={() => window.location.href = "/"}
                className="bg-orange-600 hover:bg-orange-700"
              >
               {" Retour à l'accueil"}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UnsubscribePage; 