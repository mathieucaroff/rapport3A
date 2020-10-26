# Rapport 4

Rapport de stage de Mathieu CAROFF

<!-- 3750 characteres par page
4 pages = 15000 charactères -->

## Plan

- Présentation de l'Entreprise Orness
- Présentation de l'Association Ditrit
  - Aperçu
  - Raison d'être
  - Reflexions menées dans DitRit
  - Projets réalisé à DitRit
- Présentation de l'Entreprise Crédit Agricole
  - Service
  - Equipe
- Présentation du projet pendant la période Juin-Juillet: Lidy
  - Context
  - Analyse
  - Objectifs
  - Réalisation
- Présentation du projet pendant la période Aout-Novembre: Webdba
  - Utilité
  - Histoire
  - Chantiers en cours
    - Tests
    - Permissions
    - Big Data
  - Les chantiers sur lequels j'ai travaillé

## Orness

Orness est une entreprise de services numérique (ESN), opérant à Paris, avec ses bureaux dans le 9ème arrondissment. Elle a été fondée en 2001 par Ghada AJAKA et Carole AMADO qui co-président l'entreprise, appuyées par Xavier TALON et Herve CHIBOIS, eux aussi membres fondateurs et co-directeurs techniques. [(1)][o.histoire].

Elle compte aujourd'hui plus d'une centaine d'employés cadres. Avec un chiffre d'affaire de 12 millions d'euro, elle affiche le modeste résultat de 650 mille euros. [(2)][o.societe.com]

### Culture d'entreprise

Orness accorde une grande importance à l'humain. La qualité de la vie des employés au travail, l'entente et le sentiment de sécurité morale ont une grande importance chez les dirigeants de Orness, et leur maniement de ces valeurs, dans une entreprise à taille humain, permet de créer une atmosphère relaxante chez Orness. Ainsi, les valeurs de transparence, d'audace et de partage se ressentent bien, tant chez les dirigeants que au sein des employés. [(3)][o.valeurs]

Outre l'importance accordée au bien-être au travail, Orness s'engage sur les sujets de l'Open Source, de la souveraineté numérique et de l'inclusion des femmes au travail. [(4)][o.engagements]

### Activité

<!-- TODO -->

### Expertise

[o.valeurs]: https://www.orness.com/nos-valeurs/
[o.histoire]: https://www.orness.com/histoire/
[o.societe.com]: https://www.societe.com/societe/orness-434641072.html
[o.engagements]: https://www.orness.com/nos-engagements/

## Période Juin-Juillet: Projet Lidy

Lidy est une librairie qui permet à l'utilisateur de lire et d'analyser un fichier YAML, afin de valider qu'il corresponds bien à un format complexe décrit par l'utilisateur.

### [Context]

### Origine de Lidy: Leto

Le projet Lidy a émergé comme un outils nécéssaire au développement d'un projet plus ambitieux: Leto. Leto est un projet d'orchestrateur de système multi-machines et cloud visant à implémenter le standard TOSCA, produit par le groupe OASIS. Le standard TOSCA étant au format YAML, le projet LETO s'est rapidement retrouvé dans le besoin de pouvoir analyser un fichier YAML, et de dire s'il s'agissait d'un fichier TOSCA valide ou non. Comme nous allons le voire, ce besoin s'est trouvé difficil à satisfaire, et à ultimement mené à la naissance du projet Lidy.

### Analyser les fichiers OASIS TOSCA

#### ToP: TOSCA Parser

