import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { sendMail } from "@/app/actions/send-email";
import NewsletterWelcome from "./email-templates/NewsletterWelcome";
import AddEmailContact from "@/app/actions/add-email-contact";
import { render } from "@react-email/render";

export function Newletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDebug("");
    
    try {
      console.log("Début de l'envoi d'email...");
      setDebug("Ajout du contact...");
      
      // Ajouter l'email à la liste de contacts
      await AddEmailContact(email);
      console.log("Contact ajouté avec succès");
      setDebug("Contact ajouté, génération du template...");
      
      // Générer le lien de désabonnement
      const unsubscribeLink = `${window.location.origin}/unsubscribe?email=${encodeURIComponent(email)}`;
      console.log("Lien de désabonnement:", unsubscribeLink);
      
      // Créer le template d'email avec le nom personnalisé
      const emailTemplate = NewsletterWelcome({ 
        name: name || "Link by Reachdem", 
        unsubscribeLink 
      });
      console.log("Template créé");
      setDebug("Template créé, génération HTML...");
      
      // Rendre le template en HTML string
      const html = await render(emailTemplate);
      console.log("HTML généré, longueur:", html.length);
      console.log("Premiers 200 caractères:", html.substring(0, 200));
      setDebug("HTML généré, envoi de l'email...");
      
      // Envoyer l'email
      const result = await sendMail(
        email, 
        "Bienvenue dans la newsletter Reachdem", 
        html
      );
      console.log("Email envoyé avec succès:", result);
      setDebug("Email envoyé avec succès !");
      
      setSent(true);
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      setDebug(`Erreur: ${errorMessage}`);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center gap-2">
        <Input
          type="text"
          placeholder="Votre nom"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <Button type="submit" variant="outline" disabled={sent || loading} className="bg-[#FB953C] text-white hover:bg-[#FB953C]/90 hover:text-white">
          {loading ? "Envoi..." : sent ? "Envoyé !" : "Subscribe"}
        </Button>
      </form>
      
      {debug && (
        <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
          Debug: {debug}
        </div>
      )}
    </div>
  );
}