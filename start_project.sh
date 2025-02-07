#!/bin/bash

# Vérifier si Composer est installé
if ! command -v composer &> /dev/null
then
    echo "Composer est requis mais n'est pas installé. Veuillez l'installer."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null
then
    echo "npm est requis mais n'est pas installé. Veuillez l'installer."
    exit 1
fi

echo "Installation des dépendances PHP avec Composer..."
cd backend && composer install


echo "Installation des dépendances JavaScript avec npm..."
cd ../frontend && npm i

echo "Lancement du serveur Laravel..."
cd ../backend && php artisan serve &

echo "Lancement du serveur React..."
cd ../frontend && npm start

echo "Le backend est en cours d'exécution sur http://127.0.0.1:8000"
echo "Le frontend est en cours d'exécution sur http://127.0.0.1:3000"

