"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { sendMail } from "@/app/actions/send-email";

export function TestEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleTestEmail = async () => {
    if (!email) {
      setResult("Veuillez entrer un email");
      return;
    }

    setLoading(true);
    setResult("Envoi en cours...");

    try {
      const html = `
        <html>
          <body>
            <h1>Test Email</h1>
            <p>Ceci est un email de test pour vérifier que l'envoi fonctionne.</p>
            <p>Email: ${email}</p>
            <p>Date: ${new Date().toLocaleString()}</p>
          </body>
        </html>
      `;

      const data = await sendMail(email, "Test Email - ReachDem", html);
      setResult(`Email envoyé avec succès! ID: ${data?.id || 'N/A'}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      setResult(`Erreur: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded">
      <h3 className="text-lg font-semibold">Test Email</h3>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Email de test"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleTestEmail} disabled={loading}>
          {loading ? "Envoi..." : "Tester"}
        </Button>
      </div>
      {result && (
        <div className={`text-sm p-2 rounded ${
          result.includes("Erreur") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
        }`}>
          {result}
        </div>
      )}
    </div>
  );
} 