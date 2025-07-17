# B2B Marketplace - Plateforme E-commerce

Une plateforme e-commerce B2B moderne de type Alibaba avec interface optimisée pour mobile et dashboard administrateur complet.

## 🚀 Fonctionnalités

### 🛍️ Interface Utilisateur
- **Navigation mobile optimisée** : Barre de navigation fixe en bas de l'écran
- **Grille de produits responsive** : Affichage adaptatif selon la taille d'écran
- **Recherche avancée** : Recherche par nom, catégorie, fournisseur
- **Panier intelligent** : Gestion des quantités minimales de commande
- **Authentification** : Système de connexion sécurisé

### 💳 Paiement
- **Paiement à la réception (COD)** : Option privilégiée pour les marchés émergents
- **Paiement par carte** : Intégration sécurisée
- **Virement bancaire** : Pour les grosses commandes B2B
- **Formulaire de livraison** : Collecte des informations complètes

### 🔧 Dashboard Administrateur
- **Gestion des produits** : Ajout, modification, suppression
- **Suivi des commandes** : Statuts en temps réel
- **Gestion des paiements** : Validation et suivi
- **Utilisateurs** : Administration des comptes
- **Statistiques** : Tableaux de bord avec métriques

## 🛠️ Technologies Utilisées

- **Frontend** : React 18 + TypeScript
- **Styling** : Tailwind CSS
- **Routing** : React Router DOM
- **Icons** : Lucide React
- **Build** : Vite
- **State Management** : React Context API

## 📦 Installation

1. Clonez le repository
```bash
git clone <votre-repo>
cd B-2-B
```

2. Installez les dépendances
```bash
npm install
```

3. Démarrez le serveur de développement
```bash
npm run dev
```

4. Ouvrez votre navigateur sur `http://localhost:3000`

## 🎯 Comptes de démonstration

### Administrateur
- **Email** : admin@example.com
- **Mot de passe** : admin123

### Utilisateur
- **Email** : user@example.com
- **Mot de passe** : user123

## 📱 Interface Mobile

La plateforme est entièrement optimisée pour mobile avec :
- Navigation en bas d'écran pour un accès rapide
- Grille de produits adaptative
- Formulaires tactiles optimisés
- Expérience utilisateur fluide sur tous les appareils

## 🏗️ Architecture

```
src/
├── components/          # Composants réutilisables
│   ├── Header.tsx      # En-tête avec recherche
│   ├── MobileNavigation.tsx  # Navigation mobile
│   ├── ProductGrid.tsx # Grille de produits
│   └── ProtectedRoute.tsx    # Protection des routes
├── contexts/           # Contextes React
│   ├── AuthContext.tsx # Gestion authentification
│   └── CartContext.tsx # Gestion panier
├── data/              # Données de test
│   └── mockData.ts    # Produits et catégories
├── pages/             # Pages principales
│   ├── HomePage.tsx   # Page d'accueil
│   ├── ProductPage.tsx # Détail produit
│   ├── LoginPage.tsx  # Connexion
│   ├── CheckoutPage.tsx # Commande
│   └── AdminDashboard.tsx # Dashboard admin
└── types/             # Types TypeScript
    └── index.ts       # Définitions des types
```

## 🔐 Sécurité

- Authentification par token JWT simulée
- Protection des routes administrateur
- Validation des données côté client
- Gestion des erreurs et états de chargement

## 📊 Gestion des Commandes

Le système de gestion des commandes inclut :
- **Suivi en temps réel** des statuts
- **Intégration paiement** avec multiple méthodes
- **Notifications** pour les changements de statut
- **Historique complet** des transactions

## 🎨 Design System

- **Couleurs** : Palette cohérente avec tons primary et secondary
- **Typographie** : Police Inter pour une lisibilité optimale
- **Composants** : Système de composants réutilisables
- **Animations** : Transitions fluides et micro-interactions

## 📈 Performance

- **Lazy loading** des images
- **Optimisation** des re-rendus React
- **Cache** des données utilisateur
- **Responsive design** pour tous les écrans

## 🚀 Déploiement

Pour déployer en production :

```bash
npm run build
npm run preview
```

## 📞 Support

Pour toute question ou suggestion, contactez l'équipe de développement.

---

**Développé avec ❤️ pour le commerce B2B moderne**