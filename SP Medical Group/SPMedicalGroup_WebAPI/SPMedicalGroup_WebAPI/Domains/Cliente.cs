using System;
using System.Collections.Generic;

#nullable disable

namespace SPMedicalGroup_WebAPI.Domains
{
    public partial class Cliente
    {
        public Cliente()
        {
            Consulta = new HashSet<Consultum>();
        }

        public int? IdUsuario { get; set; }
        public int IdCliente { get; set; }
        public string NomeCliente { get; set; }
        public string Rg { get; set; }
        public string Cpf { get; set; }
        public string Endereco { get; set; }
        public DateTime DataNascimento { get; set; }
        public int TelefoneCliente { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Consultum> Consulta { get; set; }
    }
}
