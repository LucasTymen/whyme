#!/bin/bash
# Lance les 3 serveurs de test sur les ports 7450, 7451, 7452
# Chaque serveur proxy vers localhost:8010 avec un persona différent

echo "🚀 Démarrage des serveurs de test..."
echo ""

# Vérifier que le serveur Django tourne sur 8010
if ! curl -s http://localhost:8010/lp/ > /dev/null 2>&1; then
    echo "❌ ERREUR: Le serveur Django n'est pas accessible sur http://localhost:8010/"
    echo "   Lance d'abord: docker compose up -d"
    exit 1
fi

echo "✅ Serveur Django détecté sur http://localhost:8010/"
echo ""

# Lancer les 3 serveurs Python en arrière-plan
python3 scripts/serve_lp_business.py &
BUSINESS_PID=$!

python3 scripts/serve_lp_growth.py &
GROWTH_PID=$!

python3 scripts/serve_lp_executive.py &
EXECUTIVE_PID=$!

# Sauvegarder les PIDs dans un fichier pour kill plus tard
echo "$BUSINESS_PID" > /tmp/lp_test_pids.txt
echo "$GROWTH_PID" >> /tmp/lp_test_pids.txt
echo "$EXECUTIVE_PID" >> /tmp/lp_test_pids.txt

echo "✅ 3 serveurs lancés !"
echo ""
echo "🌐 URLs de test :"
echo "   http://localhost:7450/  → LP Business (persona=business)"
echo "   http://localhost:7451/  → LP Growth (persona=growth)"
echo "   http://localhost:7452/  → LP Executive (persona=executive)"
echo ""
echo "💡 Pour arrêter : ./scripts/kill_lp_test_servers.sh"
echo "   ou : make kill-lp-test"
echo ""
echo "PIDs sauvegardés dans /tmp/lp_test_pids.txt"
