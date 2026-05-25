import React from 'react'
import { createContacto, updateContacto, deleteContacto } from "../../services/api";
import "../../Modal.css"

export default function CreateContacto({ onClose, onCreated, onUpdated, contacto=null }) {

  const [formData, setFormData] = React.useState({

    nombre: contacto?.nombre || "",
    apellido: contacto?.apellido || "",
    email: contacto?.email || "",
    telefono1: contacto?.telefono1 || "",
    telefono2: contacto?.telefono2 || "",
    direccion: contacto?.direccion || "",
    fechaNacimiento: contacto?.fechaNacimiento?.split("T")[0] || "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (contacto) {
        console.log("actualizando contacto");
        console.log(formData);
        await updateContacto(contacto.id, formData);
        await onUpdated();
      } else {
        await createContacto(formData);
        await onCreated();
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminarContacto() {
    if (contacto) {
      await deleteContacto(contacto.id);
      await onDeleted();
      onClose();
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Crear Contacto</h2>
        <form className="form-group" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Teléfono 1"
            value={formData.telefono1}
            onChange={(e) => setFormData({ ...formData, telefono1: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Teléfono 2"
            value={formData.telefono2}
            onChange={(e) => setFormData({ ...formData, telefono2: e.target.value })}
          />
          <input
            type="text"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
          />
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            placeholder="Fecha de Nacimiento"
            value={formData.fechaNacimiento}
            onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
          />

          <div className="buttons">
            <button className='button-modal' type="submit">
              Guardar
            </button>
            <button className='button-modal-danger' onClick={onClose}>
              Cerrar
            </button>
            {contacto != null && (
              <button className='button-modal-danger' onClick={eliminarContacto}>
                Eliminar
              </button>
            )}   
          </div>
        </form>
      </div>
    </div>
  )
}