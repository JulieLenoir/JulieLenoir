# Julie Lenoir – Développeuse Web

Actuellement en alternance (Bac+3 CDA) au CEFii, je conçois des outils web pour une plateforme e-learning et développe un agent conversationnel IA (FAQ + RAG).

Je travaille avec :
- **Python** (Rasa, embeddings, ChromaDB, API Mistral)
- **PHP**, HTML, CSS, JavaScript
- **Node.js**, MongoDB
- **GitHub**, Docker

Je forme également d'autres développeurs aux bases du web (HTML, CSS, JS, PHP).

## Objectif

Trouver un poste en développement web à partir d’**août 2025**, dans une équipe où je pourrai continuer à apprendre et contribuer à des projets concrets.

## Projets à découvrir

- `agent-ia-faq-rag` – agent conversationnel avec mémoire + base documentaire pour évoquer mon parcours
- `projets d'apprentissage` développé pendant les cours
- `premier portfolio`

## Me contacter

[🔗 LinkedIn](https://www.linkedin.com/in/julie-lenoir-renou)  
📍 Cholet / Angers / Nantes  
✉️ julielenoir.devweb@gmail.com

# Agent IA – Julie Lenoir  

*en cours de développement*  

## Objectif

Développer un agent conversationnel hybride combinant :
- une **FAQ intelligente** (via Rasa),
- un **moteur RAG** (Recherche + Génération) basé sur des documents vectorisés,
- un **LLM** (Mistral) pour formuler des réponses précises à partir de mon parcours professionnel et de supports pédagogiques.

---

## Stack technique

- **Rasa** – gestion des intentions & moteur de dialogue (NLU + Core)
- **ChromaDB** – base vectorielle pour les documents indexés
- **SentenceTransformers** – génération d’embeddings
- **FastAPI / Script Python** – logique métier & orchestration
- **Mistral API** – génération de réponse
- **HTML / JS / CSS** – interface utilisateur légère

---

## Cas d’usage

| Domaine                                                        | Description |
|--------------------------------------------------------------- |--------------------------------------|
| FAQ sur ma motivation/mon parcours/qui je suis                 | Des réponses précises sur des sujets précis me concernant |
| Ressources sur mes projets, mes compétences, mon parcours      | Recherche dans le cv, dans les documents vectorisés |
| Questions sur mon parcours                                     | Formation, compétences, projets |
---

## Déploiement local

### Prérequis

- WSL ou Ubuntu avec **Python 3.10**
- Git, pip, VS Code
- Accès à l’API Mistral (via Ollama en local)

### Lancer l’agent

```bash
# Cloner le projet
git clone 


# Activer l'environnement virtuel
python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Lancer Rasa
cd rasa_bot
rasa run --enable-api

# Lancer le moteur RAG
cd ../app/core
python agent_logic.py

---

## Fonctionnement
USER QUESTION
    ↓
[RASA] → si intent connu → réponse FAQ
    ↓ sinon
[RAG] → recherche sémantique dans les documents vectorisés
    ↓
[LLM] → génération d’une réponse à partir du contexte
---

## Auteure
Julie Lenoir
Développeuse Web (CDA 2025) – Alternance @ CEFii
📫 julielenoir.devweb@gmail.com
🔗 linkedin.com/in/julie-lenoir-renou
