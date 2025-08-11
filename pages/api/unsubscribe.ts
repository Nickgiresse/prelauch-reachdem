import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.API_RESENT_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Valider le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Marquer l'utilisateur comme désabonné dans Resend
    try {
      await resend.contacts.update({
        email,
        unsubscribed: true,
        audienceId: process.env.AUDIENCE_ID || "",
      });
    } catch (resendError) {
      console.error("Resend error:", resendError);
      // Si l'email n'existe pas dans Resend, on considère quand même le désabonnement comme réussi
    }

    // Ici vous pourriez aussi mettre à jour votre base de données locale
    // await updateUserUnsubscribeStatus(email);

    return res.status(200).json({ 
      success: true, 
      message: "User successfully unsubscribed" 
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return res.status(500).json({ 
      error: "Internal server error" 
    });
  }
}
