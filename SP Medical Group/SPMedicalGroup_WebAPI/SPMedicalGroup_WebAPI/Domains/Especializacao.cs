using System;
using System.Collections.Generic;

#nullable disable

namespace SPMedicalGroup_WebAPI.Domains
{
    public partial class Especializacao
    {
        public Especializacao()
        {
            Medicos = new HashSet<Medico>();
        }

        public int IdEspecializacao { get; set; }
        public string NomeEspecializacao { get; set; }

        public virtual ICollection<Medico> Medicos { get; set; }
    }
}
