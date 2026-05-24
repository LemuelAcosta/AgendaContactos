import { useEffect, useState } from "react";
import { getEventos } from "../../services/api";
import { Link } from "react-router-dom";

function EventosPage() {

  const [eventos, setEventos] =
    useState([]);

  async function cargarEventos() {
    const data = await getEventos();
    setEventos(data);
  }

  useEffect(() => {
    cargarEventos();
  }, []);

  return (

    <div>
      <h1>Eventos</h1>
      <Link to="/" className='link-button'>Ir a Inicio</Link>

      {
        eventos.map(evento => (
          <div key={evento.id}>
            <h3>{evento.titulo}</h3>
            <p>{evento.descripcion}</p>
            <small>
              {evento.fechaInicio}
            </small>
          </div>
        ))
      }
    </div>
  );
}

export default EventosPage;