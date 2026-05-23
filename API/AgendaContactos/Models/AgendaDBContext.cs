using AgendaContactos.Models.Entidades;
using Microsoft.EntityFrameworkCore;

namespace AgendaContactos.Models
{
    public class AgendaDBContext : DbContext
    {
        public DbSet<Contacto> Contactos { get; set; }
        public DbSet<Evento> Eventos { get; set; }
        public AgendaDBContext(DbContextOptions<AgendaDBContext> options) : base(options)
        { }
    }
}
