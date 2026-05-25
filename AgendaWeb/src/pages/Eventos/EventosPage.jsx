import { useEffect, useState } from "react";
import { getEventos, getEvento } from "../../services/api";
import { Link } from "react-router-dom";
import CreateEvento from "../../components/Eventos/CreateEvento";

function EventosPage() {

  const [eventos, setEventos] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  async function cargarEventos() {
    const data = await getEventos();
    setEventos(data);
  }

  useEffect(() => {
    cargarEventos();
  }, []);

  return (

    <div className="eventos-page">
      <h1>Eventos</h1>
      <div className="buttons">
        <Link to="/" className='link-button'>Ir a Inicio</Link>
        <button className="button" onClick={() => setShowCreate(true)}>
          Crear Evento
        </button>
      </div>
      <div className="eventos-list">
        {
          eventos.map(evento => (
            <div className="evento" onClick={async () => {
              const data = await getEvento(evento.id);

              setEventoSeleccionado(data);
              setShowEdit(true);
              console.log(eventoSeleccionado);
            }} key={evento.id}>
              <h3>{evento.titulo}</h3>
              <p>{evento.descripcion}</p>
              <small>
                {evento.fechaInicio}
              </small>
            </div>
          ))
        }
      </div>
      {
        showCreate && (
          <CreateEvento
            onClose={() => setShowCreate(false)}
            onCreated={cargarEventos}
          />
        )
      }
      {
        showEdit && (
          <CreateEvento
            onClose={() => setShowEdit(false)}
            onCreated={cargarEventos}
            onUpdated={cargarEventos}
            evento={eventoSeleccionado}
          />
        )
      }
    </div>
  );
}

export default EventosPage;