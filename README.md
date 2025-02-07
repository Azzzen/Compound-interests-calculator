# Compound-interests-calculator

Demarrer le projet : ```./start_project.sh```

L'architecture du projet est une application web full-stack, avec une partie frontend en React et une partie backend en Laravel 8(PHP). 

## Frontend (React)

Le frontend est situé dans le dossier frontend
Il utilise React comme framework pour la création de l'interface utilisateur.
Les composants React sont situés dans le dossier frontend/src/components.
Le fichier App.js est le point d'entrée de l'application frontend.
Le fichier package.json contient les dépendances et les scripts pour le frontend.

## Backend (Laravel)

Le backend est situé dans le dossier backend.
Il utilise Laravel comme framework pour la création de l'API
Les contrôleurs sont situés dans le dossier backend/app/Http/Controllers.
Les modèles sont situés dans le dossier backend/app/Models.
Le fichier routes/channels.php contient les routes pour les canaux de diffusion.
Le fichier package.json contient les dépendances et les scripts pour le backend.
## Communication entre le frontend et le backend

Le frontend utilise Axios pour faire des requêtes HTTP vers le backend.
Le backend utilise Laravel pour gérer les requêtes et renvoyer des réponses.

## Extras
En plus du calcul simple des intérêts composés demandé, j'ai intégré trois calculs supplémentaires ainsi que leur visualisation.

Une attention particulière a été portée sur la scalabilité de l'application. Bien que certaines parties auraient pu être mieux pensées avec un peu plus de temps, l'application permet d'ajouter de nouvelles fonctionnalités de manière flexible.

Les boutons et les fonctionnalités dépendent entièrement des routes disponibles et sont scalables à l'infini. Il suffit d'ajouter des éléments à l'array calculators dans le fichier /frontend/src/containers/Homepage, ainsi que dans l'array inputs du fichier /frontend/src/components/GenericCalculator.

J'ai utilisé l'intégralité du temps alloué pour réaliser ce projet, et en ayant eu plus de temps, il m'aurait ete possible de verifier tous mes calculs.