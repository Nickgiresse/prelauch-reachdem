# ReachDem Newsletter

Une application Next.js moderne pour gérer les inscriptions à la newsletter avec fonctionnalités de désabonnement.

## Fonctionnalités

- ✅ Formulaire d'inscription avec nom et email
- ✅ Template d'email personnalisé avec le nom
- ✅ Intégration avec Resend pour l'envoi d'emails
- ✅ Page de désabonnement moderne et fonctionnelle
- ✅ Gestion des erreurs et états de chargement
- ✅ Design responsive et animations

## Installation

1. Clonez le repository :
```bash
git clone <repository-url>
cd lauch-reachdem
```

2. Installez les dépendances :
```bash
pnpm install
```

3. Configurez les variables d'environnement :
Créez un fichier `.env.local` avec :
```env
API_RESENT_KEY=your_resend_api_key_here
AUDIENCE_ID=your_audience_id_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Lancez le serveur de développement :
```bash
pnpm dev
```

## Configuration Resend

1. Créez un compte sur [Resend](https://resend.com)
2. Obtenez votre clé API dans les paramètres
3. Créez une audience pour gérer vos contacts
4. Configurez votre domaine d'envoi

## Structure du projet

```
├── app/
│   ├── actions/
│   │   ├── add-email-contact.tsx    # Ajout de contacts Resend
│   │   └── send-email.ts            # Envoi d'emails
│   ├── unsubscribe/
│   │   └── page.tsx                 # Page de désabonnement
│   └── page.tsx                     # Page d'accueil
├── components/
│   ├── email-templates/
│   │   └── NewsletterWelcome.tsx    # Template d'email
│   ├── hero201.tsx                  # Composant principal
│   ├── newletter.tsx                # Formulaire d'inscription
│   └── ui/                          # Composants UI
└── pages/
    └── api/
        └── unsubscribe.ts           # API de désabonnement
```

## Utilisation

1. **Inscription** : Les utilisateurs peuvent s'inscrire via le formulaire sur la page d'accueil
2. **Email de bienvenue** : Un email personnalisé est envoyé avec le nom de l'utilisateur
3. **Désabonnement** : Les utilisateurs peuvent se désabonner via le lien dans l'email

## Technologies utilisées

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Resend (API d'emails)
- React Email (templates d'emails)

## Déploiement

L'application peut être déployée sur Vercel, Netlify ou tout autre plateforme supportant Next.js.

N'oubliez pas de configurer les variables d'environnement sur votre plateforme de déploiement.
