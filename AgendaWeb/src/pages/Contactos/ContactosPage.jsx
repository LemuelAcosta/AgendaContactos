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

  async function cargarContactos() {
    const data = await getContactos();
    setContactos(data);
  }

  useEffect(() => {
    cargarContactos();
  }, []);


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
        <input type="text" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
      </div>
      <div className="contactos-list">
        {
          contactosFiltrados.map(contacto => (
          <div className="evento" onClick={async () => {
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