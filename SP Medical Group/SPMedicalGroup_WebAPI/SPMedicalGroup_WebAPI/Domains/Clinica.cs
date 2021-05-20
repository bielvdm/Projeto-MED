using System;
using System.Collections.Generic;

#nullable disable

namespace SPMedicalGroup_WebAPI.Domains
{
    public partial class Clinica
    {
        public Clinica()
        {
            Medicos = new HashSet<Medico>();
        }

        public int IdClinica { get; set; }
        public string Endereco { get; set; }
        public string NomeFantasia { get; set; }
        public string RazaoSocial { get; set; }

        public virtual ICollection<Medico> Medicos { get; set; }
    }
}
