import React from 'react'
import { createEvento, getContactos, updateEvento, deleteEvento } from "../../services/api";
import MultipleContactos from "../Contactos/MultipleContactos";
import { useEffect, useState } from 'react';
import  "../../Modal.css"

export default function CreateEvento({ onClose, onCreated, onUpdated, evento=null }) {

  const [formData, setFormData] = React.useState({
    titulo: evento?.titulo || "",
    descripcion: evento?.descripcion || "",
    fechaInicio: evento?.fechaInicio?.split("T")[0] || "",
    fechaFin: evento?.fechaFin?.split("T")[0] || "",
    estado: evento?.estado || 0,
    esImportante: evento?.esImportante || false,
  });
  console.log(evento);

  const [seleccionados, setSeleccionados] = useState([]);
  const [contactos, setContactos] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        contactosIds: seleccionados
      };
      if (evento) {
        await updateEvento(evento.id, data);
        await onUpdated();
      } else {
        await createEvento(data);
        await onCreated();
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  async function eliminarEvento() {
    if (evento) {
      await deleteEvento(evento.id);
      await onDeleted();
      onClose();
    }
  }

  useEffect(() => {
    getContactos(0, 0, true).then(setContactos);
  }, []);

  useEffect(() => {
  if (evento) {
    setFormData({
      titulo: evento.titulo || "",
      descripcion: evento.descripcion || "",
      fechaInicio: evento.fechaInicio?.split("T")[0] || "",
      fechaFin: evento.fechaFin?.split("T")[0] || "",
      estado: evento.estado || 0,
      esImportante: evento.esImportante || false,
    });

    setSeleccionados(evento.contactosIds || []);
  }
}, [evento]);

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Crear Evento</h2>
        <form className="form-group" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Titulo"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Descripcion"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          />
          <label>Fecha Inicio</label>
          <input
            type="date"
            placeholder="FechaInicio"
            value={formData.fechaInicio}
            onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
          />
          <label>Fecha Fin</label>
          <input
            type="date"
            placeholder="FechaFin"
            value={formData.fechaFin}
            onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
          />
          <select
            placeholder="Estado"
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: Number(e.target.value) })}
          >
            <option value="0">Pendiente</option>
            <option value="1">En Progreso</option>
            <option value="2">Completado</option>
            <option value="3">Cancelado</option>
          </select>

          <MultipleContactos
            contactos={contactos}
            seleccionados={seleccionados}
            setSeleccionados={setSeleccionados}
          />

          <label>
            <input
              type="checkbox"
              checked={formData.esImportante}
              onChange={(e) => setFormData({ ...formData, esImportante: e.target.checked })}
            />
            Es importante
          </label>
          <div className="buttons">
            <button className='button-modal' type='submit'>
              Guardar
            </button>
            <button className='button-modal-danger' onClick={onClose}>
              Cerrar
            </button>
            {evento != null && (
              <button className='button-modal-danger' onClick={eliminarEvento}>
                Eliminar
              </button>
            )}          
          </div>
        </form>
      </div>
    </div>
  )
}