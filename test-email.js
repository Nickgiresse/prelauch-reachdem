// Script de test pour vérifier l'envoi d'email
// Utilisez: node test-email.js

import { Resend } from 'resend';
import { render } from '@react-email/render';
import NewsletterWelcome from './components/email-templates/NewsletterWelcome.js';

const resend = new Resend(process.env.API_RESENT_KEY);

async function testEmail() {
  try {
    // Créer le template d'email
    const emailTemplate = NewsletterWelcome({
      name: "Test User",
      unsubscribeLink: "https://example.com/unsubscribe?email=test@example.com"
    });

    // Rendre en HTML
    const html = render(emailTemplate);

    console.log("HTML généré:", html.substring(0, 200) + "...");

    // Envoyer l'email de test
    const { data, error } = await resend.emails.send({
      from: "Reachdem <onboarding@resend.dev>",
      to: "test@example.com", // Remplacez par votre email de test
      subject: "Test Newsletter Welcome",
      html,
    });

    if (error) {
      console.error("Erreur:", error);
    } else {
      console.log("Email envoyé avec succès:", data);
    }
  } catch (error) {
    console.error("Erreur:", error);
  }
}

testEmail(); 