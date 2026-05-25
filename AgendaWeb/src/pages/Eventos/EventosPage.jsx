import { useEffect, useState } from "react";
import { getEventos, getEvento } from "../../services/api";
import { Link } from "react-router-dom";
import CreateEvento from "../../components/Eventos/CreateEvento";

function EventosPage() {

  const [eventos, setEventos] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  async function cargarEventos() {
    const data = await getEventos(page, pageSize);
    setEventos(data);
  }

  useEffect(() => {
    cargarEventos();
  }, [page, pageSize]);

  return (

    <div className="eventos-page">
      <h1>Eventos</h1>
      <div className="buttons">
        <Link to="/" className='link-button'>Ir a Inicio</Link>
        <button className="button" onClick={() => setShowCreate(true)}>
          Crear Evento
        </button>
        <label htmlFor="pageSize">Tamaño de página:</label>
        <input
          type="number"
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPageSize(parseInt(e.target.value))}
          min="1"
          max="10"
        />
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
      <div className="pagination">
        <button
          className="button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>

        <span>Página {page}</span>

        <button className="button" onClick={() => setPage(page + 1)}>
          Siguiente
        </button>
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