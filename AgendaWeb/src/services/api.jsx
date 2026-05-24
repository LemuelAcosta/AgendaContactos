const API_URL =
  "https://localhost:7250/api";

export async function getEventos() {

  const response = await fetch(
    `${API_URL}/Evento`
  );

  if (!response.ok) {
    throw new Error(
      "Error cargando eventos"
    );
  }

  return await response.json();
}