const API_URL = "https://localhost:7250/api";

async function fetchData(endpoint, errorMessage) {
  const response = await fetch(
    `${API_URL}/${endpoint}`
  );

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return await response.json();
}

export function getEventos() {
  return fetchData(
    "Evento",
    "Error cargando eventos"
  );
}

export function getContactos() {
  return fetchData(
    "Contacto",
    "Error cargando contactos"
  );
}