# Why Me - Landing Pages Personnalisées

Projet de landing pages personnalisées pour la prospection, basé sur le concept **"Pourquoi je vous contacte"** plutôt que sur un portfolio ou un CV traditionnel.

## Philosophie

- **1 produit, 3 expériences** : Une seule codebase pour trois personas (Business, Growth, Executive)
- **Objectif** : Démarrer une conversation, pas vendre un profil
- **Approche** : Explication personnalisée, pas candidature ni page de vente

## Structure

```
whyme/
├── templates/
│   └── landing_pages/
│       ├── lp_dynamic.html          # Template principal
│       └── _partials/
│           ├── lp_business.html     # Persona Business/Sales
│           ├── lp_growth.html      # Persona Growth
│           └── lp_executive.html    # Persona Executive
├── scripts/
│   ├── serve_lp_business.py        # Serveur test port 7450
│   ├── serve_lp_growth.py         # Serveur test port 7451
│   └── serve_lp_executive.py       # Serveur test port 7452
├── static/
│   └── lucas_profile.png           # Photo de profil
└── README.md
```

## URLs

### Production
```
https://landing.lucastymen.fr/why-me?persona=sales
https://landing.lucastymen.fr/why-me?persona=growth
https://landing.lucastymen.fr/why-me?persona=executive
```

### HubSpot Integration
```
https://landing.lucastymen.fr/why-me?firstname={{contact.firstname}}&company={{contact.company}}&persona={{contact.persona}}
```

### Test Local
```
http://localhost:7450/          # Business
http://localhost:7451/          # Growth
http://localhost:7452/          # Executive
```

## Personas Mapping

| HubSpot Persona | Route Persona |
|-----------------|---------------|
| persona_1       | executive     |
| persona_2       | sales/business|
| persona_3       | executive     |
| persona_4       | growth        |
| persona_5       | executive     |
| persona_6       | sales/business|

## Améliorations V2 Implémentées

- ✅ Hero positif (pas de formulations négatives)
- ✅ Section "Pourquoi cette page existe" (Entreprise, Persona, Objectif, Temps)
- ✅ Frise de parcours professionnel
- ✅ Cartes PROBLÈME/ACTION/RÉSULTAT/POURQUOI CELA COMPTE
- ✅ Section "Ce qui rend mon parcours un peu différent"
- ✅ FAQ accordéon en bas de page
- ✅ Photo de profil accessible
- ✅ Design responsive
- ✅ CTA : "Une question simple" + "Pensez-vous qu'un échange de 15 minutes puisse avoir du sens ?"

## Démarrage Rapide

### Serveurs de test

```bash
# Lancer tous les serveurs
cd /home/lucas/tools/whyme
./scripts/start_lp_test_servers.sh

# Arrêter tous les serveurs
./scripts/kill_lp_test_servers.sh
```

### Docker (pour Django)

```bash
# Le projet complet nécessite Django
# Voir le dépôt original : https://github.com/LucasTymen/landingPageCreatorForProspection
```

## Pourquoi "why-me" ?

- **Mémorable** : Ultra court, simple
- **Générique** : Indépendant du contexte (alternance, CDI, freelance)
- **Réutilisable** : 1 codebase pour toutes les opportunités
- **Philosophie** : "Pourquoi je vous contacte" plutôt que "Mon CV"
- **Maintenance** : 0 maintenance supplémentaire pour plusieurs cas d'usage

## Créé par

Lucas Tymen - https://lucastymen.fr
