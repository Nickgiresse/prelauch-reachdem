"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.API_RESENT_KEY);

export async function sendMail(to: string, subject: string, html: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Reachdem <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      throw new Error(`Erreur d'envoi d'email: ${error.message}`);
    }

    console.log("Email envoyé avec succès:", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi d'email:", error);
    throw error;
  }
}
