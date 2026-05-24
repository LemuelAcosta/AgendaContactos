import React from 'react'
import { Link } from 'react-router-dom'

export default function IndexPage() {
  return (
    <div className='bg-screen'>
        <h1>Bienvenido a la Agenda</h1>
        <div className='container'>
            <div>          
                <Link to="/eventos" className='link-button'>Ir a Eventos</Link>
            </div>
            <div>          
                <Link to="/contactos" className='link-button'>Ir a Contactos</Link>
            </div>
        </div>
    </div>
  )
}
