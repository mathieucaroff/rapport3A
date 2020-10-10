# Webdba

_Outils d'inventaire de base de donnée_

- Manuel / Automatique
- Interface en ligne / API

- "Ancien webdba" (PHP) / "Nouveau webdba" (Python)

## Technologies

(git)

- Python
- Django
- Django Rest Framework
- Django Tables
- Crispy (forms)

## Tasks

- Burst ExaCC
  - Communication avec l'autre equipe
  - Etablire la liste des besoins
  - Decider d'une approche
  - Choix des technologies
  ***
  - Description de la tache
    - Permettre l'activation et la desactivation de la fonctionnalité de burst via une API
  - Déroulement
    - Discussion, redefinition des objectifs, implemetation et demonstration
  - Difficultées et solutions
    - (bien faire remarquer mes contributions en terme de detection de problème)
    - Requete HTTP -> pbm de timeout
    - Possibilite qu'il y ai plusieurs appels simultanées = quoi faire? -> no clients ne sont pas supposés le faire ; comme nous loggerons tout, nous saurons si jamais ce probleme se produit
    - Besoins de logger toutes les communications
      - Utiliser logging.log
- Extract Django module Django-Kickstart
  - Documentation
    - ReadTheDocs (Sphinx)
  - Extraction of the code
- Bdd Oracles
- Inventory ExaCC
- Writing tests for permissions
