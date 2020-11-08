---
title: |
  Mathieu CAROFF \
  Rapport de stage ingénieur DevOps
numbersections: true
_: cSpell:disable
header-includes:
  - \renewcommand{\familydefault}{\sfdefault}
  - \renewcommand{\contentsname}{Table des matières}
  - \usepackage{xcolor}
  - \usepackage{hyperref}
  - \usepackage{fancyhdr}
  - \clubpenalty=1000
  - \hypersetup{colorlinks=true, linkcolor=blue!50!red, urlcolor=purple!60!black}
include-before: |
  Orness  
  19, rue Bergère  
  75009 Paris  

  -

  École des Mines de Saint-Étienne  
  158, cours Fauriel  
  CS 62362  
  F‑42023 Saint‐Étienne cedex 2  

  -

  Mathieu CAROFF  
  Formation ISMIN  
  3ème année  
  Stagiaire DevOps  

  -

  Stage du 2 juin 2020 au 30 novembre 2020

  Stage encadré par :

  - Claude YUGMA, enseignant-chercheur à l'École des Mines de Saint-Étienne
  - Xavier TALON, directeur technique de Orness

  Suivi de versions :

  - version 1, 2020-11
---

<pre comment="the content of the pre will be hidden from the pdf version. Indeed, latex can generate its own version of the summary">

# Table des matières

