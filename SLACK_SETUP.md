# 📢 Configuration des Notifications Slack

## 🔧 Configuration initiale

### 1. Créer un webhook Slack

1. **Allez sur https://api.slack.com/apps**
2. **Créez une nouvelle app** ou sélectionnez une existante
3. **Activez 'Incoming Webhooks'** dans les fonctionnalités
4. **Créez un nouveau webhook** pour votre canal
5. **Copiez l'URL** (format: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`)

### 2. Configuration GitHub (pour déploiement automatique)

1. **Allez sur votre repository** : https://github.com/mireb1/B-2-B
2. **Settings** > **Secrets and variables** > **Actions**
3. **New repository secret** :
   - Name: `SLACK_WEBHOOK`
   - Value: `https://hooks.slack.com/services/YOUR/WEBHOOK/URL`
4. **Cliquez sur "Add secret"**

### 3. Configuration locale (pour monitoring)

```bash
# Ajouter au fichier ~/.bashrc ou ~/.zshrc
export SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

# Ou créer un fichier .env dans le projet
echo "SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL" >> .env
```

## 🧪 Test des notifications

### Test rapide
```bash
# Avec URL directe
./test-slack.sh "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

# Avec variable d'environnement
export SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
./test-slack.sh
```

### Test du monitoring
```bash
# Définir la variable d'environnement
export SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

# Tester une alerte
./monitor.sh check
```

## 📱 Types de notifications

### 1. Déploiement réussi
- ✅ Message de succès
- 🌐 Lien vers le site
- 🚀 Branche déployée
- ⏰ Timestamp

### 2. Déploiement échoué
- ❌ Message d'erreur
- 🔗 Lien vers les logs GitHub
- 🚀 Branche concernée
- ⏰ Timestamp

### 3. Alertes de monitoring
- 🚨 Type d'alerte
- 📊 Détails du problème
- 🔗 Informations contextuelles
- ⏰ Timestamp

## 🛠️ Personnalisation

### Modifier les messages
Éditez les fichiers :
- `.github/workflows/notify.yml` (notifications GitHub)
- `monitor.sh` (alertes de monitoring)

### Ajouter des canaux
Pour envoyer vers plusieurs canaux, créez plusieurs webhooks et modifiez les scripts.

## 🔐 Sécurité

- ✅ **Utilisez des secrets GitHub** pour les webhooks
- ✅ **Ne commitez jamais** les URLs webhook
- ✅ **Limitez les permissions** du webhook Slack
- ✅ **Révoquez et recréez** si compromis

## 📊 Monitoring des notifications

Les notifications sont envoyées pour :
- ✅ Déploiement réussi
- ❌ Déploiement échoué
- 🚨 Erreurs de monitoring
- 📈 Alertes de performance (si configuré)

## 🔧 Dépannage

### Problème courant: "webhook_url is invalid"
- Vérifiez l'URL webhook
- Assurez-vous que le webhook est actif
- Vérifiez les permissions du bot Slack

### Problème: Messages non reçus
- Vérifiez le canal Slack
- Vérifiez les permissions
- Testez avec `./test-slack.sh`

### Problème: Erreur 404
- Le webhook a peut-être été révoqué
- Recréez un nouveau webhook
- Mettez à jour la configuration
