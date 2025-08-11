# Guide de dépannage - Envoi d'emails

## Problème : L'email s'enregistre dans Resend mais le destinataire ne reçoit pas le message

### Solutions possibles :

#### 1. **Vérifier la configuration Resend**

Assurez-vous que votre compte Resend est correctement configuré :

- ✅ Vérifiez que votre clé API est valide
- ✅ Vérifiez que votre domaine d'envoi est configuré
- ✅ Vérifiez que vous n'avez pas dépassé les limites d'envoi

#### 2. **Vérifier les variables d'environnement**

Créez un fichier `.env.local` avec :

```env
API_RESENT_KEY=re_votre_cle_api_ici
AUDIENCE_ID=votre_audience_id_ici
```

#### 3. **Tester avec un email simple**

Utilisez le composant de test sur la page d'accueil pour envoyer un email simple et vérifier que l'envoi fonctionne.

#### 4. **Vérifier les logs**

Ouvrez la console du navigateur (F12) et regardez les logs lors de l'envoi d'email.

#### 5. **Problèmes courants**

**Problème : "Invalid API key"**
- Solution : Vérifiez que votre clé API est correcte

**Problème : "Domain not verified"**
- Solution : Vérifiez votre domaine dans les paramètres Resend

**Problème : "Rate limit exceeded"**
- Solution : Attendez ou upgradez votre plan Resend

**Problème : Email dans les spams**
- Solution : Vérifiez votre réputation d'envoi et configurez SPF/DKIM

#### 6. **Test étape par étape**

1. Testez d'abord avec un email simple (composant TestEmail)
2. Si ça fonctionne, testez avec le template NewsletterWelcome
3. Vérifiez que le HTML généré est valide
4. Vérifiez que les liens de désabonnement sont corrects

#### 7. **Debug avancé**

Ajoutez ces logs dans `components/newletter.tsx` :

```javascript
console.log("API Key:", process.env.API_RESENT_KEY ? "Présent" : "Manquant");
console.log("HTML généré:", html.substring(0, 500));
```

#### 8. **Alternative : Email de test**

Si le problème persiste, utilisez un email de test simple :

```javascript
const testHtml = `
  <html>
    <body>
      <h1>Test</h1>
      <p>Email de test</p>
    </body>
  </html>
`;
```

### Contact

Si le problème persiste, vérifiez :
- Les logs Resend dans votre dashboard
- La configuration de votre domaine
- Les limites de votre plan Resend 