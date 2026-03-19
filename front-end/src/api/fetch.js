const BASE_URL = "http://localhost:3000"; // URL del backend

// Funzione base per le chiamate API
async function request(endpoint, options = {}) {
  // Recupera il token dal localStorage
  const token = localStorage.getItem("token"); // Configura le opzioni della richiesta, includendo il token se presente

  const config = {
    // Imposta le intestazioni, includendo il token se presente
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config); // Attende la risposta e converte in JSON

  // ← Se la risposta è 204 non parsare il JSON
  if (response.status === 204) {
    return null;
  }

  const data = await response.json(); // Gestione degli errori

  if (!response.ok) {
    throw new Error(data.message || "Errore nella richiesta");
  }

  return data;
}

// Metodi pronti all'uso
export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) =>
    request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  patch: (endpoint, body) =>
    request(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
