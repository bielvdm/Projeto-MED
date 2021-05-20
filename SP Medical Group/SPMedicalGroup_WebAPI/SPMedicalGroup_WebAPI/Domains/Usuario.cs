using System;
using System.Collections.Generic;

#nullable disable

namespace SPMedicalGroup_WebAPI.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Clientes = new HashSet<Cliente>();
        }

        public int? IdTipo { get; set; }
        public int IdUsuario { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }

        public virtual TipoUsuario IdTipoNavigation { get; set; }
        public virtual ICollection<Cliente> Clientes { get; set; }
    }
}
