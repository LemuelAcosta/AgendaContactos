import React from 'react'
import { createContacto } from "../../services/api";
import "../../Modal.css"

export default function CreateContacto({ onClose, onCreated }) {

  const [formData, setFormData] = React.useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono1: "",
    telefono2: "",
    direccion: "",
    fechaNacimiento: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createContacto(formData);
      await onCreated();
      onClose();
    } catch (error) {
      console.error(error);
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
          </div>
        </form>
      </div>
    </div>
  )
}