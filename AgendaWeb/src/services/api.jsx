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

export function updateEvento(id, evento) {
  console.log(evento);
  return fetch(
    `${API_URL}/Evento/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evento),
    }
  );
}

export function deleteEvento(id) {
  const confirmed = window.confirm("Seguro que desea eliminar este evento?");
  if (!confirmed) {
    return Promise.resolve();
  }
  const response = fetch(
    `${API_URL}/Evento/${id}`,
    {
      method: "DELETE",
    }
  );
  return response;
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

export function updateContacto(id, contacto) {
  console.log(contacto);
  const response = fetch( 
    `${API_URL}/Contacto/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contacto),
    }
  );
  return response;
}

export function deleteContacto(id) {
  const confirmed = window.confirm("Seguro que desea eliminar este contacto?");
  if (!confirmed) {
    return Promise.resolve();
  }
  const response = fetch(
    `${API_URL}/Contacto/${id}`,
    {
      method: "DELETE",
    }
  );
  return response;
}