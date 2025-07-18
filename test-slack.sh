#!/bin/bash

# Script de test pour les notifications Slack
# Usage: ./test-slack.sh [webhook_url]

set -e

# Configuration
WEBHOOK_URL="${1:-$SLACK_WEBHOOK}"
TEST_MESSAGE="🧪 Test de notification Slack pour B2B Marketplace"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔧 Test des notifications Slack${NC}"
echo "=================================================="

# Vérifier si l'URL webhook est fournie
if [ -z "$WEBHOOK_URL" ]; then
    echo -e "${RED}❌ Erreur: URL webhook Slack manquante${NC}"
    echo ""
    echo "Usage:"
    echo "  $0 [webhook_url]"
    echo ""
    echo "Ou définir la variable d'environnement SLACK_WEBHOOK:"
    echo "  export SLACK_WEBHOOK='https://hooks.slack.com/services/YOUR/WEBHOOK/URL'"
    echo "  $0"
    echo ""
    echo "Pour obtenir une URL webhook Slack:"
    echo "1. Allez sur https://api.slack.com/apps"
    echo "2. Créez une nouvelle app ou sélectionnez une existante"
    echo "3. Activez 'Incoming Webhooks'"
    echo "4. Créez un nouveau webhook pour votre canal"
    exit 1
fi

# Vérifier si curl est disponible
if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ Erreur: curl n'est pas installé${NC}"
    exit 1
fi

# Test de base
echo -e "${YELLOW}📤 Envoi du message de test...${NC}"
response=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
    -H 'Content-type: application/json' \
    --data "{
        \"text\": \"$TEST_MESSAGE\",
        \"blocks\": [
            {
                \"type\": \"section\",
                \"text\": {
                    \"type\": \"mrkdwn\",
                    \"text\": \"🧪 *Test de notification*\\n✅ Les notifications Slack fonctionnent correctement !\\n🌐 Site: https://mireb1.github.io/B-2-B/\"
                }
            }
        ]
    }" \
    "$WEBHOOK_URL")

# Vérifier la réponse
if [ "$response" = "200" ]; then
    echo -e "${GREEN}✅ Test réussi !${NC}"
    echo "📱 Vérifiez votre canal Slack pour voir le message"
else
    echo -e "${RED}❌ Test échoué (Code HTTP: $response)${NC}"
    echo ""
    echo "Causes possibles:"
    echo "- URL webhook incorrecte"
    echo "- Canal Slack inexistant"
    echo "- Permissions insuffisantes"
    echo "- Webhook révoqué"
    exit 1
fi

# Test avec différents formats de message
echo ""
echo -e "${YELLOW}📤 Test avec message de succès...${NC}"
curl -s -X POST -H 'Content-type: application/json' \
    --data "{
        \"text\": \"🎉 Déploiement réussi pour B2B Marketplace!\",
        \"blocks\": [
            {
                \"type\": \"section\",
                \"text\": {
                    \"type\": \"mrkdwn\",
                    \"text\": \"✅ *Déploiement réussi*\\n🌐 Site: https://mireb1.github.io/B-2-B/\\n🚀 Branch: \\\`main\\\`\\n⏰ $(date)\"
                }
            }
        ]
    }" \
    "$WEBHOOK_URL"

echo ""
echo -e "${YELLOW}📤 Test avec message d'erreur...${NC}"
curl -s -X POST -H 'Content-type: application/json' \
    --data "{
        \"text\": \"❌ Test d'alerte d'erreur\",
        \"blocks\": [
            {
                \"type\": \"section\",
                \"text\": {
                    \"type\": \"mrkdwn\",
                    \"text\": \"🚨 *Alerte de test*\\n❌ Ceci est un test d'alerte d'erreur\\n🔗 Logs: https://github.com/mireb1/B-2-B/actions\\n⏰ $(date)\"
                }
            }
        ]
    }" \
    "$WEBHOOK_URL"

echo ""
echo -e "${GREEN}✅ Tous les tests terminés !${NC}"
echo "📱 Vérifiez votre canal Slack pour voir tous les messages"
