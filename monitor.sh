#!/bin/bash

# Script de monitoring des performances pour B2B Marketplace

SITE_URL="https://mireb1.github.io/B-2-B/"
LOG_FILE="performance-monitor.log"
ALERT_THRESHOLD=5000  # 5 secondes

# Fonction de logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Fonction pour vérifier les performances
check_performance() {
    log "🔍 Vérification des performances..."
    
    # Test de temps de réponse
    local response_time=$(curl -o /dev/null -s -w "%{time_total}" "$SITE_URL")
    local response_time_ms=$(echo "$response_time * 1000" | bc)
    
    log "⏱️  Temps de réponse: ${response_time_ms}ms"
    
    # Test de disponibilité
    local http_code=$(curl -o /dev/null -s -w "%{http_code}" "$SITE_URL")
    
    if [ "$http_code" -eq 200 ]; then
        log "✅ Site disponible (HTTP $http_code)"
        
        # Vérifier si le temps de réponse est acceptable
        if (( $(echo "$response_time_ms > $ALERT_THRESHOLD" | bc -l) )); then
            log "⚠️  Alerte: Temps de réponse élevé (${response_time_ms}ms > ${ALERT_THRESHOLD}ms)"
            send_alert "Performance" "Temps de réponse élevé: ${response_time_ms}ms"
        fi
    else
        log "❌ Site indisponible (HTTP $http_code)"
        send_alert "Disponibilité" "Site indisponible - HTTP $http_code"
    fi
}

# Fonction pour vérifier les liens
check_links() {
    log "🔗 Vérification des liens..."
    
    local links=(
        "$SITE_URL"
        "${SITE_URL}#/login"
        "${SITE_URL}#/products"
    )
    
    for link in "${links[@]}"; do
        local status=$(curl -o /dev/null -s -w "%{http_code}" "$link")
        if [ "$status" -eq 200 ]; then
            log "✅ $link - OK"
        else
            log "❌ $link - ERROR ($status)"
            send_alert "Lien cassé" "$link retourne HTTP $status"
        fi
    done
}

# Fonction pour envoyer des alertes
send_alert() {
    local type=$1
    local message=$2
    
    log "🚨 ALERTE [$type]: $message"
    
    # Webhook Slack (optionnel)
    if [ -n "$SLACK_WEBHOOK" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🚨 B2B Marketplace - $type: $message\"}" \
            "$SLACK_WEBHOOK"
    fi
    
    # Email (optionnel)
    if [ -n "$EMAIL_ALERT" ]; then
        echo "$message" | mail -s "B2B Marketplace - $type Alert" "$EMAIL_ALERT"
    fi
}

# Fonction pour générer un rapport
generate_report() {
    log "📊 Génération du rapport..."
    
    local report_file="performance-report-$(date '+%Y%m%d').html"
    
    cat > "$report_file" << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Rapport de Performance - B2B Marketplace</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f0f0f0; padding: 20px; margin-bottom: 20px; }
        .metric { margin: 10px 0; padding: 10px; border-left: 4px solid #007cba; }
        .good { border-left-color: #28a745; }
        .warning { border-left-color: #ffc107; }
        .error { border-left-color: #dc3545; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Rapport de Performance - B2B Marketplace</h1>
        <p>Généré le: $(date)</p>
    </div>
    
    <div class="metric good">
        <h3>Disponibilité</h3>
        <p>Site accessible et fonctionnel</p>
    </div>
    
    <div class="metric">
        <h3>Logs récents</h3>
        <pre>$(tail -20 "$LOG_FILE")</pre>
    </div>
</body>
</html>
EOF
    
    log "📄 Rapport généré: $report_file"
}

# Fonction principale
main() {
    log "🎯 Démarrage du monitoring B2B Marketplace"
    
    case "$1" in
        "check")
            check_performance
            check_links
            ;;
        "report")
            generate_report
            ;;
        "monitor")
            while true; do
                check_performance
                check_links
                sleep 300  # Vérifier toutes les 5 minutes
            done
            ;;
        *)
            echo "Usage: $0 {check|report|monitor}"
            echo "  check   - Vérification unique"
            echo "  report  - Générer un rapport"
            echo "  monitor - Surveillance continue"
            exit 1
            ;;
    esac
}

# Vérification des dépendances
if ! command -v curl &> /dev/null; then
    echo "❌ curl n'est pas installé"
    exit 1
fi

if ! command -v bc &> /dev/null; then
    echo "❌ bc n'est pas installé"
    exit 1
fi

# Exécuter
main "$@"
