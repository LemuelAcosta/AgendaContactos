import React from 'react'
import  "./../Modal.css"

export default function CreateEvento({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Crear Evento</h2>

        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Apellido" />

        <div className="buttons">
          <button className='button-modal'>Guardar</button>
          <button className='button-modal-danger' onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}