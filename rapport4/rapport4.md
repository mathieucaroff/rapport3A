---
header-includes:
  - \renewcommand{\familydefault}{\sfdefault}
  - \usepackage{svg}
---

# Rapport

Rapport de stage de Mathieu CAROFF

<!-- 3750 characteres par page
4 pages = 15000 charactères -->

## Table des matières

(liens cliquables)

<!-- - [Rapport](#rapport)
  - [Table des matières](#table-des-matières)
  - [Plan](#plan)
  - [Orness](#orness)
    - [Culture d'entreprise](#culture-dentreprise)
    - [Activité](#activité)
    - [Expertise](#expertise)
  - [Période Juin-Juillet: Projet Lidy](#période-juin-juillet-projet-lidy)
    - [[Context]](#context)
    - [Origine de Lidy: Leto](#origine-de-lidy-leto)
    - [Analyser les fichiers OASIS TOSCA](#analyser-les-fichiers-oasis-tosca)
      - [ToP: TOSCA Parser](#top-tosca-parser)
      - [ANTLR](#antlr)
      - [Json Schema](#json-schema)
    - [Lidy](#lidy)
      - [Développement initial de Lidy](#développement-initial-de-lidy)
      - [Reprise du travail sur Lidy](#reprise-du-travail-sur-lidy)
      - [YAML](#yaml)
      - [Aperçu de l'utilisation de Lidy](#aperçu-de-lutilisation-de-lidy)
    - [Aperçu du fonctionnement de Lidy](#aperçu-du-fonctionnement-de-lidy)
    - [[Analyse et réalisation]](#analyse-et-réalisation)
    - [Recherche, travail et impression sur Golang](#recherche-travail-et-impression-sur-golang)
    - [Approches initiales, difficultés et exploration des stratégies](#approches-initiales-difficultés-et-exploration-des-stratégies)
    - [Changement du DSL Lidy et spécification](#changement-du-dsl-lidy-et-spécification)
      - [Détails sur la spécification du mot-clé `_mergeable`](#détails-sur-la-spécification-du-mot-clé-_mergeable)
    - [Test](#test)
    - [Retour sur le travail de spécification](#retour-sur-le-travail-de-spécification)
          - [_adapted v-model for existing software_](#adapted-v-model-for-existing-software)
    - [Retour sur les tests](#retour-sur-les-tests)
    - [Support des numéros de ligne lors de la conversion du YAML en Go](#support-des-numéros-de-ligne-lors-de-la-conversion-du-yaml-en-go)
    - [Conception de l'API de la librarie Lidy](#conception-de-lapi-de-la-librarie-lidy)
    - [Conception du fonctionnement de l'API Lidy](#conception-du-fonctionnement-de-lapi-lidy)
    - [Analyse et validation du schema](#analyse-et-validation-du-schema)
    - [Validation des données](#validation-des-données)
    - [Rapporter les erreurs](#rapporter-les-erreurs)
    - [Schéma de fonctionnement du projet](#schéma-de-fonctionnement-du-projet)
    - [Retour sur l'écriture de Lidy en Go](#retour-sur-lécriture-de-lidy-en-go)
  - [WebDba](#webdba) -->

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

Orness est une entreprise de services du numérique (ESN), opérant à Paris, avec ses bureaux dans le 9ème arrondissment. Elle a été fondée en 2001 par Ghada AJAKA et Carole AMADO qui co-président l'entreprise, appuyées par Xavier TALON et Herve CHIBOIS, eux aussi membres fondateurs et co-directeurs techniques. [(1)][o.histoire].

Elle compte aujourd'hui plus d'une centaine d'employés cadres. Avec un chiffre d'affaire de 12 millions d'euro, elle affiche le modeste résultat de 650 mille euros. [(2)][o.societe.com]

### Culture d'entreprise

Orness accorde une grande importance à l'humain. La qualité de la vie des employés au travail, l'entente et le sentiment de sécurité morale ont une grande importance chez les dirigeants de Orness, et leur maniement de ces valeurs, dans une entreprise à taille humaine, permet de créer une atmosphère relaxante chez Orness. Ainsi, les valeurs de transparence, d'audace et de partage se ressentent bien, tant chez les dirigeants que au sein des employés. [(3)][o.valeurs]

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

Lidy est un validateur de syntax de deuxième niveau et déserialiseur pour YAML. A l'instare des validateurs JSON Schema, Lidy n'opère pas pour un dialect unique: il permet de définir des dialectes YAML grâce à un système de _règles_, définies avec des _spécificateur_ qui consistent en une _expression_ contenant un ou plusieurs _mot-clés_. Ces définitions de dialectes du système de règles sont complexes et doivent suivre une syntaxe. Lidy a décidé d'utiliser une syntaxe existante pour son système de règle: il s'agit de la syntax YAML. Ainsi, le système de règle Lidy est lui-même un dialecte YAML. Plus de détail sur le fonctionnement extérieur de Lidy sont donnés dans la section [Aperçu de l'utilisation de Lidy](#aperçu-de-l-utilisation-de-lidy)

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
- L'implémentation ne spécifie par conséquent pas comment les erreurs faites par le développeur du schéma Lidy doivent être rapportées. L'implémentation présuppose simplement que ces erreurs ne peuvent pas exister.

La nature purement programmation du problème, et l'autonomie dont je dispose sur ce sujet sont cependant des atouts suffisants pour que je décide de continuer de travailler sur le projet Lidy.

#### YAML

Lidy a pour but d'être un vérificateur de données structurées générique pour YAML. Présentons donc rapidement YAML. YAML est un langage de sérialisation. Il est en cela similaire à JSON (JavaScript Object Notation), avec la différence que YAML vise spécifiquement à être facile à lire pour les développeurs, humains, par opposition aux machines. Notons que YAML a été pensé comme une extension de JSON dans au sens que tout document JSON valide est aussi un document YAML valide. La spécification YAML 1.2, la dernière en date, exige au minimum le support de deux format de donnée composite et de un format de donné scalaire (élémentaire, atomique), voire [Failsafe Schema][yaml-recommended-schema] dans la spécification. Il s'agit des formats suivants:

- "Generic Mapping" (map): Un format générique pour les associations nom-valeur. Ce format est caractérisé par l'utilisation du caractère deux-points ":", entre le nom et la valeur.
- "Generic Sequence" (seq): Un format générique pour les listes de valeurs. Ce format est caractérisé par l'utilisation de tiret en début de ligne, pour chaque valeur ou bien caractérisés par des crochets autour d'une liste de valeur séparée par des virgules.
- "Generic String" (str): Un format pour toutes les valeurs scalaires.

Cependant, la pluspart des implémentations de YAML supporte aussi les quatres autres format de donné scalaire du JSON. Ces formats sont spécifiés dans le [chapitre 10.2 de la spécification YAML][yaml-json-schema]. Il s'agit des types de donné suivants:

- Null: Ce type n'a qu'une valeur possible: "null"
- Boolean: "true" ou "false"
- Integer: un entier positive ou negatif
- Floating Point: un nombre à virgule

Par ailleur, une bonne parti des implémentations de YAML supportent aussi le type [Timestamp][yaml-timestamp], spécifié dans la version 1.1 de YAML. Ce type de donné sert à spécifier des dates et ils n'ont pas de limite de précision temporelle.

#### Aperçu de l'utilisation de Lidy

Lidy permet à un développeur de spécifier des règles que Lidy interprète et utilise pour vérifier la validité d'un document YAML. Ces règles permette de vérifier que les valeurs qui sont fournies par l'utilisateur correspondent bien aux types attendus.

Voici par exemple, un schéma Lidy spécifiant une règle pour décrire des chimères:

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

La règle `main` sert à indiquer la règle principale du document. La règle `animalFamily` utilise le spécificateur `_in` qui exige que la valeur fourni soit parmis les valeurs listées. La règle `int` est une règle par défaut de Lidy qui n'accèpte que des entiers. Enfin, la règle chimera utilise le spécificateur de Mapping, avec le mot-clé `_map`, qui n'accèpte que les Mappings YAML dont les nom-valeurs sont spécifiés par une pair liant un nom verbatime, à une expression Lidy.

Lidy supporte aussi des types définis de manière recursive. Voici par exemple un schéma Lidy spécifiant un arbre avec des chaínes de caractères aux feuilles:

```yaml
main: tree

tree:
  _oneOf:
    - node
    - leaf

node:
  - listOf: tree

leaf: string
```

Le spécifieur `_oneOf` reçoie une liste d'expression Lidy et n'accèpe que les valeur YAML qui valide au moins une de ces expressions. Le mot-clé `_listOf` reçois une expression Lidy et constitue un spécifieur de qui accèpte les séquences YAML dont chaque élément valide l'expression Lidy reçue. Ainsi, le document YAML suivant est un arbre valide:

```yaml
- - - a
  - - b
  - c
  - d
  - - e
    - f
- g
```

Tandis que le document YAML suivant n'est pas un arbre valide:

```yaml
- - a
  - b: c
    d: e
  - {}
- 3
- null
```

Il n'est pas valide car il contient des données qui ne sont pas explicitement autorisées par le schéma Lidy (mapping, entier, valeur null).

Les fonctionnalités de Lidy sont présentées de manière plus exhaustives dans [la section short reference du README de Lidy][lidy-short-reference].

### Aperçu du fonctionnement de Lidy

Dans son implémentation JS, Lidy utilise une librairie de désérialisation YAML pour convertir le schéma Lidy, ainsi que le document à valider, d'une chaine de caractères YAML en une structure de donnée JS. Le document à valider est parcouru concourrament aux expressions du schéma Lidy, avec des appèls récursif de fonction.

- Lorsqu'un validateur produit une erreur, la validation est interrompue et l'erreur est rapportée à l'utilisateur, avec une description de l'erreur et le numéro de ligne du document à valider. Cette gestion d'erreur est basée sur le système de levée et attrapage d'exception de JS, aussi le code ne peux rapporter qu'une seul erreur de validation à l'utilisateur.
- La résolution des noms de règle est possible à tout moment car le schéma Lidy est passé en paramètre de toutes les fonctions recursives, dans une valeur de context global.
- À chaque fois qu'une règle est validée, Lidy cherche à executer du code JS fourni par le développeur, afin de construire une instance JS correspondant à la section du document qui viens d'être validée. Ceci permet d'effectuer des verifications supplémentaires, ainsi que des transformations sur les données de l'utilisateur ; par exemple, la normalisation de ces données.
- Enfin, si la validation termine sans erreur, Lidy produit l'instance de la règle principale (main) et la renvoie au développeur.

### [Analyse et réalisation]

### Recherche, travail et impression sur Golang

L'écriture de Lidy en Go a constitué mon premier travail avec ce langage. Go est un langage très différents de tout les autres langages avec lesquels j'ai travaillés. J'entends souvent dire de Go que c'est un langage étrange. Les développeurs qui expriment cet avis donnent souvent pour premier argument, **la syntax de Go**, choisissant de rendre obligatoire les accolades des blocs de code, mais retirant les parenthèses des tests des structures de controle (if/while/for) ; de même Go autorise certaines instructions goto, support l'usage de labels et les signature de méthodes utilisent quatre parenthèses plutôt que deux, ce que certains développeurs trouvent lourds. Je ne suis pas de cet avis ; tout au contraire, je suis très satisfait de toutes les décisions prises relative à la syntaxe de Golang. Je trouve aussi qu'elle n'est en rien étrange lorsqu'on la compare à la syntaxe de langages tels que Python, Visual Basic et Ruby, pour ne citer que les langages [les plus utilisés][tiobe] de ceux qui rejettent la syntaxe dominante. Si je pense que Go est un langage étrange, ce n'est pas pour sa syntaxe, mais plutôt pour sa philosophie.

En effet, Go est un langage avec une forte philosophie de minimalisme et pragmatisme. L'outils Golang cherche simultanement à fournir l'ensemble des outils nécéssaires à l'écriture de code Go dans des conditions de production d'entreprises, mais aussi à founir aussi peut d'outils que possible et que chacun des outils fournis soit aussi simple que possible. Par exemple, le langage Go lui-même est dénudé d'opérateur aussi commun que celui permettant de savoir si une valeur est présente dans une liste (`.includes`, `.contains`). De même, la librairie standard Golang n'a aussi que deux structures de donnée: le tableau (slice) et le tableau associatif hashé (map). Ces deux structures sont suffisantes couvrir tout les besoins pratiques d'un développeur, mais leur nombre extrèmement limité signifie que le développeur ne peux pas exprimer son **intention**, ni exprimer de **contrat précis** par son choix d'une structure de programmation. Ceci détonne avec lanages de programmation plus communs tels que Java et C++, qui offrent une librarie standards avec plusieurs dizaines de structure de données différentes, chacune répondant à un usage précis.

Ainsi, le minimalisme pragmatique de Golang force les développeurs à décrire de manière plus explicite et plus impérative certaines opérations standards de programmation. Golang les contraint aussi à trouver de nouvelles manières d'exprimer leur intention de programmation. Cette tâche est difficile et peux donner l'impression de devoir tout ré-apprendre. Voila pourquoi selon moi Golang produit l'impression d'être un langage étrange.

Au fur et a mesure de mon utilisation de Go et de mes lectures à son sujet, j'ai appris que Go avait été pensé par les ingénieurs de Google pour ressembler au langage C ; une ressemblance qui est en effet fort perceptible. Après plusieurs semaines d'utilisation de Go, je trouve aussi à Go des ressemblances avec Python, un autre langage apprécié chez Google. Go, en tant que langage avec un fort engagement pour la programmation impérative et le minimalisme des fonctionnalités est un bon langage pour découvrir et apprendre la programmation.

### Approches initiales, difficultés et exploration des stratégies

L'idée initiale pour réaliser la ré-écriture de Lidy en Golang a été la traduction du code JS de Lidy en code Golang. Immédiatement, des difficultés se posent:

- JS est un langage permissif, dynamiquement typé, tandis que Golang est strict et statiquement typé.
- Mes connaissances en Golang sont très limité, je n'ai jamais créé de projet en Golang.

Afin de surmonté cette double difficulté, j'ai l'idée de passer par un langage intermédiaire: TypeScript. TypeScript est une extension du langage JS pour supporter l'utilisation de valeurs statiquement typées. J'ai appris ce langage durant mon stage du pritemps 2019, chez Deskpro. Il m'apparait que ce langage permettrait de surmonter la difficulté de duretée des types en Golang de manière plus progressive. Je commence donc une traduction de Lidy en TypeScript.

La traduction de code JS en Typescript signifie souvent le simple ajout de types au code. Déterminer correctement ces types requière d'explorer le code, afin de comprendre comment les valeurs transitent dans le code, et quelles informations elles reçoivent et contiennt. Je réalise donc ce travail d'ajout des types au code. Je rencontrce cependant assez vite un certain nombre de limitations. En effet, JS permet d'assigner facilement une propriété avec n'importe quel nom à une valeur, avec pour seul contrainte que ladite valeur soit un objet. Ceci rends la modélisation des types de l'implémentation en JS de Lidy difficle, même avec l'aide de TypeScript. Outre le problème de type, on rencontre d'autres problèmes communs au changement de langages, tel que les différences de niveau de fonctionnalités offert d'un langage à un autre: JS est un langage haut niveau et un langage de scriptage, alors que Go est un langage orienté système et microservices. Go donne donc plus de contrôle sur le détail de l'execution, alors que JS se concentre plutôt sur la production de résultats avec peu de code. Me heurtant à toutes ces difficultés, ainsi qu'au problème de conception de cet implémentation de Lidy qui délaisse la vérification du schéma, problème déjà évoqué dans la section [Reprise du travail sur Lidy](.#reprise-du-travail-sur-lidy), j'ai décidé de laisser de côté l'approche par traduction de code Lidy existant, et de préférer redévelopper Lidy sans m'appuier sur le code existant. C'est une décision d'autant plus ambitieuse que Lidy est dépourvue de spécification et de documentation, et n'as presque aucun tests unitaires.

À ce stade de la réécriture de Lidy, je suis conscient que les conditions dans lesquelles je vais avoir à travailler sont assez différentes des conditions dans lesquelles Lidy a été initiallement développé. En effet, Lidy a été développée dans le context de Leto, afin de permettre l'analyse de fichier YAML afin de vérifier que leur structure est conforme au schéma TOSCA spécifié en YAML par un fichier de grammaire Lidy au sein du projet Leto. Cependant, je n'ai pas les compétences pour travailler sur Leto. Je ne connais pas la grammaire TOSCA, ni même les conceptes d'orchestration associés et je juge que je n'aurais pas assez de temps pour acquérir ces connaissances et compétences dans le temps qui m'était imparti: entre 4 et 8 semaines. Lidy avait était développée sans spécification, mais avec les besoins de Leto pour besoins directeurs, il ne me sera pas possible de travailler ainsi. Je décide donc de m'atteller moi-même à la tâche de spécification de Lidy, afin que mon code repose sur un socle solide.

### Changement du DSL Lidy et spécification

Conscient que je ne disposais que de peu de temps, j'ai choisi de concentrer mon travail de spécification sur les parties de Lidy qui en avaient le plus besoin. J'était notemment géné par une poignée de mot-clés Lidy, pour lequels le comportement attendu étais obscure ou problématique. Il s'agissait des mot-clés suivant:

- (QSpec1: copy) `_copy`
- (QSpec2: optional) `_optional`

Il y avait aussi la question de la manière dont les mot-clés qui étaient permis ensemble devait se combiner. Les combinaisons suivantes posaient problème:

- (QSpec3: list/dict) les règles par défaut `list` et `dict` était plutôt redondante car elles pouvaient être remplacées par les expressions `{ _listOf: any }` et ` _dictOf: { any: any } }`.

- (QSpec4: dict/dictOf) `_dict` avec `_dictOf`, si une clé est reconnue simultanément par `_dict` et `_dictOf`, pour les entrées non-requises de `_dict`, faut-il autoriser la valeur à avoir le type proposé par le `_dictOf`, ou bien n'autoriser que le type donné par le `_dict`?

- (QSpec5: dict-vs-map) Lidy utilisait le radical `dict` pour former les mot-clés qui référaient aux mappings YAML. Le radical `map`, utilisé dans la spécification YAML semble plus approprié ici. Il a aussi les avantages d'être un mot entier et d'être plus court que `dict`.

- (QSpec6: required-vs-xFacultative) Lidy utilisait un mot-clé \_required, pour spécifier les entrées obligatoire d'un mappping. Ce mot-clé est inspiré des JSON-Schema. Sans rentrer trop dans les détails, ceci pose des problèmes car cela oblige l'utilisateur à répéter le nom des règles, ce qui peut mener à des erreurs, dues à une faute de frappe ou de copie. Ceci pose aussi problème car ceci implique que par défaut, les entrées des mappings sont optionnels. Ce comportement par défaut peut-être adapté lorsqu'il s'agit de vérifier des données entrées dans un formulaire, comme c'est le cas pour les JSON-Schéma, mais pose problèmes lorsqu'il s'agit de vérifier des langages et DSL comme le fait Lidy.

- (QSpec7: notin) Enfin, le mot-clé `_notin` n'étaient pas utilisé et n'avait pas tests. Il n'avait donc pas de comportement bien défini. Par ailleurs, le seul cas d'usage d'un moyen de spécification par exclusion me semblait être pour l'exclusion des mots-clés dans les identifieurs, ce qui posait beaucoups de problèmes.

J'ai donc pris les décisions suivantes:

- (QSpec3: list/dict) Retirer les règles par défaut `list` et `dict`
- (QSpec7: notin) Retirer le mot-clé `_notin`
- (QSpec5: dict-vs-map) Remplacer `dict` par `map` dans `_dict` et `_dictOf`
- (QSpec4: dict/dictOf) N'autoriser que le type donné par le `_dict`, dans le doute, l'option la plus strict est généralement meilleur.
- (QSpec2: optional) -- décision prise en commun avec QSpec6, required-vs-xFacultative
- (QSpec6: required-vs-xFacultative) Remplacer les mot-clés `_required` et `_optional` sont remplacés par une utilisation plus uniforme, avec les mots-clés `_listFacultative` et `_mapFacultative`.
  - Le radicale "Facultative" a été préféré à "Optional" car les mots-clés `_mapOf` et `_listOf` commençaient déjà par les cinq et six caractéres `_mapO` et `_listO`. "Optional" aurait donc ralenti l'utilisation de l'autcompletion de un caractères pour ces mot-clés.
- (QSpec1: copy) Renommer le mot-clé `_copy` en `_merge`.
  - Le mot-clés `_merge` accepte désormais une liste d'expression lidy plutôt que une seul expression. Le spécifieur de mapping qui contient le mot-clé `_merge` est donc marqué comme héritant de chacune de ces expression.

#### Détails sur la spécification du mot-clé `_mergeable`

Il a été determiné que l'utilisation et le comportement du mot-clés `_merge` devait respecter certaines caractéristiques. Ainsi, durant la première lecture du schema, Lidy doit vérifier que le mot-clé n'est utilisé qu'avec des expressions Lidy qui soient fusionnables ("mergeable"). Les expression Lidy fusionneables sont précisément:

- les règles correspondant à une expression mergeable
- les spécifieurs \_oneOf ne contenant que des expressions mergeables
- les spécifieurs de mappings ne contenant pas de mot-clé \_mapOf

Si le mot-clé `_merge` est utilisé sur une expression qui n'est pas mergeable, Lidy doit le signaler.

Lidy doit aussi vérifier que l'ensembles des mappings concernés par un \_merge ne contiennent jamais plusieurs entrées sous le même nom. Si ceci se produit, Lidy doit le signaler à l'utilisateur, par une erreur au moment de la première lecture de schema.

À l'étape de validation de la donnée, Lidy doit vérifier que l'ensemble des entrées requises sont présentes. Lidy doit aussi vérifier que l'ensembles des entrées connues ont la bonne valeur. Enfin, Lidy doit vérifier que l'ensemble des entrées qui sont présentes sont bien connues, ou bien, dans le cas ou le mot-clé `_mapOf` est présent sur le noeuds contenant le mot-clé `_merge`, Lidy doit vérifier que les entrées qui ne sont pas connues respect bien les expression Lidy du `_mapOf` pour la clé et pour la valeur.

### Test

Conscient de l'aspect chronophage de l'écriture d'une spécification complète, j'opte pour produire la spécification sous forme d'un ensemble de tests commentés. Je réalise initialement ces tests en TypeScript, avec l'outils de test unitaire Japa. Ceci me permet d'utiliser le code existant pour ajouter un niveau de vérification à mes tests de spécification, puisque le code existant peut-être executé depuis TypeScript.

Lorsque viens le moment de passer à Golang, les discussions que j'ai avec mon maitre de stage Xavier TALON sur l'intéret de rendre Lidy disponible dans plusieurs langages m'amène à choisir de mettre mes tests dans un format qui pourra être consommé depuis n'importe quel langage de programmation. Je choisi le langage de serialisation HJSON "Human JSON", un format très similair au JSON, qui tout comme le YAML vise à être facile à utiliser par les humains. Il se distingue cependant du YAML par ses décisions conservatrices vis-à-vis de l'utilisation des accolades (`{}`). HJSON choisi de préserver les accolades, là ou YAML les interdit.

Afin de pouvoir utiliser ces données de tests en Golang, je comprends que j'ai besoin d'un outils capable d'executer les tests à chaque modification du code ou des tests. J'ai aussi besoin d'un outils capable de réaliser des statistiques sur le nombre de tests executés et qui on réussi. Cette outils doit aussi être capable de gérer la desactivation de tests pour les tests qui ne doivent pas être executés. J'adopte et j'apprends donc la suite d'outils de test comportemental Golang **Ginkgo**. Cet outils réponds aux contraintes listées ci-dessus ; c'est aussi l'outils le plus abouti en termes de tests unitaires et de tests d'intégration dans la communauté Golang.

Pour pouvoir charger les tests dang Ginkgo, il me faut obtenir les données présentes dans les différents fichiers HJSON de la spécification, lire ces fichiers, desérialiser les données HJSON, produire des fonctions capable de consommer ces données et enfin donner ces fonction à Ginkgo pour que celui ci puisse les executer et rapporter les erreurs.

C'est exactement ce que font les fichiers [hWalk_testdata_test.go](https://github.com/ditrit/lidy/blob/go-2020-10/hWalk_testdata_test.go) et [hReadTestdata_test.go](https://github.com/ditrit/lidy/blob/go-2020-10/hReadTestdata_test.go). hWalk_testdata_test.go se charge de parcourir les dossiers de la spécification afin d'obtenir la listes des fichiers de données. hReadTestdata_test.go quand à lui, lit ces fichiers, les désérialise et produits les tests Ginkgo à partir des données.

Avoir du code dédier au chargement des données de tests à l'avantage de donner beaucoups de contrôle sur la manière dont ces données sont utilisées au moment du tests. C'est une approche très flexible. Par exemple, ceci me permet d'utiliser le commentaire d'explication du but du test comme moyen de spécifier si le test doit réussir ou échouer ; dans [map.spec.hjson](https://github.com/ditrit/lidy/blob/go-2020-10/testdata/collection/map.spec.hjson), on trouve (extrait):

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

Dans l'extrait ci-dessus, le schéma donné doit valider les documents `{ aa: 2.2 }` et `{ aa: 0 }`, mais rejeter le document `{}`. La seul manière pour le test de savoir si les documents doivent être accéptés ou rejetés par le schéma est le commentaire associé aux tests: Celui-ci commence soit par "accept", soit par "reject". Cette flexibilité permet donc d'avoir des tests avec des descriptions organiques, sans avoir besoin de se répéter.

### Retour sur le travail de spécification

Lorsque j'analyse le déroulement de mon projet de ré-écriture de Lidy en Golang, je trouve que les tests ont été d'une très grande utilité, mais que cependant, l'effort réalisé en amont de la spécification semble ne pas avoir été suffisant. Je pense qu'un point distinctif sur lequel je pourrais m'améliorer à l'avenir est la _délimitation du besoin_. Dans le cas d'un logicielle existant, comme pour Lidy, cet effort doit probablement se faire en s'appuillant sur les fonctionnalités existantes. On peut envisager la chose comme un cycle en V-inversé, suivi d'un cycle en V:

###### _adapted v-model for existing software_

![adapted v-model for existing software schema](misc/specification-v-cycle.png)

### Retour sur les tests

Un autre point qui pourrait être améliorer est le chargement et l'execution des tests. Lidy est un outils qui se prète bien à la production de tests sous forme de jeux de données. Des recherches que j'ai eu l'occasion de mener après la fin du projet m'ont permis de trouver le nom donné à ces situation: Il s'agit de **tests orientés donné**. En anglais, on parle de "table driven tests" dans les cas simples et de "data-driven tests" ou de "parametrized tests" dans les cas généraux. Il existes des librairies de tests spécialisées sur ce types de tests. Lidy bénificierait d'utiliser une telle librairie. Il est à noter cependant, que les tests de Lidy ont des besoins forts sur les fonctionnalités de la paramétrisation. Il n'est pas garanti qu'une librairie suffisement avancée existe déja.

### Support des numéros de ligne lors de la conversion du YAML en Go

Une des contraintes auxquelles Lidy doit répondre est la conservation des numéros de ligne lors de la conversion du YAML en Go. En Golang, il existe une seul librairie pour faire la sérialisation/déserialisation YAML. Il s'agit de [Go-YAML](https://github.com/go-yaml/yaml). Cette librairie est maintenu par les développeurs de Canonical, l'entreprise qui produit et maintient la distribution Linux Ubuntu. Cette librairie se contente en faite de faire appèle à [libyaml](https://github.com/yaml/libyaml), l'implémentation officielle de YAML en langage C. Dans la version 2 de Go-YAML, il n'est pas possible d'obtenir les numéros de ligne correspondants aux valeurs extraites du document. Cependant, le support des numéros de lignes [est une issue dans le bug tracker](https://github.com/go-yaml/yaml/issues/108): des contributeurs de la librarie ont indiqué que la conservation des numéros de ligne était supportée dans la version 3 de la librarie. Ils n'ont néhanmoins pas donné d'exemples. Par ailleur, la documentation est extrèmenent limitée sur le sujet et ne fourni pas non-plus d'exemple. C'est en lisant le code de la librairie que j'ai pu comprendre comment utiliser la version 3 de Go-YAML pour obtenir les numéros de ligne. J'ai [publié l'information dans l'issue concernée](https://github.com/go-yaml/yaml/issues/108#issuecomment-638412147) afin d'éviter aux autres développeur ayant ce problème d'avoir à chercher comme moi.

### Conception de l'API de la librarie Lidy

- Difficulté: La manière de Golang de faire des interfaces est unique, et il n'est pas facile de trouver un bon guide qui explique comment faire, ni des listes de bonne pratique suffisement complètes. Je suis amené de faire des arbitrage et des paris.
- Le manque d'une spécification complète se fait à nouveau sentir
  - Sans connaître les besoins exacts de Leto, il est difficile d'y répondre complètement:
    - La première version de l'API ne donnait les numéros de ligne que lorsqu'une erreur était renvoyée. Ceci s'est révélé insuffisant pour les besoins de Leto.
- Décision de ne pas prendre en charge l'ouverture des fichiers pour assurer la protabilité de Lidy vers les autres langages, par l'intermédière de WASM. Problème: Pouvoir indiquer dans les rapports d'erreur le chemin du fichiers d'où provient l'erreur. Solution: Fournir à l'utilisateur une structure de donnée représentant un fichier.

### Conception du fonctionnement de l'API Lidy

- 2 phases d'analyse
- Difficulté: Quel format de donnée pour la représentation intermédiare du schéma? Quel calculs peuvent être anticipés?
- Solution: Afin d'être capable de fournir les numéros de lignes des noeuds du schéma dans l'étape de validation, il est préférable que le format de donné de la représentation intermédiaire du schéma soit aussi similaire que possible au schéma lui même. Ainsi, le travail que doit faire le code de chargement du schéma est une simple recopie avec normalisation des valeurs des noeuds YAML.

### Analyse et validation du schema

Difficulté: comment gérer construction de l'arbre d'expression avec les types Go. En effet, en Go, il n'y a pas de syntaxe pour déclarer qu'un type implément une interface. Solution: utilisation d'une astuce, tels que proposé dans l'issue tracker de Go.

### Validation des données

- Même problème d'interface Go pour supporter les appèles récursifs
- Question de la description des erreurs -> Interface spécifique pour permettre à un noeud du schéma de décrire la vérification qu'il opère
- Difficulté sur les types extensions

### Rapporter les erreurs

Fait:

- Faire une fonction dédiée.
- Lui passer les informations nécéssaires.
- La fonction produit une erreurs descriptive, avec le numéro de ligne
- Lors qu'une fonction détècte une erreur, l'analyse se poursuit, de façon à ce que toutes les erreurs puissent être levées. Les fonctions renvoient aussi une liste d'erreurs, plutôt que une seul erreur.

À faire:

- Rendre les numéros de ligne et de columne accessibles comme donnée présente sur l'erreur
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

[lidy-short-reference]: https://github.com/ditrit/lidy#short-reference
[tiobe]: https://www.tiobe.com/tiobe-index/
[yaml]: https://yaml.org/
[yaml-json-schema]: https://yaml.org/spec/1.2/spec.html#id2803231
[yaml-recommended-schema]: https://yaml.org/spec/1.2/spec.html#Schema
[yaml-timestamp]: https://yaml.org/type/timestamp.html

## WebDba
