"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.API_RESENT_KEY);

async function AddEmailContact(email: string) {
  try {
    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.AUDIENCE_ID || "",
    });

    if (error) {
      console.error("Erreur lors de l'ajout du contact:", error);
      throw new Error(`Erreur d'ajout de contact: ${error.message}`);
    }

    console.log("Contact ajouté avec succès:", data);
    return data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du contact:", error);
    throw error;
  }
}

export default AddEmailContact; 