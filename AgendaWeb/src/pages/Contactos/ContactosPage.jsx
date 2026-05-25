import { useEffect, useState } from "react";
import { getContactos } from "../../services/api";
import { Link } from "react-router-dom";
import CreateContacto from "../../components/Contactos/CreateContacto";

function ContactosPage() {

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

  return (
    <div className="contactos-page">
      <h1>Contactos</h1>
      <div className="buttons">
        <Link to="/" className='link-button'>Ir a Inicio</Link>
        <button className="button" onClick={() => setShowCreate(true)}>
          Crear Contacto
        </button>
      </div>
      <div className="contactos-list">
        {
          Contactos.map(contacto => (
            <div className="contacto" key={contacto.id}>
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
            contacto={contactoSeleccionado}
          />
        )
      }
    </div>

  );
}

export default ContactosPage;