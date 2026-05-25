import { useEffect, useState } from "react";
import { getContactos } from "../../services/api";
import { Link } from "react-router-dom";
import CreateContacto from "../../components/Contactos/CreateContacto";

function ContactosPage() {

  const [showCreate, setShowCreate] = useState(false);
  const [Contactos, setContactos] = useState([]);

  async function cargarContactos() {
    const data = await getContactos();
    setContactos(data);
  }

  useEffect(() => {
    cargarContactos();
  }, []);

  return (
    <div>
      <h1>Contactos</h1>
      <div className="buttons">
        <Link to="/" className='link-button'>Ir a Inicio</Link>
        <button className="button" onClick={() => setShowCreate(true)}>
          Crear Contacto
        </button>
      </div>

      {
        Contactos.map(evento => (
          <div key={evento.id}>
            <h3>{evento.nombreCompleto}</h3>
            <p>{evento.email}</p>
            <small>
              {evento.fechaNacimiento}
            </small>
          </div>

        ))
      }
      {
        showCreate && (
          <CreateContacto
            onClose={() => setShowCreate(false)}
            onCreated={cargarContactos}
          />
        )
      }
    </div>

  );
}

export default ContactosPage;