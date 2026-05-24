import { useEffect, useState } from "react";
import { getContactos } from "../../services/api";
import { Link } from "react-router-dom";

function ContactosPage() {

  const [Contactos, setContactos] =
    useState([]);

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
      <Link to="/" className='link-button'>Ir a Inicio</Link>

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
    </div>

  );
}

export default ContactosPage;