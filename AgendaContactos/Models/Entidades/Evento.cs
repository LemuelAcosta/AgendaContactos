using AgendaContactos.Utiles;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgendaContactos.Models.Entidades
{
    public class Evento
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public bool EsImportante { get; set; }
        public EstadoEvento Estado { get; set; }
        public Guid IdContacto { get; set; }
        [ForeignKey("IdContacto")]
        public Contacto Contacto { get; set; }
    }
}
