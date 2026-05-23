using AgendaContactos.Models;
using AgendaContactos.Models.Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgendaContactos.Controllers
{
    public class EventoController : Controller
    {
        private readonly AgendaDBContext _context;  
      
        public EventoController(AgendaDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Evento>>> GetEventos()
        {
            return await _context.Eventos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Evento>> GetEvento(Guid id)
        {
            var evento = await _context.Eventos.FindAsync(id);
            if (evento == null)
            {
                return NotFound();
            }
            return evento;
        }
    }
}
