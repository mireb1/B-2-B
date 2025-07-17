#!/bin/bash

# Script de surveillance pour les mises à jour automatiques
# Ce script vérifie périodiquement les changements et redéploie si nécessaire

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
DEPLOY_SCRIPT="$SCRIPT_DIR/deploy.sh"
LOG_FILE="$SCRIPT_DIR/auto-deploy.log"
PID_FILE="$SCRIPT_DIR/auto-deploy.pid"

# Configuration
CHECK_INTERVAL=300  # Vérifier toutes les 5 minutes (300 secondes)

# Fonction de logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Fonction pour démarrer la surveillance
start_monitoring() {
    # Vérifier si le processus est déjà en cours
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if ps -p $pid > /dev/null 2>&1; then
            log "⚠️  Le processus de surveillance est déjà en cours (PID: $pid)"
            exit 1
        else
            log "🧹 Suppression du fichier PID obsolète"
            rm -f "$PID_FILE"
        fi
    fi
    
    # Sauvegarder le PID
    echo $$ > "$PID_FILE"
    
    log "🚀 Démarrage de la surveillance automatique..."
    log "📊 Vérification toutes les $CHECK_INTERVAL secondes"
    
    # Boucle de surveillance
    while true; do
        log "🔍 Vérification des mises à jour..."
        
        # Exécuter le script de déploiement
        if [ -f "$DEPLOY_SCRIPT" ]; then
            bash "$DEPLOY_SCRIPT" >> "$LOG_FILE" 2>&1
        else
            log "❌ Script de déploiement non trouvé: $DEPLOY_SCRIPT"
        fi
        
        # Attendre avant la prochaine vérification
        sleep $CHECK_INTERVAL
    done
}

# Fonction pour arrêter la surveillance
stop_monitoring() {
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if ps -p $pid > /dev/null 2>&1; then
            log "🛑 Arrêt de la surveillance (PID: $pid)"
            kill $pid
            rm -f "$PID_FILE"
            log "✅ Surveillance arrêtée"
        else
            log "⚠️  Aucun processus de surveillance trouvé"
            rm -f "$PID_FILE"
        fi
    else
        log "⚠️  Fichier PID non trouvé"
    fi
}

# Fonction pour vérifier le statut
check_status() {
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if ps -p $pid > /dev/null 2>&1; then
            log "✅ Surveillance active (PID: $pid)"
            return 0
        else
            log "❌ Surveillance inactive (PID obsolète)"
            rm -f "$PID_FILE"
            return 1
        fi
    else
        log "❌ Surveillance inactive"
        return 1
    fi
}

# Fonction pour afficher les logs
show_logs() {
    if [ -f "$LOG_FILE" ]; then
        tail -f "$LOG_FILE"
    else
        log "📝 Aucun log disponible"
    fi
}

# Fonction d'aide
show_help() {
    echo "Usage: $0 {start|stop|status|logs|help}"
    echo ""
    echo "Commandes:"
    echo "  start   - Démarrer la surveillance automatique"
    echo "  stop    - Arrêter la surveillance"
    echo "  status  - Vérifier le statut de la surveillance"
    echo "  logs    - Afficher les logs en temps réel"
    echo "  help    - Afficher cette aide"
    echo ""
    echo "Configuration:"
    echo "  Intervalle de vérification: $CHECK_INTERVAL secondes"
    echo "  Fichier de log: $LOG_FILE"
    echo "  Fichier PID: $PID_FILE"
}

# Gestion des signaux pour un arrêt propre
trap 'log "🛑 Signal reçu, arrêt de la surveillance..."; rm -f "$PID_FILE"; exit 0' SIGINT SIGTERM

# Traitement des arguments
case "$1" in
    start)
        start_monitoring
        ;;
    stop)
        stop_monitoring
        ;;
    status)
        check_status
        ;;
    logs)
        show_logs
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "Usage: $0 {start|stop|status|logs|help}"
        exit 1
        ;;
esac
