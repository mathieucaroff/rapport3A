# Glossaire

<dl>
<dt>JS, JavaScript</dt>
<dd>
Language de programmation utilisable sur le pages web ainsi que sur ordinateur. C'est un langage dynamiquement typé, faiblement typé et interprété. Les interpréteurs les plus communs de JavaScript sont les moteurs V8 (pour Chrome, Chromium et NodeJS) et SpiderMonkey (pour Firefox). JS a *très-peu* en commun avec Java, et se rapproche plus de Python, Ruby et particulièrement de Lua.
</dd>

<dt>TS, TypeScript</dt>
<dd>
TypeScript est une extension du language JavaScript permettant d'ajouter des annotations de types au sein de code JavaScript, puis ensuite de vérifier que le code respecte les indications de types données par les annotations. La vérification des types est réalisée de manière *statique*, c'est à dire avant l'execution du code, ce qui permet d'éviter la majorité des bugs habituels de JavaScript, et rends plus facile les opérations de *refactoring*. TypeScript n'est pas le premier système d'annotation et de vérification des types pour un language dynamiquemet typé, cependant, il se distingue par son extrème flexibilité, en particulier dans le scénario d'une transition de JavaScript vers TypeScript.
</dd>

<dt>Go, Golang</dt>
<dd>
Langage de programmation statiquement typé, développé chez Google et dont la première version a été publiée en 2012. Golang cherche à ressembler à C, mais en évitant les problèmes de mémoire et en facilitant la programmation concurrente, via des primitives appropriés à la communication inter-process. Golang me donne l'impression d'être un intermédiaire statiquement typé entre C et Python. Je trouve aussi que ce langage est déroutant dans la mesure ou de nombreux problèmes ne peuvent pas être résolu en Go en utilisant l'approche habituelle, disponible dans l'ensemble des autres langages de programmation haut-niveau.
</dd>

<dt>TOSCA><dt>
<dd>
OASIS TOSCA, "Topology Orchestration Specification for Cloud Applications" est un langage de spécification de topologie de machines pour le Cloud. Ce langage s'épargne l'effort de définir une syntax complète en réutilisant le format YAML. Ainsi, depuis la TOSCA 2.0, TOSCA est un sous-ensemble de YAML, au sense que tout les fichiers TOSCA sont des fichiers YAML.
</dd>

<dt>YAML</dt>
<dd>
YAML est un format textuel pour les données structurées. C'est un sur-ensemble de JSON, au sens que tout fichier JSON valide est un fichier YAML valide. Cependant, contrairement à JSON, YAML est orienté développeur, au sens que le YAML idiomatique est facile à lire et à écrire pour les développeurs. YAML et JSON permettent de représenter les valeurs scalaires communes à la plupart des langages de programmation : nombres, booléens, chaînes de caractères et la valeur nulle. Ils permettent également de représenter des tableaux de valeurs, en utilisant la notation `[]`, et des objets ainsi que des hashs de chaînes et des hashmaps en utilisant la notation `{}`.
</dd>

<dt>Refactoring</dt>
<dd>
Opération de modification du code source d'un programme ayant pour but d'améliorer les qualités internes du code, tels que la lisibilité et la réutilisabilité, sans changer le comportement du code. Certaines méthodes de programmations dépendent lourdement du refactoring (TDD, Extreme programming).
</dd>

<dt>Parseur</dt>
<dd>
(Anglicisme informatique) Analyseur syntaxique, interpréteur.
</dd>

Parser::
(Anglicisme informatique) Action d'analyser un text qui respect une syntax afin de produire un arbre de syntaxe.

Sérialiser::
Produire une représentation sous forme de suite de charactères d'une structure de donnée, afin de pouvoir l'extraire du processus en cours.

Déserialiser::
Produire une représentation sous forme de structure de donnée, présente en mémoire vive et facilement utilisable à partir de données sérialisées.

MVP::Minimum Viable Product, Produit Minimum Viable, en production logicielle, produit assurant l'ensemble des fonctionnalités centrales, et dont l'utilisation apporte une plus value à l'utilisateur.

<dt>benchemarksgame-team</dt>
<dd>
https://benchmarksgame-team.pages.debian.net/benchmarksgame/
</dd>
</dl>
