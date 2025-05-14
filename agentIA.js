// Lancement de la fonction sendMessage quand on clique sur le bouton
document.getElementById('send-btn').addEventListener('click', sendMessage);

// Ou quand on appuie sur la touche "Entrée" dans l'input
document.getElementById('answer-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const input = document.getElementById('answer-input');
    const message = input.value.trim();

    // Ne rien faire si aucun texte saisi
    if (message === '') return;

    const messagesContainer = document.getElementById('zone-messages');

    // -----------------------------------
    // Affichage du message utilisateur
    // -----------------------------------
    const userDivContainer = document.createElement('div');
    userDivContainer.className = 'user-messages';

    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = message;

    const avatar = document.createElement('img');
    avatar.src = 'img/julie-PP-jaune.png'; // A REVOIR AVEC IMAGE DES APPRENANTS DANS VS
    avatar.className = 'avatar';

    userDivContainer.appendChild(userDiv);
    userDivContainer.appendChild(avatar);
    messagesContainer.appendChild(userDivContainer);

    // -------------------------------------------------
    // Affichage du message "Chargement..." de l'agent
    // ------------------------------------------------
    const agentMessageContainer = document.createElement('div');
    agentMessageContainer.className = 'agent-messages';

    const agentAvatar = document.createElement('img');
    agentAvatar.src = 'img/userAvatar.png';
    agentAvatar.className = 'agent-icon';

    const agentDiv = document.createElement('div');
    agentDiv.className = 'agent-message';
    agentDiv.textContent = 'Chargement...';

    // Création du spinner
    const spinner = document.createElement('span');
    spinner.className = 'spinner';
    agentDiv.appendChild(spinner); // On l’ajoute dans la bulle de message

    agentMessageContainer.appendChild(agentAvatar);
    agentMessageContainer.appendChild(agentDiv);
    messagesContainer.appendChild(agentMessageContainer);

    // -----------------------------------
    // Requête HTTP vers backend PHP
    // -----------------------------------
    try {
        // fetch méthode pour envoyer une requête POST
        const response = await fetch('agentIa.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // on transforme le message en JSON
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json(); // attend directement une réponse JSON
        console.log("Réponse de l'API :", data);


        // selon la réponse récupérée du PHP, on affiche le message correspondant
        if (data.answer) {
            // on parse le markdown en HTML
            const html = marked.parse(data.answer);

            // on injecte du HTML dans agentDiv
            agentDiv.innerHTML = html;

        } else if (data.error) {
            agentDiv.textContent = `Erreur : ${data.error}`;
        } else {
            agentDiv.textContent = 'Réponse inattendue de l\'API.';
        }


    } catch (error) {
        console.error("Erreur attrapée :", error);
        agentDiv.textContent = 'Erreur : ' + error.message;
    }

    // -----------------------------------
    // Réinitialisation de l'input et scroll
    // -----------------------------------
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}



const iconeOpen = document.querySelector('.open-icone');
const agentContainer = document.querySelector('.agent-container');
const closeContainer = document.querySelector('#agent-close');

// Ouverture de la fenêtre de discussion
iconeOpen.addEventListener('click', () => {
    iconeOpen.classList.add('icone-open');
    agentContainer.classList.add('open');
});

// Fermeture de la fenêtre de discussion
closeContainer.addEventListener('click', () => {
    iconeOpen.classList.remove('icone-open');
    agentContainer.classList.remove('open');
});
