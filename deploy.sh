#!/bin/bash

# Script de déploiement automatique pour B2B Marketplace
# Ce script détecte les changements et redéploie automatiquement

echo "🚀 Démarrage du déploiement automatique..."

# Configuration
REPO_URL="https://github.com/mireb1/B-2-B.git"
BRANCH="main"
BUILD_DIR="dist"
DEPLOY_DIR="/tmp/b2b-deploy"

# Fonction pour vérifier les changements
check_changes() {
    echo "📊 Vérification des changements..."
    
    # Récupérer les derniers changements
    git fetch origin $BRANCH
    
    # Comparer avec le dernier commit local
    LOCAL_COMMIT=$(git rev-parse HEAD)
    REMOTE_COMMIT=$(git rev-parse origin/$BRANCH)
    
    if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
        echo "✅ Nouveaux changements détectés!"
        return 0
    else
        echo "ℹ️  Aucun changement détecté."
        return 1
    fi
}

# Fonction de build
build_project() {
    echo "🔨 Construction du projet..."
    
    # Installer les dépendances
    npm ci
    
    # Construire le projet
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build réussi!"
        return 0
    else
        echo "❌ Erreur lors du build!"
        return 1
    fi
}

# Fonction de déploiement
deploy_project() {
    echo "🚀 Déploiement en cours..."
    
    # Créer le dossier de déploiement s'il n'existe pas
    mkdir -p $DEPLOY_DIR
    
    # Copier les fichiers de build
    cp -r $BUILD_DIR/* $DEPLOY_DIR/
    
    # Ici, vous pouvez ajouter votre logique de déploiement spécifique
    # Par exemple, copier vers un serveur web, AWS S3, etc.
    
    echo "✅ Déploiement terminé!"
}

# Fonction de notification
send_notification() {
    local status=$1
    local message=$2
    
    echo "📢 $message"
    
    # Vous pouvez ajouter ici des notifications (email, Slack, etc.)
    # curl -X POST -H 'Content-type: application/json' \
    #   --data '{"text":"'"$message"'"}' \
    #   YOUR_WEBHOOK_URL
}

# Fonction principale
main() {
    echo "🎯 B2B Marketplace - Déploiement Automatique"
    echo "============================================="
    
    # Vérifier si on est dans un repo git
    if [ ! -d ".git" ]; then
        echo "❌ Erreur: Ce n'est pas un dépôt Git!"
        exit 1
    fi
    
    # Vérifier les changements
    if check_changes; then
        # Mettre à jour le code local
        git pull origin $BRANCH
        
        # Construire le projet
        if build_project; then
            # Déployer
            deploy_project
            send_notification "success" "🎉 Déploiement réussi pour le commit $(git rev-parse --short HEAD)"
        else
            send_notification "error" "❌ Erreur lors du build pour le commit $(git rev-parse --short HEAD)"
            exit 1
        fi
    else
        echo "ℹ️  Aucun déploiement nécessaire."
    fi
}

# Exécuter si ce script est lancé directement
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    main "$@"
fi