Le [projet ToP](https://github.com/ditrit/ToP), produit par l'association Ditrit, vise à produire un parseur dédié à la syntax TOSCA. Il utilise ANTLR pour les versions de TOSCA inférieur à la version 2.0. À partir de la version 2.0, ANTLR s'est révélé limité pour parser les blocs indenté de YAML, ce qui a mené à l'adoption d'un outils de parsing YAML dédié. À ma connaissance, ce projet n'as pas abouti. Il ne réponds pas entièrement aux besoins de Leto et a donc été progressivement abandonné, remplacé par Lidy.

#### ANTLR

La première approche utilisée pour analyser les fichiers YAML TOSCA, à été l'utilisation d'un outils d'analyse générique Java: ANTLR. En effet, à l'époque, fin 2018, début 2019, l'association Ditrit utilisait principalement le langage de programmation Java. ANTLR, "ANother Tool for Language Recognition" est un parseur pour les langages non-contextuels (_context-free_). C'est un parseur LL(\*), donc un parseur top-down, ce qui signifie qu'il cherche à attribuer une valeur unique à symbole mot qu'il lit, aussi tôt que possible.

Dans le cas de Leto, ANTLR a été capable de produire des parseur pour les versions 1.0, 1.1 et 1.2 de TOSCA. En effet, ces versions sont basées sur XML, un langage que ANTLR parvient à parser. Cependant, les version ultérieurs à la version 1.2 de TOSCA sont basées sur YAML. ANTLR n'est pas capable de produire de parseur YAML, ni TOSCA 2.0+, car dans ces langages, le niveau d'indentation à valeur de délimiteur de blocs. Cette approche de la délimitation des blocs est très difficile à prendre en compte sans une fonctionnalité dédiée et il s'est trouvé que ANTLR ne dispose pas d'une telle fonctionnalité. Il est toujours possible de prendre en compte l'indentation avec ANLR, mais ceci utilise une astuce qui complique fortement la grammaire, et dont qui ruine la vitesse d'execution de l'analyse. Ces deux facteurs ont mené à l'abandon de ANTLR pour parser les fichiers TOSCA 2.0+.

#### Json Schema

La seconde approche pour l'analyse syntaxique TOSCA 2.0+ a été l'utilisation d'un parseur générique de donné YAML, couplé à un système de vérification de données. Le système de vérification de donné utilisé était AJV, un outils Javascript qui implémente la spécification JSON Schema.

AJV, "Another JSON Validator", descend de DJV, "Dynamic JSON Validator". Ensemble, ils constituent les deux implémentations JavaScript les plus rapides de la spécification JSON-Schema-draft-07, devant json-schema-validator-generator et jsen. Ces outils fonctionnent ainsi: Un développeur souhaite valider les données qu'il reçoit d'un utilisateur. Il décrit le format de ces données dans fichier JSON qui respect la spécification JSON-Schema. Ensuite, il écrit du code qui charge le JSON-Schema dans AJV et en retire un "schéma compilé", qu'il peut alors utiliser pour valider des données structurées reçues de l'utilisateur. Lorsqu'une donnée de l'utilisateur ne respecte pas le schéma, l'ensembles des divergences entre la donnée fourni et le format de donné attendu sont rapportés. Le code du développeur peux ensuite décidé quoi faire avec cette liste d'erreur; généralement signaler ces erreurs à l'utilisateur.

AJV et JSON Schema répondaient bien au besoin de ToP, cependant Deux problèmes se dégageaient de leur utilisation:

- AJV n'opère que sur les données après dé-sérialisation. Ceci implique que AJV ne peux **connaître les numéros de ligne** d'ou provienne les données. Ainsi, il n'est pas possible de signaler à l'utilisateur la position des erreurs que AJV détecte.
- AJV et l'écosystème JSON Schema ont été développés avec pour but la validation de **données** provenant d'un utilisateur, afin d'assurer leur **validité**. Ce cas d'usage est quelque peu différent de l'utilisation que souhaitais en faire ToP, comme un validateur de syntax de deuxième niveau. AJV possède bien l'ensemble des fonctionnalités nécessaires, mais ils s'agit de fonctionnalités _périphériques_, pour des besoins _centraux_ de ToP. Ceci rends l'utilisation des JSON Schema désagréable et lourde.

En l'absence d'outils similair aux JSON Schema pour répondre à ces deux besoins, l'association Ditrit a décidé de créer son propre outils: Lidy.

### Lidy

Lidy est un validateur de syntax de deuxième niveau et déserialiseur pour YAML. A l'instare des validateurs JSON Schema, Lidy n'opère pas pour un dialect unique: il permet de définir des dialectes YAML grâce à un système de _règles_, définies avec des _spécificateur_ qui consistent en une _expression_ contenant un ou plusieurs _mot-clés_. Ces définitions de dialectes du système de règles sont complexes et doivent suivre une syntaxe. Lidy a décidé d'utiliser une syntaxe existante pour son système de règle: il s'agit de la syntax YAML. Ainsi, le système de règle Lidy est lui-même un dialecte YAML.

#### Développement initial de Lidy

Lidy a été initialement développé à la suite de ToP, en JS (en JavaScript). Il réutilise la dépendance js-yaml de ce dernier. La définition de l'ensemble des règles de validation, précédement spécifique à ToP, devient une responsabilité du projet parent: Leto. Cette première version de Lidy a été pensée comme un remplacement des JSON Schema, mais avec les fonctionnalités nécéssaires à pouvoir spécifier une grammaire TOSCA, ainsi que l'indication des numéros de lignes. La contrainte à laquelle devait répondre Lidy était de répondre à tout les besoins de Leto pour l'analyse des fichiers. Comme nous allons le voir dans la section suivante, cette approche économe à des limites.

#### Reprise du travail sur Lidy

Durant l'été 2020, près d'un an après que le travail sur Lidy et Leto ait été arrété, les discussions et retours que reçoivent les membres de l'association Ditrit au sujet des besoins des entreprises indique un besoin pour un orchestrateur de déploiement de systèmes cloud et multi-machines. En d'autre termes, il apparait que les entreprises ont besoin de Leto. Lorsque Orness m'affecte en tant que développeur-contributeur pour l'association Ditrit, Xavier Talon me propose de ré-ouvrir le travaille sur le sujet Leto, en **entament la traduction de Lidy en Golang**. En effet, depuis l'été 2019, l'association Ditrit fait la quasi-totalité de ses développements en Golang, et la traduction des programmes Lidy et Leto permetterais d'apporter une forme d'uniformité dans les projets Ditrit, facilitant aussi la réutilisation de code au sein de l'association.

La proposition de travailler sur Lidy a provoqué chez moi des opinions contrastées:

- D'un côté, le type de programme qu'est Lidy et le type de besoins auquel il réponds m'intéressent car ils relèvent de la programmation pure. Lidy manipule principalement des structures de données et des données des types habituels de programmation, tels que les nombres et les chaînes de caractères, et assure que ces structures ont la forme demandée.
- D'un autre côté, j'identifie que Lidy réponds à un besoin qui est déjà traité par les JSON Schema et qu'il doit exister d'autres produits qui répondent à ce besoin. Je remarque aussi l'absence de spécification et de documentation pour Lidy.

Ces considérations prises en compte, je choisi d'affirmer mon intéret pour le sujet Lidy. Je continue de creuser le sujet et j'identifie des faiblesses supplémentaires:

- Le projet Lidy n'a que très peu de tests unitaires. La pluspart des tests qui assurent le bon fonctionnement de Lidy sont en faites les tests de unitaires du projet Leto. Dans une entreprise de traduction de Lidy, les testes de Leto ne seront pas disponibles.
- L'implémentation actuelle du projet Lidy ne permet pas de garantir la validité d'une grammaire Lidy au moment de son chargement. Les erreurs ne se manifestent qu'au moment ou Lidy cherchera à utiliser le code de validation invalide.
- L'implémentation ne spécifie par conséquent pas comment les erreurs faites dans le schéma Lidy doivent être rapportées à l'utilisateur.

La nature purement programmation du problème, et l'autonomie dont je dispose sur ce sujet sont cependant des atouts suffisants pour que je décide de continuer de travailler sur le projet Lidy.

### [Analyse et réalisation]

### Recherche, travail et impression sur Golang

L'écriture de Lidy en Go a constitué mon premier travail avec ce langage. Go est un langage très différents de tout les autres langages avec lesquels j'ai travaillés. J'entends souvent dire de Go que c'est un langage étrange. Les développeurs qui expriment cet avis donnent souvent pour premier argument, **la syntax de Go**, choisissant de rendre obligatoire les accolades des blocs de code, mais retirant les parenthèses des tests des structures de controle (if/while/for) ; de même Go autorise certaines instructions goto, support l'usage de labels et les signature de méthodes utilisent quatre parenthèses plutôt que deux, ce que certains développeurs trouvent lourds. Je ne suis pas de cet avis ; tout au contraire, je suis très satisfait de toutes les décisions prises relative à la syntaxe de Golang. Je trouve aussi qu'elle n'est en rien étrange lorsqu'on la compare à la syntaxe de langages tels que Python, Visual Basic et Ruby, pour ne citer que les langages [les plus utilisés][tiobe] de ceux qui rejettent la syntaxe dominante. Si je pense que Go est un langage étrange, ce n'est pas pour sa syntaxe, mais plutôt pour sa philosophie.

En effet, Go est un langage avec une forte philosophie de minimalisme et pragmatisme. L'outils Golang cherche simultanement à fournir l'ensemble des outils nécéssaires à l'écriture de code Go dans des conditions de production d'entreprises, mais aussi à founir aussi peut d'outils que possible et que chacun des outils fournis soit aussi simple que possible. Par exemple, le langage Go lui-même est dénudé d'opérateur aussi commun que celui permettant de savoir si une valeur est présente dans une liste (`.includes`, `.contains`). De même, la librairie standard Golang n'a aussi que deux structures de donnée: le tableau (slice) et le tableau associatif hashé (map). Ces deux structures sont suffisantes couvrir tout les besoins pratiques d'un développeur, mais leur nombre extrèmement limité signifie que le développeur ne peux pas exprimer son **intention**, ni exprimer de **contrat précis** par son choix d'une structure de programmation. Ceci détonne avec lanages de programmation plus communs tels que Java et C++, qui offrent une librarie standards avec plusieurs dizaines de structure de données différentes, chacune répondant à un usage précis.

Ainsi, le minimalisme pragmatique de Golang force les développeurs à décrire de manière plus explicite et plus impérative certaines opérations standards de programmation. Golang les contraint aussi à trouver de nouvelles manières d'exprimer leur intention de programmation. Cette tâche est difficile et peux donner l'impression de devoir tout ré-apprendre. Voila pourquoi selon moi Golang produit l'impression d'être un langage étrange.

Au fur et a mesure de mon utilisation de Go et de mes lectures à son sujet, j'ai appris que Go avait été pensé par les ingénieurs de Google pour ressembler au langage C ; une ressemblance qui est en effet fort perceptible. Après plusieurs semaines d'utilisation de Go, je trouve aussi à Go des ressemblances avec Python, un autre langage apprécié chez Google. Go, en tant que langage avec un fort engagement pour la programmation impérative et le minimalisme des fonctionnalités est un bon langage pour découvrir et apprendre la programmation.

### Approches initiales, difficultés et exploration des stratégies

- Besoin d'aller d'un langage permissif, dynamiquement typé, vers un langage moins permissif, statiquement typé. Golang étant nouveau, étant un langage que je ne connais pas, passer par Typescript permet de réduire la taille du saut

- Idée de traduire le code en Typescript
- Blocage car:

  - Typescript est encore trop permissif
  - JS supporte de nombreuses fonctionnalités absentes de Golang au niveau langage
  - ... Il est claire que JS et Go sont des langages avec des paradigmes différents

- Décision de re-développer sans tenir compte de l'implémentation existante
- Problème majeur: absence de spécification, ni même de documentation, et les tests unitaires de Lidy sont trops peux nombreux. Ils ne peuvent garantir le bon fonctionnement que d'une partie réduite du code.
  - En effet, Lidy est développé dans le cadre de Leto, et la specification est donc à trouver du côté de Leto.
- Décision de produires moi même les éléments de spécification dont j'ai besoin pour pouvoir travailler.

### Spécification et tests

- Production des-dits éléments de spécification orientées donnée, sous forme de jeu de donnée qui doivent être correctement détectés comme valide ou comme invalide.
  - Décision de retirer des mots-clés inutils
- Création d'un outils pour rendre testables ces éléments de spécification
  - Utilisation d'une framework de test existant
  - Avantage / inconvénients de la méthode de chargement des tests
  - Améliorations possibles
    - Recherche et utilisation d'une librarie dédiée aux tests orientés donné

### Recherche d'une librarie de parsing YAML en Go qui supporte les numéros de ligne

- Une seul librairie existante
- Le support des numéros de lignes [est une issue dans le bug tracker](https://github.com/go-yaml/yaml/issues/108)
- Des contributeurs de la librarie ont indiqué que cela était supporté dans la version de la librarie, mais n'ont pas donné d'exemple. Par ailleur, la documentation est extrèmenent limitée sur le sujet.
- Mes recheches m'ont permise de trouver cette manière de faire. J'ai [publié l'information dans l'issue concernée](https://github.com/go-yaml/yaml/issues/108#issuecomment-638412147).

### Conception de l'API de la librarie Lidy

- Difficulté: La manière de Golang de faire des interfaces est unique, et il n'est pas facile de trouver un bon guide qui explique comment faire, ni des listes de bonne pratique suffisement complètes. Je suis amené de faire des arbitrage et des paris.
- Le manque d'une spécification complète se fait à nouveau sentir
  - Sans connaître les besoins exacts de Leto, il est difficile d'y répondre complètement:
    - La première version de l'API ne donnait les numéros de ligne que lorsqu'une erreur était renvoyée. Ceci s'est révélé insuffisant pour les besoins de Leto.
- Décision de ne pas prendre en charge l'ouverture des fichiers pour assurer la protabilité de Lidy vers les autres langages, par l'intermédière de WASM. Problème: Pouvoir indiquer dans les rapports d'erreur le chemin du fichiers d'ou provient l'erreur. Solution: Fournir à l'utilisateur une structure de donnée représentant un fichier.

### Conception du fonctionnement de l'API Lidy

- 2 phases d'analyse
- Difficulté: Quel format de donné pour la représentation intermédiare du schéma? Quel calculs peuvent être anticipés?
- Solution: Afin d'être capable de fournir les numéros de lignes des noeuds du schéma dans l'étape de validation, il est préférable que le format de donné de la représentation intermédiaire du schéma soit aussi similaire que possible au schéma lui même. Ainsi, le travail que doit faire le code de chargement du schéma est une simple recopie avec normalisation des valeurs des noeuds YAML.

### Analyse et validation du schema

Difficulté: comment gérer construction de l'arbre d'expression avec les types Go. En effet, en Go, il n'y a pas de syntax pour déclarer qu'un type implément une interface. Solution: utilisation d'une astuce, tels que proposé dans l'issue tracker de Go.

### Validation des données

- Même problème d'interface Go pour supporter les appèles récursifs
- Question de la description des erreurs -> Interface spécifique pour permettre à un noeuds du schéma de décrire la vérification qu'il opère
- Difficulté sur les types extensions

### Rapporter les erreurs

Fait:

- Faire une fonction dédiée.
- Lui passer les informations nécéssaires.
- La fonction produit une erreurs descriptive, avec le numéro de ligne
- Lors qu'une fonction détècte une erreur, l'analyse se poursuit, de façon à ce que toutes les erreurs puissent être levées. Les fonctions renvoient aussi une liste d'erreurs, plutôt que une seul erreur.

À faire:

- Rendre les numéros de ligne et de column accessibles comme donnée présente sur l'erreur
- Avoir des catégories d'erreurs numérotées, spécifiées dans une énumération des erreurs possibles, distinguant erreur et warning
- Les erreurs sont écrites directement dans l'objet de context, de façon à alléger le type de retour des fonctions, et donc éviter d'avoir à passer et concaténer les listes d'erreur de fonction en fonction. Exception: la construction `_oneOf`, doit être capable d'explorer une hypothèse et de la rejeter. Auquel cas, les erreurs spécifiques à cet hypothèses doivent être abandonnées.
- Permettre à l'utilisateur de paramétrer le comportement en cas d'erreur.

### Schéma de fonctionnement du projet

<!--
TODO: create schema

- [v] Input type / output type for the (schema loading+validation)
- [v] Schema loading+validation overall process
- Passes to load the schema
- Communication model for the recursive exploration while (loading the schema, validating the data)
-->

### Retour sur l'écriture de Lidy en Go

[tiobe]: https://www.tiobe.com/tiobe-index/

## WebDba
