# Lidy

# Logiciel Lidy

## Principe

Lire et analyser des données structurées écritent dans un sous-language du language YAML.

La lecture est assurée par une librairie externe. L'apport de valeur de Lidy réside dans son language de spécification.

## Rôle au sein de Ditrit

Lidy est un outils nécessaire à l'utilisation Leto. Leto est un orchestrateur permettant l'execution de fichiers TOSCA (TOSCA 2 est ultérieur). TOSCA 2 est un sous-language de YAML. TOASCA emprunte sa structure à YAML mais n'autorise qu'un sous-ensemble des constructions permisent par YAML. TOSCA peut donc être vu comme un dialecte du meta-language YAML.

Le language TOSCA est utilisé pour spécifier des composant d'infrastructure, et l'architecture qui ples relie. Leto est un outils pour executer une spécification d'infrastructure TOSCA.

## Besoins de Ditrit

En 2020, la majorité de la base de code de Ditrit est écrite en Golang. Cependant, les projets Leto et Lidy, eux sont écrits en JS. Le passage à Golang permettrait donc d'uniformiser la base de code Ditrit. Golang à par ailleurs des avantages de performances sur JS: Golang est compilé. Si l'on s'appuit sur les tests algorithmiques de benchemarksgame-team, on peux donner une vitesse deux fois plus élevée pour Golang.

# Améliorer Lidy

## Approches précédentes abandonnées

- ToP: JSON schema
- Java: ANTLR

## LidyJS: État des lieux

- 600 lignes de code en JS
- Le schéma Lidy n'est exploré qu'en fonction de l'utilisation qui en faite. Ainsi, une erreur dans l'utilisation du schéma Lidy peux demeurer
- Peu de test. Après un temps de recherche, j'ai compris que la pluspart des tests étaient en faites réalisé au niveau de Leto, ce qui assurait la couverture
  de Lidy.
- Pas de documentation de Lidy. Pas de spécification non-plus. Le code constituait donc une spécification par-défaut.

## Approche initiale

- Passer par Typescript, avant de passer à Go.
  - JS -> Typescript OK
  - /!\ le code traduit de JS à TypeScript n'a pas le "style Typescript". Lorsque du code est écrit nativement en TypeScript, cela pousse à un style très déclaratif. Ce style d'écriture en JS n'est généralement présent que chez les développeurs ayant de l'expérience en TypeScript.

## Mes contributions

- Spécification et tests
  - Changement de la syntax de lidyJS
- [Documentation]()
- Données de test et leur execution
- Validation du schéma
- Traduction du code de validation du contenu

## Apprentissages

- La traduction JS TS est possible dans tout les cas, mais ne produit généralement pas un code TS idiomatique.
- La traduction entre deux langages de programmation en générale n'est à priori pas possible ou bien elle produira un code qui ne ressemble pas du tout aux standards habituels du langage destination. Si l'on souhaite produire un code source de qualité dans le langage destination, il est nécessaire de _re-développer_ le programe dans son entièreté. Dès lors il devient plus désagréable de travailler à partir d'un code existant, plutôt que de travailler à partir de spécifications.
