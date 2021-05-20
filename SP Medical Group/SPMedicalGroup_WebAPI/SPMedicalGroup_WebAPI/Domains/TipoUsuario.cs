using System;
using System.Collections.Generic;

#nullable disable

namespace SPMedicalGroup_WebAPI.Domains
{
    public partial class TipoUsuario
    {
        public TipoUsuario()
        {
            Usuarios = new HashSet<Usuario>();
        }

        public int IdTipo { get; set; }
        public string Nome { get; set; }

        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
