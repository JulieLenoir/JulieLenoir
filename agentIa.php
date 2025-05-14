<?php
// Retourne toujours du JSON
header('Content-Type: application/json');

// Lecture et décodage du JSON envoyé depuis le frontend
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Vérification du message
if (empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Message vide ou manquant']);
    exit;
}
$userMessage = $data['message'];
if ($data['type'] === 'faq') {

    $apiUrl = 'http://localhost:8000/api/faq';
} else {
    $apiUrl = 'http://localhost:8000/api/rag';
}


// Préparation du payload pour l'API Python
$question = json_encode(['question' => $userMessage]);

// Initialisation de cURL
// curl : bibliothèque php qui permet d'envoyer requete http à l'API Python
$ch = curl_init($apiUrl);

curl_setopt_array($ch, [
    //  Demande à cURL de retourner la réponse dans une variable (au lieu de l'afficher directement dans la page).
    CURLOPT_RETURNTRANSFER => true,
    //  Indique que la requête HTTP est de type POST.
    CURLOPT_POST => true,
    // Ajoute des headers HTTP
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($question)
    ],
    // corps de la requête : le JSON à envoyer.
    CURLOPT_POSTFIELDS => $question
]);

// Exécute la requête cURL.
$response = curl_exec($ch);
// Récupère le code HTTP de la réponse (200, 400, 500, etc.).
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erreur lors de la communication avec l\'API Python',
        'details' => curl_error($ch)
    ]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Vérifie que l'API Python a bien répondu en 200
if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo json_encode([
        'error' => 'Erreur de l\'API Python',
        'status' => $httpCode,
        'response' => $response
    ]);
    exit;
}
$decodedResponse = json_decode($response, true);
// var_dump($decodedResponse);
// die;

if (isset($decodedResponse['answer'])) {
    echo json_encode(['answer' => $decodedResponse['answer']]);
} else {
    // Fallback si le format de réponse est inattendu
    echo json_encode(['answer' => $response]);
}
