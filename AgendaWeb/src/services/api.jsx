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
//Eventos
export function getEventos() {
  return fetchData(
    "Evento",
    "Error cargando eventos"
  );
}

export function getEvento(id) {
  return fetchData(
    `Evento/${id}`,
    "Error cargando evento"
  );
}

export function createEvento(evento) {
  console.log(evento);
  return fetch(
    `${API_URL}/Evento`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evento),
    }
  );
}

// contactos
export function getContactos() {
  return fetchData(
    "Contacto",
    "Error cargando contactos"
  );
}

export function getContacto(id) {
  return fetchData(
    `Contacto/${id}`,
    "Error cargando contacto"
  );
}

export function createContacto(contacto) {
  console.log(contacto);
  return fetch(
    `${API_URL}/Contacto`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contacto),
    }
  );
}