- [Table des matières](#table-des-matières)
- [Orness](#orness)
  - [Culture d'entreprise](#culture-dentreprise)
- [Lidy](#lidy)
  - [[Context]](#context)
  - [Origine de Lidy : Leto](#origine-de-lidy--leto)
  - [Analyser les fichiers OASIS TOSCA](#analyser-les-fichiers-oasis-tosca)
    - [ToP : TOSCA Parser](#top--tosca-parser)
    - [ANTLR](#antlr)
    - [Json Schema](#json-schema)
  - [Lidy](#lidy-1)
    - [Développement initial de Lidy](#développement-initial-de-lidy)
    - [Reprise du travail sur Lidy](#reprise-du-travail-sur-lidy)
    - [YAML](#yaml)
    - [Aperçu de l'utilisation de Lidy](#aperçu-de-lutilisation-de-lidy)
  - [Aperçu du fonctionnement de Lidy-JS](#aperçu-du-fonctionnement-de-lidy-js)
  - [[Analyse et réalisation]](#analyse-et-réalisation)
  - [Recherche, travail et impression sur Golang](#recherche-travail-et-impression-sur-golang)
  - [Approches initiales, difficultés et exploration des stratégies](#approches-initiales-difficultés-et-exploration-des-stratégies)
  - [Changement du DSL Lidy et spécification](#changement-du-dsl-lidy-et-spécification)
    - [Détails sur la spécification du mot-clé `_mergeable`](#détails-sur-la-spécification-du-mot-clé-_mergeable)
  - [Test](#test)
  - [Retour sur le travail de spécification](#retour-sur-le-travail-de-spécification)
        - [_adapted-v-model-for-existing-software_](#adapted-v-model-for-existing-software)
  - [Retour sur les tests](#retour-sur-les-tests)
  - [Support des numéros de ligne lors de la conversion du YAML en Go](#support-des-numéros-de-ligne-lors-de-la-conversion-du-yaml-en-go)
  - [Conception de l'API de la librairie Lidy](#conception-de-lapi-de-la-librairie-lidy)
    - [Invocation](#invocation)
    - [Fichiers](#fichiers)
    - [Résultats de Lidy](#résultats-de-lidy)
  - [Conception interne de Lidy](#conception-interne-de-lidy)
        - [lidy-newparser-parse](#lidy-newparser-parse)
  - [Analyse et validation du schéma](#analyse-et-validation-du-schéma)
  - [Règles Lidy prédéfinies](#règles-lidy-prédéfinies)
  - [Rapporter les erreurs](#rapporter-les-erreurs)
  - [Schéma de fonctionnement du projet](#schéma-de-fonctionnement-du-projet)
- [WebDBA](#webdba)
- [Table des liens](#table-des-liens)
        - [go-yaml](#go-yaml)
        - [go-yaml-issue-108](#go-yaml-issue-108)
        - [go-yaml-issue-108-mc](#go-yaml-issue-108-mc)
        - [lib-yaml](#lib-yaml)
        - [lidy-default-rule](#lidy-default-rule)
        - [lidy-predefined-rules](#lidy-predefined-rules)
        - [lidy-short-reference](#lidy-short-reference)
        - [orness-valeurs](#orness-valeurs)
        - [orness-histoire](#orness-histoire)
        - [orness-societe](#orness-societe)
        - [orness-engagements](#orness-engagements)
        - [tiobe](#tiobe)
        - [top](#top)
        - [yaml](#yaml-1)
        - [yaml-json-schema](#yaml-json-schema)
        - [yaml-recommended-schema](#yaml-recommended-schema)
        - [yaml-timestamp](#yaml-timestamp)

</pre>

<!-- ## Plan

- Présentation de l'Entreprise Orness
- Présentation de l'Association Ditrit
  - Aperçu
  - Raison d'être
  - Reflexions menées dans DitRit
  - Projets réalisés à DitRit
- Présentation de l'Entreprise Crédit Agricole
  - Service
  - Equipe
- Présentation du projet pendant la période Juin-Juillet : Lidy
  - Contexte
  - Analyse
  - Objectifs
  - Réalisation
- Présentation du projet pendant la période Aout-Novembre : Webdba
  - Utilité
  - Histoire
  - Chantiers en cours
    - Tests
    - Permissions
    - Big Data
  - Les chantiers sur lequels j'ai travaillé -->

<!-- 3750 characteres par page
4 pages = 15000 charactères -->

<!-- cSpell:enable -->

_Les liens de la table des matières sont cliquables._

_Ce rapport est disponible au format PDF, Markdown-source et Markdown-HTML. Lu dans un navigateur, dans un IDE ou dans Sumatra PDF, il est possible de revenir en arrière après avoir cliqué un lien en utilisant le raccourci clavier Control+[flèche gauche]_.

# Orness

Orness est une entreprise de services du numérique (ESN), opérant à Paris, avec ses bureaux dans le 9ème arrondissement. Elle a été fondée en 2001 par Ghada AJAKA et Carole AMADO qui co-président l'entreprise, appuyées par Xavier TALON et Herve CHIBOIS, eux-aussi membres fondateurs et co-directeurs techniques. [(orness-histoire)](#orness-histoire)

Elle compte aujourd'hui plus d'une centaine d'employés cadres. Avec un chiffre d'affaire de 12 millions d'euro, elle affiche le modeste résultat de 650 mille euros. [(orness-societe)](#orness-societe)

## Culture d'entreprise

Orness accorde une grande importance à l'humain. La qualité de la vie des employés au travail, l'entente et le sentiment de sécurité morale ont une grande importance chez les dirigeants de Orness, et leur maniement de ces valeurs, dans une entreprise à taille humaine, permet de créer une atmosphère relaxante chez Orness. Ainsi, les valeurs de transparence, d'audace et de partage se ressentent bien, tant chez les dirigeants que au sein des employés. [(orness-valeurs)](#orness-valeurs)

Outre l'importance accordée au bien-être au travail, Orness s'engage sur les sujets de l'Open Source, de la souveraineté numérique et de l'inclusion des femmes au travail. [(orness-engagements)](#orness-engagements)

<!-- ## Activité -->

<!-- TODO -->

<!-- ## Expertise -->

# Lidy

_Période Juin-Juillet : Projet Lidy_

Lidy est une librairie qui permet à l'utilisateur de lire et d'analyser un fichier YAML, afin de valider qu'il correspond bien à un format complexe décrit par l'utilisateur.

## [Context]

## Origine de Lidy : Leto

Le projet Lidy a émergé comme un outil nécessaire au développement d'un projet plus ambitieux : Leto. Leto est un projet d'orchestrateur de système multi-machines et cloud visant à implémenter le standard TOSCA, produit par le groupe OASIS. Le standard TOSCA étant au format YAML, le projet Leto s'est rapidement retrouvé dans le besoin de pouvoir analyser un fichier YAML, et de dire s'il s'agissait d'un fichier TOSCA valide ou non. Comme nous allons le voir, ce besoin s'est trouvé difficile à satisfaire, et à ultimement mené à la naissance du projet Lidy.

## Analyser les fichiers OASIS TOSCA

### ToP : TOSCA Parser

Le [projet ToP](#top), produit par l'association Ditrit, vise à produire un parseur dédié à la syntaxe TOSCA. Il utilise ANTLR pour les versions de TOSCA inférieures à la version 2.0. À partir de la version 2.0, ANTLR s'est révélé limité pour parser les blocs indenté de YAML, ce qui a mené à l'adoption d'un outil de parsing YAML dédié. À ma connaissance, ce projet n'a pas abouti. Il ne répond pas entièrement aux besoins de Leto et a donc été progressivement abandonné, remplacé par Lidy.

### ANTLR

La première approche utilisée pour analyser les fichiers YAML TOSCA, a été l'utilisation d'un outil d'analyse générique Java : ANTLR. En effet, à l'époque, fin 2018 - début 2019, l'association Ditrit utilisait principalement le langage de programmation Java. ANTLR, "ANother Tool for Language Recognition" est un parseur pour les langages non-contextuels (_context-free_). C'est un parseur LL(\*), donc un parseur top-down, ce qui signifie qu'il cherche à attribuer une valeur unique à chaque mot qu'il lit, aussitôt que possible.

Dans le cas de Leto, ANTLR a été capable de produire des parseurs pour les versions 1.0, 1.1 et 1.2 de TOSCA. En effet, ces versions sont basées sur XML, un langage que ANTLR parvient à parser. Cependant, les versions ultérieurs à la version 1.2 de TOSCA sont basées sur YAML. ANTLR n'est pas capable de produire de parseur YAML, ni TOSCA 2.0+, car dans ces langages, le niveau d'indentation a valeur de délimiteur de blocs. Cette approche de la délimitation des blocs est très difficile à prendre en compte sans une fonctionnalité dédiée et il s'est trouvé que ANTLR ne dispose pas d'une telle fonctionnalité. Il est toujours possible de prendre en compte l'indentation avec ANTLR, mais ceci utilise une astuce qui complique fortement la grammaire, et donc qui ruine la vitesse d'exécution de l'analyse. Ces deux facteurs ont mené à l'abandon de ANTLR pour parser les fichiers TOSCA 2.0+.

### Json Schema

La seconde approche pour l'analyse syntaxique TOSCA 2.0+ a été l'utilisation d'un parseur générique de donné YAML, couplé à un système de vérification de données. Le système de vérification de données utilisé était AJV, un outil Javascript qui implémente la spécification JSON Schema.

AJV, "Another JSON Validator", descend de DJV, "Dynamic JSON Validator". Ensemble, ils constituent les deux implémentations JavaScript les plus rapides de la spécification JSON-Schema-draft-07, devant json-schema-validator-generator et jsen. Ces outils fonctionnent ainsi : un développeur souhaite valider les données qu'il reçoit d'un utilisateur. Il décrit le format de ces données dans un fichier JSON qui respecte la spécification JSON-Schema. Ensuite, il écrit du code qui charge le JSON-Schema dans AJV et en retire un "schéma compilé", qu'il peut alors utiliser pour valider des données structurées reçues de l'utilisateur. Lorsqu'une donnée de l'utilisateur ne respecte pas le schéma, l'ensemble des divergences entre la donnée fourni et le format de donnée attendu est rapporté. Le code du développeur peut ensuite décider que faire de cette liste d'erreurs; généralement signaler ces erreurs à l'utilisateur.

AJV et JSON Schema répondaient bien au besoin de ToP, cependant deux problèmes se dégageaient de leur utilisation :

- AJV n'opère que sur les données après dé-sérialisation. Ceci implique que AJV ne peut **connaître les numéros de ligne** d'où proviennent les données. Ainsi, il n'est pas possible de signaler à l'utilisateur la position des erreurs que AJV détecte.
- AJV et l'écosystème JSON Schema ont été développés avec pour but la validation de **données** provenant d'un utilisateur, afin d'assurer leur **validité**. Ce cas d'usage est quelque peu différent de l'utilisation que souhaitait en faire ToP, comme un validateur de syntax de deuxième niveau. AJV possède bien l'ensemble des fonctionnalités nécessaires, mais il s'agit de fonctionnalités _périphériques_, pour des besoins _centraux_ de ToP. Ceci rend l'utilisation des JSON Schema désagréable et lourde.

En l'absence d' similaire aux JSON Schema pour répondre à ces deux besoins, l'association Ditrit a décidé de créer son propre outil : Lidy.

## Lidy

Lidy est un validateur de syntaxe de deuxième niveau et désérialiseur pour YAML. A l'instar des validateurs JSON Schema, Lidy n'opère pas pour un dialecte unique : il permet de définir des dialectes YAML grâce à un système de _règles_, définies avec des _spécificateurs_ qui consistent en une _expression_ contenant un ou plusieurs _mot-clés_. Ces définitions de dialectes du système de règles sont complexes et doivent suivre une syntaxe. Lidy a décidé d'utiliser une syntaxe existante pour son système de règles : il s'agit de la syntax YAML. Ainsi, le système de règles Lidy est lui-même un dialecte YAML. Plus de détails sur le fonctionnement extérieur de Lidy sont donnés dans la section [Aperçu de l'utilisation de Lidy](#aperçu-de-lutilisation-de-lidy)

### Développement initial de Lidy

Lidy a été initialement développé à la suite de ToP, en JS (en JavaScript). Il réutilise la dépendance js-yaml de ce dernier. La définition de l'ensemble des règles de validation, précédemment spécifique à ToP, devient une responsabilité du projet parent : Leto. Cette première version de Lidy a été pensée comme un remplacement des JSON Schema, mais avec les fonctionnalités nécessaires pour pouvoir spécifier une grammaire TOSCA, ainsi que l'indication des numéros de lignes. La contrainte à laquelle devait répondre Lidy était de répondre à tous les besoins de Leto pour l'analyse des fichiers. Comme nous allons le voir dans la section suivante, cette approche économe à des limites.

### Reprise du travail sur Lidy

Durant l'été 2020, près d'un an après que le travail sur Lidy et Leto ait été arrêté, les discussions et retours que reçoivent les membres de l'association Ditrit au sujet des besoins des entreprises indiquent un besoin pour un orchestrateur de déploiement de systèmes cloud et multi-machines. En d'autres termes, il apparaît que les entreprises ont besoin de Leto. Lorsque Orness m'affecte en tant que développeur-contributeur pour l'association Ditrit, Xavier Talon me propose de ré-ouvrir le travail sur le sujet Leto, en **entamant la traduction de Lidy en Golang**. En effet, depuis l'été 2019, l'association Ditrit réalise la quasi-totalité de ses développements en Golang, et la traduction des programmes Lidy et Leto permettrait d'apporter une forme d'uniformité dans les projets Ditrit, facilitant aussi la réutilisation de code au sein de l'association.

La proposition de travailler sur Lidy a provoqué chez moi des opinions contrastées :

- D'un côté, le type de programme qu'est Lidy et le type de besoins auquel il répond m'intéressent car ils relèvent de la programmation pure. Lidy manipule principalement des structures de données et des données des types habituels de programmation, tels que les nombres et les chaînes de caractères, et assure que ces structures ont la forme demandée.
- D'un autre côté, j'identifie que Lidy répond à un besoin qui est déjà traité par les JSON Schema et qu'il doit exister d'autres produits qui répondent à ce besoin. Je remarque aussi l'absence de spécification et de documentation pour Lidy.

Ces considérations prises en compte, je choisis d'affirmer mon intérêt pour le sujet Lidy. Je continue de creuser le sujet et j'identifie des faiblesses supplémentaires :

- Le projet Lidy n'a que très peu de tests unitaires. La plupart des tests qui assurent le bon fonctionnement de Lidy sont en fait les tests unitaires du projet Leto. Dans une entreprise de traduction de Lidy, les tests de Leto ne seront pas disponibles.
- L'implémentation actuelle du projet Lidy ne permet pas de garantir la validité d'une grammaire Lidy au moment de son chargement. Les erreurs ne se manifestent qu'au moment où Lidy cherchera à utiliser le code de validation invalide.
- L'implémentation ne spécifie par conséquent pas comment les erreurs faites par le développeur du schéma Lidy doivent être rapportées. L'implémentation présuppose simplement que ces erreurs ne peuvent pas exister.

La nature purement programmation du problème, et l'autonomie dont je dispose sur ce sujet sont cependant des atouts suffisants pour que je décide de continuer de travailler sur le projet Lidy.

### YAML

Lidy a pour but d'être un vérificateur de données structurées générique pour YAML. Présentons donc rapidement YAML. YAML est un langage de sérialisation. Il est en cela similaire à JSON (JavaScript Object Notation), avec la différence que YAML vise spécifiquement à être facile à lire pour les développeurs, humains, par opposition aux machines. Notons que YAML a été pensé comme une extension de JSON, au sens que tout document JSON valide est aussi un document YAML valide. La spécification YAML 1.2, la dernière en date, exige au minimum le support de deux formats de données composites et d'un format de données scalaires (élémentaire, atomique), voir [Failsafe Schema](#yaml-recommended-schema) dans la spécification. Il s'agit des formats suivants :

- "Generic Mapping" (map): Un format générique pour les associations nom-valeur. Ce format est caractérisé par l'utilisation du caractère deux-points ":", entre le nom et la valeur.
- "Generic Sequence" (seq): Un format générique pour les listes de valeurs. Ce format est caractérisé par l'utilisation de tiret en début de ligne, pour chaque valeur ou bien caractérisés par des crochets autour d'une liste de valeurs séparées par des virgules.
- "Generic String" (str): Un format pour toutes les valeurs scalaires.

Cependant, la plupart des implémentations de YAML supporte aussi les quatre autres formats de données scalaires du JSON. Ces formats sont spécifiés dans le [chapitre 10.2 de la spécification YAML](#yaml-json-schema). Il s'agit des types de données suivants :

- Null : Ce type n'a qu'une valeur possible : "null"
- Boolean : "true" ou "false"
- Integer : un entier positive ou négatif
- Floating Point : un nombre à virgule

Par ailleurs, une bonne partie des implémentations de YAML supporte aussi le type [Timestamp](#yaml-timestamp), spécifié dans la version 1.1 de YAML. Ce type de données sert à spécifier des dates et n'a pas de limite de précision temporelle.

### Aperçu de l'utilisation de Lidy

Lidy permet à un développeur de spécifier des règles que Lidy interprète et utilise pour vérifier la validité d'un document YAML. Ces règles permettent de vérifier que les valeurs qui sont fournies par l'utilisateur correspondent bien aux types attendus.

Voici par exemple, un schéma Lidy spécifiant une règle pour décrire des chimères :

```yaml
main: chimera

chimera:
  _map:
    headType: animalFamily
    trunkType: animalFamily
    legCount: int
    legType: animalFamily
    tailType: animalFamily
    wingCount: int
    wingType: animalFamily

animalFamily:
  _in: [bird, canine, feline, leonine, prey]
```

La règle `main` sert à indiquer la règle principale du document. La règle `animalFamily` utilise le spécificateur `_in` qui exige que la valeur fournie soit parmi les valeurs listées. La règle `int` est une règle prédéfinie de Lidy qui n'accepte que des entiers. Enfin, la règle chimera utilise le spécificateur de Mapping, avec le mot-clé `_map`, qui n'accepte que les Mappings YAML dont les nom-valeurs sont spécifiés par une paire liant un nom verbatim, à une expression Lidy.

Lidy supporte aussi des types définis de manière récursive. Voici par exemple un schéma Lidy spécifiant un arbre avec des chaînes de caractères aux feuilles :

```yaml
main: tree

tree:
  _oneOf:
    - node
    - leaf

node:
  _listOf: tree

leaf: string
```

Le spécifieur `_oneOf` reçoit une liste d'expression Lidy et n'accepte que les valeurs YAML qui valident au moins une de ces expressions. Le mot-clé `_listOf` reçoit une expression Lidy et constitue un spécifieur de qui accepte les séquences YAML dont chaque élément valide l'expression Lidy reçue. Ainsi, le document YAML suivant est un arbre valide :

```yaml
- - - a
  - - b
  - c
  - d
  - - e
    - f
- g
```

Tandis que le document YAML suivant n'est pas un arbre valide :

```yaml
- - a
  - b: c
    d: e
  - {}
- 3
- null
```

Il n'est pas valide car il contient des données qui ne sont pas explicitement autorisées par le schéma Lidy (mapping, entier, valeur null).

Les fonctionnalités de Lidy sont présentées de manière plus exhaustives dans [la section short reference du README de Lidy](#lidy-short-reference).

## Aperçu du fonctionnement de Lidy-JS

Dans son implémentation JS, Lidy utilise une librairie de désérialisation YAML pour convertir le schéma Lidy, ainsi que le document à valider, d'une chaîne de caractères YAML en une structure de données JS. Le document à valider est parcouru concurremment aux expressions du schéma Lidy, avec des appels récursifs de fonction.

- Lorsqu'un validateur produit une erreur, la validation est interrompue et l'erreur est rapportée à l'utilisateur, avec une description de l'erreur et le numéro de ligne du document à valider. Cette gestion d'erreur est basée sur le système de levée et attrapage d'exception de JS, aussi le code ne peut rapporter qu'une seule erreur de validation à l'utilisateur.
- La résolution des noms de règle est possible à tout moment car le schéma Lidy est passé en paramètre de toutes les fonctions récursives, dans une valeur de contexte global.
- À chaque fois qu'une règle est validée, Lidy cherche à exécuter du code JS fourni par le développeur, afin de construire une instance JS correspondant à la section du document qui vient d'être validée. Ceci permet d'effectuer des vérifications supplémentaires, ainsi que des transformations sur les données de l'utilisateur ; par exemple, la normalisation de ces données.
- Enfin, si la validation termine sans erreur, Lidy produit l'instance de la règle principale (main) et la renvoie au développeur.

## [Analyse et réalisation]

## Recherche, travail et impression sur Golang

L'écriture de Lidy en Go a constitué mon premier travail avec ce langage. Go est un langage très différent de tous les autres langages avec lesquels j'ai travaillé. J'entends souvent dire de Go que c'est un langage étrange. Les développeurs qui expriment cet avis donnent souvent pour premier argument, **la syntax de Go**, choisissant de rendre obligatoire les accolades des blocs de code, mais retirant les parenthèses des tests des structures de contrôle (if/while/for) ; de même Go autorise certaines instructions goto, support l'usage de labels et les signatures de méthodes utilisant quatre parenthèses plutôt que deux, ce que certains développeurs trouvent lourd. Je ne suis pas de cet avis ; tout au contraire, je suis très satisfait de toutes les décisions prises relatives à la syntaxe de Golang. Je trouve aussi qu'elle n'est en rien étrange lorsqu'on la compare à la syntaxe de langages tels que Python, Visual Basic et Ruby, pour ne citer que les langages [les plus utilisés](#tiobe) de ceux qui rejettent la syntaxe dominante. Si je pense que Go est un langage étrange, ce n'est pas pour sa syntaxe, mais plutôt pour sa philosophie.

En effet, Go est un langage avec une forte philosophie de minimalisme et pragmatisme. L'outil Golang cherche simultanément à fournir l'ensemble des outils nécessaires à l'écriture de code Go dans des conditions de production d'entreprises, mais aussi à fournir aussi peu d'outils que possible et que chacun des outils fournis soit aussi simple que possible. Par exemple, le langage Go lui-même est dénudé d'opérateur aussi commun que celui permettant de savoir si une valeur est présente dans une liste (`.includes`, `.contains`). De même, la librairie standard Golang n'a aussi que deux structures de donnée : le tableau (slice) et le tableau associatif hashé (map). Ces deux structures sont suffisantes pour couvrir tous les besoins pratiques d'un développeur, mais leur nombre extrêmement limité signifie que le développeur ne peut pas exprimer son **intention**, ni exprimer de **contrat précis** par son choix d'une structure de programmation. Ceci détonne avec les langages de programmation plus communs tels que Java et C++, qui offrent une librairie standard avec plusieurs dizaines de structures de données différentes, chacune répondant à un usage précis.

Ainsi, le minimalisme pragmatique de Golang force les développeurs à décrire de manière plus explicite et plus impérative certaines opérations standards de programmation. Golang les contraint aussi à trouver de nouvelles manières d'exprimer leur intention de programmation. Cette tâche est difficile et peut donner l'impression de devoir tout ré-apprendre. Voila pourquoi selon moi Golang produit l'impression d'être un langage étrange.

Au fur et à mesure de mon utilisation de Go et de mes lectures à son sujet, j'ai appris que Go avait été pensé par les ingénieurs de Google pour ressembler au langage C ; une ressemblance qui est en effet fort perceptible. Après plusieurs semaines d'utilisation de Go, je trouve aussi à Go des ressemblances avec Python, un autre langage apprécié chez Google. Go, en tant que langage avec un fort engagement pour la programmation impérative et le minimalisme des fonctionnalités est un bon langage pour découvrir et apprendre la programmation.

## Approches initiales, difficultés et exploration des stratégies

L'idée initiale pour réaliser la ré-écriture de Lidy en Golang a été la traduction du code JS de Lidy en code Golang. Immédiatement, des difficultés se posent :

- JS est un langage permissif, dynamiquement typé, tandis que Golang est strict et statiquement typé.
- Mes connaissances en Golang sont très limitées, je n'ai jamais créé de projet en Golang.

Afin de surmonter cette double difficulté, j'ai l'idée de passer par un langage intermédiaire : TypeScript. TypeScript est une extension du langage JS pour supporter l'utilisation de valeurs statiquement typées. J'ai appris ce langage durant mon stage du printemps 2019, chez Deskpro. Il m'apparaît que ce langage permettrait de surmonter la difficulté de dureté des types en Golang de manière plus progressive. Je commence donc une traduction de Lidy en TypeScript.

La traduction de code JS en Typescript signifie souvent le simple ajout de types au code. Déterminer correctement ces types requière d'explorer le code, afin de comprendre comment les valeurs transitent dans le code, et quelles informations elles reçoivent et contiennent. Je réalise donc ce travail d'ajout des types au code. Je rencontre cependant assez vite un certain nombre de limitations. En effet, JS permet d'assigner facilement une propriété avec n'importe quel nom à une valeur, avec pour seul contrainte que ladite valeur soit un objet. Ceci rend la modélisation des types de l'implémentation en JS de Lidy difficile, même avec l'aide de TypeScript. Outre le problème de type, on rencontre d'autres problèmes communs au changement de langages, telles que les différences de niveau de fonctionnalités offertes d'un langage à un autre : JS est un langage haut niveau et un langage de scriptage, alors que Go est un langage orienté système et microservices. Go donne donc plus de contrôle sur le détail de l'exécution, alors que JS se concentre plutôt sur la production de résultats avec peu de code. Me heurtant à toutes ces difficultés, ainsi qu'au problème de conception de cet implémentation de Lidy qui délaisse la vérification du schéma, problème déjà évoqué dans la section [Reprise du travail sur Lidy](#reprise-du-travail-sur-lidy), j'ai décidé de laisser de côté l'approche par traduction de code Lidy existant, et de préférer redévelopper Lidy sans m'appuyer sur le code existant. C'est une décision d'autant plus ambitieuse que Lidy est dépourvue de spécification et de documentation, et n'a presque aucun test unitaire.

À ce stade de la réécriture de Lidy, je suis conscient que les conditions dans lesquelles je vais avoir à travailler sont assez différentes des conditions dans lesquelles Lidy a été initialement développé. En effet, Lidy a été développé dans le contexte de Leto, afin de permettre l'analyse de fichier YAML, afin de vérifier que leur structure est conforme au schéma TOSCA spécifié en YAML par un fichier de grammaire Lidy au sein du projet Leto. Cependant, je n'ai pas les compétences pour travailler sur Leto. Je ne connais pas la grammaire TOSCA, ni même les concepts d'orchestration associés et je juge que je n'aurais pas assez de temps pour acquérir ces connaissances et compétences dans le temps qui m'était imparti : entre 4 et 8 semaines. Lidy avait été développé sans spécification, mais avec les besoins de Leto pour besoins directeurs, il ne me sera pas possible de travailler ainsi. Je décide donc de m'atteler moi-même à la tâche de spécification de Lidy, afin que mon code repose sur un socle solide.

## Changement du DSL Lidy et spécification

Conscient que je ne disposais que de peu de temps, j'ai choisi de concentrer mon travail de spécification sur les parties de Lidy qui en avaient le plus besoin. J'étais notamment gêné par une poignée de mot-clés de Lidy, pour lesquels le comportement attendu était obscure ou problématique. Il s'agissait des mot-clés suivant :

- (QSpec1: copy) `_copy`
- (QSpec2: optional) `_optional`

Il y avait aussi la question de la manière dont les mot-clés qui étaient permis ensemble devaient se combiner. Les combinaisons suivantes posaient problème :

- (QSpec3: list/dict) les règles par défaut `list` et `dict` étaient plutôt redondantes car elles pouvaient être remplacées par les expressions `{ _listOf: any }` et ` _dictOf: { any: any } }`.

- (QSpec4: dict/dictOf) `_dict` avec `_dictOf`, si une clé est reconnue simultanément par `_dict` et `_dictOf`, pour les entrées non-requises de `_dict`, faut-il autoriser la valeur à avoir le type proposé par le `_dictOf`, ou bien n'autoriser que le type donné par le `_dict` ?

- (QSpec5: dict-vs-map) Lidy utilisait le radical `dict` pour former les mot-clés qui référaient aux mappings YAML. Le radical `map`, utilisé dans la spécification YAML semble plus approprié ici. Il a aussi les avantages d'être un mot entier et d'être plus court que `dict`.

- (QSpec6: required-vs-xFacultative) Lidy utilisait un mot-clé \_required, pour spécifier les entrées obligatoires d'un mapping. Ce mot-clé est inspiré des JSON-Schema. Sans rentrer trop dans les détails, ceci pose des problèmes car cela oblige l'utilisateur à répéter le nom des règles, ce qui peut mener à des erreurs, dues à une faute de frappe ou de copie. Ceci pose aussi problème car implique que, par défaut, les entrées des mappings sont optionnels. Ce comportement par défaut peut-être adapté lorsqu'il s'agit de vérifier des données entrées dans un formulaire, comme c'est le cas pour les JSON-Schéma, mais pose problème lorsqu'il s'agit de vérifier des langages et DSL comme le fait Lidy.

- (QSpec7: notin) Enfin, le mot-clé `_notin` n'était pas utilisé et n'avait pas tests. Il n'avait donc pas de comportement bien défini. Par ailleurs, le seul cas d'usage d'un moyen de spécification par exclusion me semblait être pour l'exclusion des mots-clés dans les identifieurs, ce qui posait beaucoup de problèmes.

J'ai donc pris les décisions suivantes :

- (QSpec3: list/dict) Retirer les règles par défaut `list` et `dict`
- (QSpec7: notin) Retirer le mot-clé `_notin`
- (QSpec5: dict-vs-map) Remplacer `dict` par `map` dans `_dict` et `_dictOf`
- (QSpec4: dict/dictOf) N'autoriser que le type donné par le `_dict`, dans le doute, l'option la plus strict est généralement meilleure.
- (QSpec2: optional) -- décision prise en commun avec QSpec6, required-vs-xFacultative
- (QSpec6: required-vs-xFacultative) Les mot-clés `_required` et `_optional` sont remplacés par une utilisation plus uniforme, avec les mots-clés `_listFacultative` et `_mapFacultative`.
  - Le radicale "Facultative" a été préféré à "Optional" car les mots-clés `_mapOf` et `_listOf` commençaient déjà par les cinq et six caractères `_mapO` et `_listO`. "Optional" aurait donc ralenti l'utilisation de l'autocompletion de un caractères pour ces mot-clés.
- (QSpec1: copy) Renommer le mot-clé `_copy` en `_merge`.
  - Le mot-clé `_merge` accepte désormais une liste d'expression lidy plutôt que une seule expression. Le spécifieur de mapping qui contient le mot-clé `_merge` est donc marqué comme héritant de chacune de ces expressions.

### Détails sur la spécification du mot-clé `_mergeable`

Il a été déterminé que l'utilisation et le comportement du mot-clé `_merge` devait respecter certaines caractéristiques. Ainsi, durant la première lecture du schéma, Lidy doit vérifier que le mot-clé n'est utilisé qu'avec des expressions Lidy qui soient fusionnables ("mergeable"). Les expressions Lidy fusionnables sont précisément :

- les règles correspondant à une expression mergeable
- les spécifieurs \_oneOf ne contenant que des expressions mergeables
- les spécifieurs de mappings ne contenant pas de mot-clé \_mapOf

Si le mot-clé `_merge` est utilisé sur une expression qui n'est pas mergeable, Lidy doit le signaler.

Lidy doit aussi vérifier que l'ensemble des mappings concernés par un \_merge ne contienne jamais plusieurs entrées sous le même nom. Si ceci se produit, Lidy doit le signaler à l'utilisateur, par une erreur au moment de la première lecture de schéma.

À l'étape de validation de la donnée, Lidy doit vérifier que l'ensemble des entrées requises sont présentes. Lidy doit aussi vérifier que l'ensemble des entrées connues ont la bonne valeur. Enfin, Lidy doit vérifier que l'ensemble des entrées qui sont présentes sont bien connues, ou bien, dans le cas ou le mot-clé `_mapOf` est présent sur le nœud contenant le mot-clé `_merge`, Lidy doit vérifier que les entrées qui ne sont pas connues respectent bien les expressions Lidy du `_mapOf` pour la clé et pour la valeur.

## Test

Conscient de l'aspect chronophage de l'écriture d'une spécification complète, j'opte pour produire la spécification sous forme d'un ensemble de tests commentés. Je réalise initialement ces tests en TypeScript, avec l'outil de test unitaire Japa. Ceci me permet d'utiliser le code existant pour ajouter un niveau de vérification à mes tests de spécification, puisque le code existant peut-être executé depuis TypeScript.

Lorsque vient le moment de passer à Golang, les discussions que j'ai avec mon maître de stage Xavier TALON sur l'intérêt de rendre Lidy disponible dans plusieurs langages m'amène à choisir de mettre mes tests dans un format qui pourra être consommé depuis n'importe quel langage de programmation. Je choisi le langage de sérialisation HJSON "Human JSON", un format très similaire au JSON, qui, tout comme le YAML vise à être facile à utiliser par les humains. Il se distingue cependant du YAML par ses décisions conservatrices vis-à-vis de l'utilisation des accolades (`{}`). HJSON choisit de préserver les accolades, là où YAML les interdit.

Afin de pouvoir utiliser ces données de tests en Golang, je comprends que j'ai besoin d'un outil capable d'exécuter les tests à chaque modification du code ou des tests. J'ai aussi besoin d'un outil capable de réaliser des statistiques sur le nombre de tests exécutés et qui ont réussi. Cet outil doit aussi être capable de gérer la désactivation de tests pour les tests qui ne doivent pas être exécutés. J'adopte et j'apprends donc la suite d'outil de test comportemental Golang **Ginkgo**. Cet outil répond aux contraintes listées ci-dessus ; c'est aussi l'outil le plus abouti en terme de tests unitaires et de tests d'intégration dans la communauté Golang.

Pour pouvoir charger les tests dans Ginkgo, il me faut obtenir les données présentes dans les différents fichiers HJSON de la spécification, lire ces fichiers, désérialiser les données HJSON, produire des fonctions capables de consommer ces données et enfin donner ces fonctions à Ginkgo pour que celui-ci puisse les exécuter et rapporter les erreurs.

C'est exactement ce que font les fichiers [hWalk_testdata_test.go](https ://github.com/ditrit/lidy/blob/go-2020-10/hWalk_testdata_test.go) et [hReadTestdata_test.go](https ://github.com/ditrit/lidy/blob/go-2020-10/hReadTestdata_test.go). hWalk_testdata_test.go se charge de parcourir les dossiers de la spécification afin d'obtenir la liste des fichiers de données. hReadTestdata_test.go quand à lui, lit ces fichiers, les désérialise et produit les tests Ginkgo à partir des données.

Avoir du code dédié au chargement des données de tests à l'avantage de donner beaucoup de contrôle sur la manière dont ces données sont utilisées au moment du test. C'est une approche très flexible. Par exemple, ceci me permet d'utiliser le commentaire d'explication du but du test comme moyen de spécifier si le test doit réussir ou échouer ; dans [map.spec.hjson](https ://github.com/ditrit/lidy/blob/go-2020-10/testdata/collection/map.spec.hjson), on trouve (extrait):

```hjson
{
  "_map 1 entry": {
    expression: _map: { aa: float }

    "accept if valid": {
      "{ aa: 2.2 }": {}
      "{ aa: 0 }": {}
    }

    "reject missing entry": {
      "{}": {}
    }
  }
}
```

Dans l'extrait ci-dessus, le schéma donné doit valider les documents `{ aa: 2.2 }` et `{ aa: 0 }`, mais rejeter le document `{}`. La seule manière pour le test de savoir si les documents doivent être acceptés ou rejetés par le schéma est le commentaire associé aux tests : Celui-ci commence soit par "accept", soit par "reject". Cette flexibilité permet donc d'avoir des tests avec des descriptions organiques, sans avoir besoin de se répéter.

## Retour sur le travail de spécification

Lorsque j'analyse le déroulement de mon projet de ré-écriture de Lidy en Golang, je trouve que les tests ont été d'une très grande utilité, mais que cependant, l'effort réalisé en amont de la spécification semble ne pas avoir été suffisant. Je pense qu'un point distinctif sur lequel je pourrais m'améliorer à l'avenir est la _délimitation du besoin_. Dans le cas d'un logiciel existant, comme pour Lidy, cet effort doit probablement se faire en s'appuyant sur les fonctionnalités existantes. On peut envisager la chose comme un cycle en V-inversé, suivi d'un cycle en V :

##### _adapted-v-model-for-existing-software_

![adapted v-model for existing software schema](misc/specification-v-cycle.png)

## Retour sur les tests

Un autre point qui pourrait être améliorer est le chargement et l'exécution des tests. Lidy est un outil qui se prête bien à la production de tests sous forme de jeux de données. Des recherches que j'ai eu l'occasion de mener après la fin du projet m'ont permis de trouver le nom donné à ces situations : il s'agit de **tests orientés données**. En anglais, on parle de "table driven tests" dans les cas simples et de "data-driven tests" ou de "parametrized tests" dans les cas généraux. Il existe des librairies de tests spécialisées sur ce type de tests. Lidy bénéficierait d'utiliser une telle librairie. Il est à noter cependant, que les tests de Lidy ont des besoins forts sur les fonctionnalités de la paramétrisation. Il n'est pas garanti qu'une librairie suffisamment avancée existe déjà.

## Support des numéros de ligne lors de la conversion du YAML en Go

Une des contraintes auxquelles Lidy doit répondre est la conservation des numéros de ligne lors de la conversion du YAML en Go. En Golang, il existe une seul librairie pour faire la sérialisation/désérialisation YAML. Il s'agit de [Go-YAML](#go-yaml). Cette librairie est maintenu par les développeurs de Canonical, l'entreprise qui produit et maintient la distribution Linux Ubuntu. Cette librairie se contente en fait de faire appel à [libyaml](#libyaml), l'implémentation officielle de YAML en langage C. Dans la version 2 de Go-YAML, il n'est pas possible d'obtenir les numéros de ligne correspondant aux valeurs extraites du document. Cependant, le support des numéros de lignes [est une issue dans le bug tracker](#go-yaml-issue-108): des contributeurs de la librairie ont indiqué que la conservation des numéros de ligne était supportée dans la version 3 de la librairie. Ils n'ont néanmoins pas donné d'exemples. Par ailleurs, la documentation est extrêmement limitée sur le sujet et ne fournit pas non-plus d'exemple. C'est en lisant le code de la librairie que j'ai pu comprendre comment utiliser la version 3 de Go-YAML pour obtenir les numéros de ligne. J'ai [publié l'information dans l'issue concernée](#go-yaml-issue-108-mc) afin d'éviter aux autres développeurs ayant ce problème d'avoir à chercher comme moi.

## Conception de l'API de la librairie Lidy

### Invocation

Une fois la question des dépendances externes de Lidy résolue, il me fallait décider de comment le développeur qui utiliserait la librairie Lidy l'invoquerait. Il s'agissait de la première API de librairie que je réalisais en Golang et avec mes connaissances limitées de la communauté Go, je ne savais pas quelle philosophie adopter pour produire une bonne interface du point de vu des standards Golang.

J'étais en particulier gêné par mes habitudes de bonnes pratiques dans les autres langages. En effet, dans les langages orientés objets, c'est une bonne pratique de ne jamais exposer les propriétés d'un objet à l'utilisateur et de ne lui permettre de lire et modifier ces propriétés qu'à travers des méthodes dites _accesseur_. Ceci m'a amené à choisir d'implémenter en Go un pattern orienté objet nommé "fluent interface", pattern dans lequel les appels de méthodes sont chaînés. On peut par exemple voir ce pattern dans le fichier de test de Lidy [`hBuilderMap_test.go`](https://github.com/ditrit/lidy/blob/39f8efc3b56645113c209ffa7671b1177a33dce4/hBuilderMap_test.go#L16-L35), dans lequel les méthodes `NewParser`, `With` et `Parse` sont chaînées. Je sais aujourd'hui que ce type d'interface est rarement utilisé en Go et qu'il est en fait courant de donner accès à l'utilisateurs aux propriétés d'un objet, afin qu'il puisse le construire. À ma connaissance, ce type d'approche n'est utilisé qu'en C et en Go.

### Fichiers

Une autres question importante à laquelle il a fallut répondre est celle du chargement des fichiers dans Lidy. En effet, Lidy est une librairie qui se veut portable. Il est possible de compiler le code Golang en WASM et de l'utiliser depuis d'autres langages. Cependant, lorsqu'on utilise cette approche, il n'est pas possible d'utiliser les fonctions de l'OS, tel que l'ouverture de fichiers. Ceci se comprend bien dans la mesure ou l'on peut être amené à exécuter du code WASM dans le navigateur, plateforme ne disposant pas de système de fichiers.

Cependant, Lidy utilise le concept de fichier lorsqu'il s'agit de signaler des erreurs à l'utilisateur. La solution à ce problème est d'accepter de la part de l'utilisateur le nom du fichier en plus de son contenu. Pour rendre une telle interface plus agréable pour le développeur, Lidy [dispose d'un concept de fichier](https://github.com/ditrit/lidy/blob/master/lidy.go#L136), faisant abstraction de l'OS. Ceci permet de couvrir l'ensemble des cas d'utilisation de Lidy, tant sur les plateformes sans OS que avec OS.

### Résultats de Lidy

La question de la forme des résultats produits par Lidy a aussi posé quelques problèmes.

Le premier problème que j'ai rencontré est que le système de type Go pose des limites et requière d'utiliser `interface{}` lorsqu'on veut faire cohabiter des types divers. `interface{}` est l'équivalent du type `Object` dans les langages orientés objet ; ceci illustre une fois de plus la défiance de Golang pour la programmation intentionnelle. Lorsque l'on connaît tous les types auxquels on peut avoir à faire, si l'on souhaite éviter l'utilisation de `interface{}`, on peut utiliser une astuce faisant appel à une structure, mais ceci n'est pas nécessairement utile. Le confort apporté par cette astuce est celui d'éviter les "cast de types" (conversion de type statique) de Golang. En effet, les types Golang ne disposent d'aucun mécanisme pour garantir qu'il sera possible d'identifier le type réel de la donnée. Cependant, cette approche a tout autant de désavantages dans la mesure où elle permet l'expression de valeurs insensées. On pourrait être tenté de dire que le système de typage de Go est faible. Puisque Lidy peut être amené à manipuler des types de données créés par l'utilisateur, la seconde approche n'est pas envisageable, ou du moins elle n'apporte presque aucun bénéfice. J'ai donc opté pour la première approche.

Le second problème qui s'est posé était de faire figurer dans les résultats de Lidy les numéros de ligne et nom de fichier en plus des valeurs désérialisées et des valeurs produites par les Builders. Il n'y avait qu'une seule solution possible à ce problème. Il s'agissait d'alterner dans les résultats de Lidy entre des niveaux de données Lidy et des niveaux de données utilisateur. Ceci permet d'indiquer pour chaque nœud, sa position dans le document.

## Conception interne de Lidy

Une fois l'API externe de Lidy décidée, les spécifications et tests écrits et la librairie de désérialisation YAML validée, le future de Lidy était certain, dans la mesure où les seuls efforts qu'il restait à fournir étaient des efforts d'implémentation de logique logiciel et que toutes les cause externes susceptibles de faire échouer ou de ralentir l'implémentation de Lidy avait été éliminées.

J'avais alors une idée assez précise de la manière dont Lidy devait réaliser son travail. Je savais qu'il devait y avoir deux étapes de validation : une première étape réalisée dès que le schéma Lidy est reçu et une deuxième étape réalisée lorsque le document à vérifier est reçu. Ceci peut être synthétisé par le diagramme [Fonctionnement de NewParser().Parse()](#fonctionnement-de-newparserparse). Dans ce diagramme d'exécution, la méthode `.parseContent()` reçois quatre paramètres:

- _schema_ (requis) le schéma Lidy contenant les règles
- _target_ quel règle du schéma utiliser pour commencer la validation
- _option_ quel jeu d'option utiliser vis-à-vis des erreurs et warnings
- _builderMap_ (`.With`), un dictionnaire de fonctions capables de vérifier et construire les entités associées aux règles exportées. Les flèches entre le block `.parseContent()` et le block des builders symbolisent les appels aux fonctions de la builder-map.

La première étape, comme la deuxième étape, produit soit des erreurs soit un résultat. La forme résultat de la deuxième étape a déjà été décidée, mais pas celle du résultat de la première étape.

##### lidy-newparser-parse

![Fonctionnement de NewParser.Parse()](misc/Lidy-NewParser-Parse.png)

Une question demeure cependant, faut-il réaliser des transformations sur le schéma entre la première étape et la deuxième étape ? Quel format donner à la représentation interne du schéma pour que l'implémentation de la deuxième étape soit simple ? L'implémentation JS de Lidy ne disposait pas d'une première étape de validation du schéma et utilisait donc le schéma sous le format produit par le dé-sérialiser YAML.

Le système de type de Golang supporte un concept objet appelé "liaison dynamique". Il s'agit de la possibilité d'implémenter la même méthode dans différents objets et d'appeler la méthode attachée à l'objet que l'on manipule, sans que l'appelant n'ait à se soucier du type de l'objet et donc sans qu'il n'ait à se soucier de quelle occurrence de la méthode sera effectivement appelée. Dans le cas de Lidy, un tel mécanisme peut s'avérer avantageux pour le concept d'expression. Ceci permet de créer différentes "classes" qui, chacune, implémentent l'interface "expression"; une interface élémentaire de Lidy capable de dire si une structure YAML est valide d'après cette expression Lidy ou pas.

En pratique, l'interface utilisée est plus complexe. On trouve l'interface interne suivante :

[`lidySchemaType.go`](https://github.com/ditrit/lidy/blob/go-2020-10/lidySchemaType.go#L9-L13)

```go
type tExpression interface {
  match(content yaml.Node, parser *tParser) (tResult, []error)
  name() string
  description() string
}
```

Les méthodes `name()` et `description()` permettent d'obtenir un nom et une description peu profonde du test de validation réalisé par l'expression Lidy. La méthode `match()` est plus complexe. C'est cette méthode qui permet d'invoquer l'expression pour réaliser le test d'une valeur Lidy. Comme indiqué ci-avant, cette méthode prend en paramètre le nœud yaml à tester (`content yaml.Node`). Cependant, elle accepte aussi une instance de parseur `parser *tParser`, comme contexte. Ceci lui permet d'accéder aux options et aux builders donnés par l'utilisateur pour la validation. En sortie de la méthode, on trouve la paire (tResult, []error). `[]error` ?et? une liste d'erreurs. Elle est vide si et seulement si le test mené par l'expression a réussi. Si elle est non-vide elle doit rapporter autant d'erreurs qu'il est possible de rapporter. `tResult` est la représentation interne à Lidy d'un résultat pour l'utilisateur. Cette valeur est non-nulle si et seulement si la liste d'erreur est vide. En d'autres termes, `match()` renvoie soit un résultat, soit une ou plusieurs erreurs.

Ainsi, le Schéma YAML est représenté sous la forme d'un ensemble d'expressions qui se contiennent les unes les autres. On dénombre 6 types d'expressions:

- `tRule`
- `tMap`
- `tList`
- `tOneOf`
- `tIn`
- `tRegex`

Elles correspondent aux 5 spécifieurs, plus les références vers des règles. Il est à noter que dans le cas des règles non exportées, `tRule`, le type référence vers une règle n'est pas nécessaire. En effet, on aurait pu directement remplacer la référence par la valeur de la règle et ainsi accélérer la validation des données. Cependant, afin de faciliter le débuggage et l'ajout future de fonctionnalités au système de règles, il est intéressant de faire apparaître les expressions-règles dans l'arbre d'expression.

## Analyse et validation du schéma

Valider un schéma Lidy comporte plusieurs aspects.

- Détéction du type de chaque expression: Si c'est une règle cela corresponds à une chaîne de caractère Lidy. Cependant, si c'est un dictionnaire, il faut y chercher un mot clé ou un ensemble de mot-clés qui permettent d'identifier de manière unique le type de spécifieur utilisé par le développeur.
- Vérification des expressions Lidy: Vérifier que chaque spécifieur comporte les mot-clés nécessaires, et uniquement des mot-clés connus de Lidy, autorisés pour ce spécifieur.
- Vérification de l'existence d'une déclaration de règle pour chaque référence à une règle.
- Analyse des déclarations de règle pour savoir si elles sont exportées, et si oui, sous quel nom. Vérifier que les règles pour lesquelles on trouve des builders sont toutes connues et exportées. Ce comportement dépends des options données par l'utilisateur.

Certaines vérifications posent des difficultés spécifiques, lié au fait que ces vérification ne peuvent pas être réalisée sur la base des données locale seuls, mais requière des données pouvant venir d'un autre point du document.

Problème A, références directes et des cycles:

`_merge`, `_oneOf` et les références de règles sont "directes". En effet, ces mots-clé permettent de faire référence à d'autres règles dont la vérification sera réalisée sur le même nœud que celui sur lequel l'expression en cours opère. Ceci signifie que ces trois constructions sont ouvertes au problème de boucle infinie. Pour donner le cas le plus simple, il suffit qu'une règle fasse référence à elle même dans un \_merge, dans un \_oneOf ou dans une référence pour que ceci crée une boucle infinie qu moment de la vérification de la règle. Cependant, les cas plus complexes peuvent impliquer un nombre arbitrairement grand de règles.

Problème B, ordre de parcours des règles:

Le mot-clé `_merge`, pose un problème spécifique supplémentaire: il ne peux être utilisé que sur des règles mergeable. Or, dans l'implémentation en JavaScript, ainsi que dans mon implémentation d'origine en Go, c'est aussi au moment de l'analyse que l'on découvre sur quel règles \_merge est utilisé. Il semble donc y avoir un problème sur l'ordre dans lequel les analyses sont effectuées.

Le problème (A) est un problème de detection de cycles au sein d'un graph orienté. Ce problème se résous en applicant un algorithme de parcours de graphe en profondeur avec trois marquages possible pour chaque nœuds au lieu de seulement deux. Les nœuds passent du marquage 0 au marquage 1 lorsqu'il sont exploré à la descente, puis du marquage 1 au marquage 2 à la remontée. Si un lien descends vers un nœuds marqué 1, nœud que nous appellerons nœuds d'alerte, cela prouve l'existence d'un cycle. Il est alors possible de signaler ce cycle en listant l'ensemble des descendant du nœuds d'alerte. L'exploration peut alors continuer en excluant le lien problématique.

Une implication notable de l'algorithme décrit ci-dessus est que le parcours des règles dans un ordre déterminé par le graphe est inévitable. Ceci est gênant car on souhaite rapporter au développeur les erreurs dans l'ordre dans lequel elles apparaissent. Il s'agit aussi que la fonctionnalité qui sert à ne rapporter que la première erreur rencontrée rapporte systématiquement la première erreur du document. En effet, ces deux contraintes obligent à que l'ensemble des erreurs soient rapportées au cours d'une unique passe, réalisée dans l'ordre du document. Il doit donc y avoir une passe dédiée à la détéction des cycles. Comme cette passe est nécessaire à la détection de certaines erreur, elle doit absolument être effectuée avant la passe de signalement des erreurs. Ceci nous place donc dans un mode de fonctionnement en quatre passes:

1. Analyse des en-têtes de règle (nom, export et présence de builders)
2. Recherche de cycles de dépendances directes
3. Analyse des règles avec signalement des erreurs du développeur
4. Validation des données utilisateurs, avec signalement des erreurs de l'utilisateur

La première passe ne concerne que les noms des règles et les builders. Elle est faite dans des positions des règles dans le document. La seconde passe, elle, examine le contenu des nœuds des manière récursive, mais ne s'intéresse. Elle établie les dépendances directes et suit ces dépendances, réalisant ainsi un parcours de graphe en profondeur. Elle vérifie qu'aucun
(suivant l'ordre topologique des dépendances)
(suivant l'ordre positionnel du document)

## Règles Lidy prédéfinies

Lidy fourni à l'utilisateur huit [règles prédéfinies](#lidy-predefined-rules). Il s'agit de règles acceptant chacun des 7 types du schéma de la version 2.1 de YAML, ainsi que le type `any` qui accepte toute donnée YAML, sans aucune validation.

Les 5 types ci-dessous sont natifs à Go et sont fourni à l'utilisateur sous le type Go correspondant.

- `boolean`
- `float`
- `int` -- integer
- `string`
- `nullType` -- null

Les 2 types ci-dessous sont moins communs. Ils sont validé par une expression régulière et fourni à l'utilisateur comme une chaîne de caractères.

- `timestamp` -- ISO 8601 datetime
- `binary` -- a base64 encoded binary blob, with space characters allowed

Enfin, le type `any` accèpte toute les donnée YAML.

- `any`

Une particularité intéressante du type `any` est que l'utilisateur pourrait le construire lui-même si Lidy ne le fournissait pas. La règle suivante est une définition équivalente de la règle prédéfinie `any`:

```yaml
any:
  _oneOf:
    - boolean
    - string
    - int
    - float
    - nullType
    - { listOf: any }
    - { mapOf: { any: any } }
```

Une particularité encore plus intéressante de `any` est que l'implémentation réel de la règle dans Lidy est calquée sur la définition ci-dessus. Voir [lidyDefaultRule.go](#lidy-default-rule):

```go
ruleAny.expression = tOneOf{
  optionList: []tExpression{
    sp.lidyDefaultRuleMap["string"],
    sp.lidyDefaultRuleMap["boolean"],
    sp.lidyDefaultRuleMap["int"],
    sp.lidyDefaultRuleMap["float"],
    sp.lidyDefaultRuleMap["nullType"],
    tMap{
      tMapForm{
        mapOf: tKeyValueExpression{
          key:   ruleAny,
          value: ruleAny,
        },
      },
      tSizingNone{},
    },
    tList{
      tListForm{
        listOf: ruleAny,
      },
      tSizingNone{},
    },
  },
}
```

Cette implémentation laisse peut-être le lecteur dubitatif vis-à-vis de son efficacité. En effet, il semble que puisque `any` n'impose aucune contraintes, les vérifications imposées par la définitions ci-dessus de `any` vont forcer une exploration récursive de la totalité du contenu du noeud, alors que celui-ci aurait pu être purement ignoré. En d'autre terme, cette implémentation de `any` a un cout proportionnel à la taille du noeud, alors qu'une implémentation spécifique qui ignore le noeuds aurais un cout constant.

Il se trouve que l'exploration du contenu du noeuds est en faite inévitable, puisque la règle doit produire un résultat synthétisant toutes les informations du document d'origine.

<!--
## Validation des données
- Même problème d'interface Go pour supporter les appèles récursifs
- Difficulté sur les types avec \_merge -->

## Rapporter les erreurs

Fait :

- Question de la description des erreurs -> Interface spécifique pour permettre à un nœud du schéma de décrire la vérification qu'il opère
- Faire une fonction dédiée.
- Lui passer les informations nécessaires.
- La fonction produit une erreur descriptive, avec le numéro de ligne
- Lors qu'une fonction détecte une erreur, l'analyse se poursuit, de façon à ce que toutes les erreurs puissent être levées. Les fonctions renvoient aussi une liste d'erreurs, plutôt qu'une seule erreur.

À faire :

- Rendre les numéros de ligne et de colonne accessibles comme données présentes sur l'erreur
- Avoir des catégories d'erreurs numérotées, spécifiées dans une énumération des erreurs possibles, distinguant erreur et warning
- Les erreurs sont écrites directement dans l'objet de contexte, de façon à alléger le type de retour des fonctions, et donc éviter d'avoir à passer et concaténer les listes d'erreurs de fonction en fonction. Exception : la construction `_oneOf`, doit être capable d'explorer une hypothèse et de la rejeter. Auquel cas, les erreurs spécifiques à cette hypothèse doivent être abandonnées.
- Permettre à l'utilisateur de paramétrer le comportement en cas d'erreur.

## Schéma de fonctionnement du projet

<!--
TODO: create schema

- [v] Input type / output type for the (schema loading+validation)
- [v] Schema loading+validation overall process
- Passes to load the schema
- Communication model for the recursive exploration while (loading the schema, validating the data)
-->

## Retour sur l'écriture de Lidy en Go

# WebDBA

# Table des liens

##### go-yaml

[https://github.com/go-yaml/yaml](https://github.com/go-yaml/yaml)

##### go-yaml-issue-108

[https://github.com/go-yaml/yaml/issues/108](https://github.com/go-yaml/yaml/issues/108)

##### go-yaml-issue-108-mc

[https://github.com/go-yaml/yaml/issues/108#issuecomment-638412147](https://github.com/go-yaml/yaml/issues/108#issuecomment-638412147)

##### lib-yaml

[https://github.com/yaml/libyaml](https://github.com/yaml/libyaml)

##### lidy-default-rule

[https://github.com/ditrit/lidy/blob/39f8efc3b56645113c209ffa7671b1177a33dce4/lidyDefaultRule.go#L108-L137](https://github.com/ditrit/lidy/blob/39f8efc3b56645113c209ffa7671b1177a33dce4/lidyDefaultRule.go#L108-L137)

##### lidy-predefined-rules

[https://github.com/ditrit/lidy#predefined-lidy-rules](https://github.com/ditrit/lidy#predefined-lidy-rules)

##### lidy-short-reference

[https://github.com/ditrit/lidy#short-reference](https://github.com/ditrit/lidy#short-reference)

##### orness-valeurs

[https://www.orness.com/nos-valeurs/](https://www.orness.com/nos-valeurs/)

##### orness-histoire

[https://www.orness.com/histoire/](https://www.orness.com/histoire/)

##### orness-societe

[https://www.societe.com/societe/orness-434641072.html](https://www.societe.com/societe/orness-434641072.html)

##### orness-engagements

[https://www.orness.com/nos-engagements/](https://www.orness.com/nos-engagements/)

##### tiobe

[https://www.tiobe.com/tiobe-index/](https://www.tiobe.com/tiobe-index/)

##### top

[https://github.com/ditrit/ToP](https://github.com/ditrit/ToP)

##### yaml

[https://yaml.org/](https://yaml.org/)

##### yaml-json-schema

[https://yaml.org/spec/1.2/spec.html#id2803231](https://yaml.org/spec/1.2/spec.html#id2803231)

##### yaml-recommended-schema

[https://yaml.org/spec/1.2/spec.html#Schema](https://yaml.org/spec/1.2/spec.html#Schema)

##### yaml-timestamp

[https://yaml.org/type/timestamp.html](https://yaml.org/type/timestamp.html)
