import { useEffect, useState } from "react";
import { getContacto, getContactos } from "../../services/api";
import { Link } from "react-router-dom";
import CreateContacto from "../../components/Contactos/CreateContacto";

function ContactosPage() {

  const [busqueda, setBusqueda] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [Contactos, setContactos] = useState([]);

  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  async function cargarContactos() {
    const data = await getContactos(page, pageSize);
    setContactos(data);
  }

  useEffect(() => {
    cargarContactos();
  }, [page, pageSize]);


  const contactosFiltrados = Contactos.filter((contacto) => {
    const texto = busqueda.toLowerCase();
    return (
      contacto.nombre.toLowerCase().includes(texto) ||
      contacto.apellido.toLowerCase().includes(texto) ||
      contacto.email.toLowerCase().includes(texto) ||
      contacto.telefono1.includes(texto) ||
      contacto.telefono2.includes(texto)
    );
  });

 

  return (
    <div className="contactos-page">
      <h1>Contactos</h1>
      <div className="buttons">
        <Link to="/" className='link-button'>Ir a Inicio</Link>
        <button className="button" onClick={() => setShowCreate(true)}>
          Crear Contacto
        </button>
        <div className="filter-group"> 
          <label htmlFor="pageSize">Tamaño de página:</label>
          <input
            type="number"
            id="pageSize"
            value={pageSize}
            onChange={(e) =>
              setPageSize(Number(e.target.value) || 1)
            }
            min="1"
            max="10"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="busqueda">Buscar:</label>
          <input type="text" placeholder="Buscar por filtros..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
        </div>
      </div>
      <div className="contactos-list">
        {
          contactosFiltrados.map(contacto => (
          <div className="contacto" onClick={async () => {
            const data = await getContacto(contacto.id);

            setContactoSeleccionado(data);
            setShowEdit(true);
            }} 
            key={contacto.id}>
              <h3>{contacto.nombreCompleto}</h3>
              <p>{contacto.email}</p>
              <small>
                {contacto.telefono1}
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
          <CreateContacto
            onClose={() => setShowCreate(false)}
            onCreated={cargarContactos}
          />
        )
      }
      {
        showEdit && (
          <CreateContacto
            onClose={() => setShowEdit(false)}
            onCreated={cargarContactos}
            onUpdated={cargarContactos}
            contacto={contactoSeleccionado}
          />
        )
      }
    </div>

  );
}

export default ContactosPage;