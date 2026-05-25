import { useEffect, useState } from "react";
import { getEventos } from "../../services/api";
import { Link } from "react-router-dom";
import CreateEvento from "../../components/Eventos/CreateEvento";

function EventosPage() {

  const [eventos, setEventos] = useState([]);
  const [showCreate, setShowCreate] = useState(false);


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
      <div className="buttons">
        <Link to="/" className='link-button'>Ir a Inicio</Link>
        <button className="button" onClick={() => setShowCreate(true)}>
          Crear Evento
        </button>
      </div>

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
      {
        showCreate && (
          <CreateEvento
            onClose={() => setShowCreate(false)}
            onCreated={cargarEventos}
          />
        )
      }
    </div>
  );
}

export default EventosPage;