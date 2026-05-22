namespace AgendaContactos.Models.Entidades
{
    public class Contacto
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Telefono1 { get; set; }
        public string Telefono2 { get; set; }
        public string Email { get; set; }
        public string Direccion { get; set; }
        public DateTime FechaNacimiento { get; set; }

    }
}
