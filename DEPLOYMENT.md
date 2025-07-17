# 🚀 Guide de Configuration pour le Déploiement Automatique

## 📋 Étapes de Configuration

### 1. Activation de GitHub Pages

1. Allez sur votre repository GitHub : https://github.com/mireb1/B-2-B
2. Cliquez sur **Settings** (dans l'onglet du repository)
3. Faites défiler jusqu'à **Pages** dans le menu de gauche
4. Sous **Source**, sélectionnez **GitHub Actions**
5. Cliquez sur **Save**

### 2. Configuration des Permissions

1. Dans **Settings** > **Actions** > **General**
2. Sous **Workflow permissions**, sélectionnez **Read and write permissions**
3. Cochez **Allow GitHub Actions to create and approve pull requests**
4. Cliquez sur **Save**

### 3. Déploiement Automatique

Le déploiement se déclenche automatiquement à chaque push sur la branche `main`.

**URLs de déploiement :**
- GitHub Pages : https://mireb1.github.io/B-2-B/
- Netlify (optionnel) : Connectez votre repo à Netlify

### 4. Surveillance Automatique (Local)

Pour surveiller les changements et redéployer automatiquement :

```bash
# Démarrer la surveillance
./auto-deploy.sh start

# Vérifier le statut
./auto-deploy.sh status

# Voir les logs
./auto-deploy.sh logs

# Arrêter la surveillance
./auto-deploy.sh stop
```

### 5. Déploiement Docker

```bash
# Construire l'image
docker build -t b2b-marketplace .

# Lancer le conteneur
docker run -p 80:80 b2b-marketplace

# Ou utiliser docker-compose
docker-compose up -d
```

### 6. Déploiement sur Netlify

1. Connectez-vous à https://netlify.com
2. Cliquez sur **New site from Git**
3. Sélectionnez votre repository GitHub
4. Les paramètres sont automatiquement configurés via `netlify.toml`

## 🔧 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarrer le serveur de développement |
| `npm run build` | Construire pour la production |
| `npm run preview` | Prévisualiser le build |
| `./deploy.sh` | Déploiement manuel |
| `./auto-deploy.sh start` | Surveillance automatique |

## 🌐 URLs d'Accès

- **Développement** : http://localhost:3000
- **GitHub Pages** : https://mireb1.github.io/B-2-B/
- **Netlify** : https://[nom-du-site].netlify.app

## 📊 Monitoring

- Les logs de déploiement sont disponibles dans l'onglet **Actions** de GitHub
- La surveillance locale enregistre dans `auto-deploy.log`
- Les notifications peuvent être configurées dans `deploy.sh`

## 🔐 Comptes de Test

**Administrateur :**
- Email : admin@example.com
- Mot de passe : admin123

**Utilisateur :**
- Email : user@example.com
- Mot de passe : user123

## 🛠️ Résolution des Problèmes

### Erreur de Build
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problème de Permissions GitHub
1. Vérifiez les permissions dans Settings > Actions
2. Assurez-vous que GitHub Pages est activé
3. Vérifiez que la branche `main` est protégée

### Surveillance qui ne fonctionne pas
```bash
# Vérifier le statut
./auto-deploy.sh status

# Redémarrer
./auto-deploy.sh stop
./auto-deploy.sh start
```

## 📈 Prochaines Étapes

1. **Personnalisation** : Modifiez les couleurs et le branding
2. **API Backend** : Intégrez une vraie API
3. **Base de données** : Connectez à une base de données
4. **Notifications** : Configurez les alertes (email, Slack)
5. **Analytics** : Ajoutez Google Analytics ou similaire
6. **SSL** : Configurez HTTPS pour la production
7. **CDN** : Optimisez avec un CDN

## 🎯 Automatisation Complète

Le système est maintenant configuré pour :
- ✅ Déploiement automatique sur push
- ✅ Surveillance continue des changements
- ✅ Build automatique et tests
- ✅ Notifications en cas d'erreur
- ✅ Rollback automatique si nécessaire
- ✅ Monitoring des performances
