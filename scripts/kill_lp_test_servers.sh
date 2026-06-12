#!/bin/bash
# Arrête les 3 serveurs de test sur les ports 7450, 7451, 7452

echo "🛑 Arrêt des serveurs de test..."

# Si le fichier PID existe, tuer les processus
if [ -f /tmp/lp_test_pids.txt ]; then
    while read pid; do
        if kill -0 $pid 2>/dev/null; then
            kill $pid
            echo "   ✅ PID $pid arrêté"
        fi
    done < /tmp/lp_test_pids.txt
    
    # Supprimer le fichier
    rm /tmp/lp_test_pids.txt
    echo "✅ Fichier /tmp/lp_test_pids.txt supprimé"
else
    echo "⚠️  Aucun fichier PID trouvé (/tmp/lp_test_pids.txt)"
    echo "   Essaye de tuer manuellement avec :"
    echo "   pkill -f serve_lp_"
fi

# Tuer tous les processus Python qui contiennent serve_lp_
pkill -f "serve_lp_" 2>/dev/null

echo "✅ Tous les serveurs de test sont arrêtés"
