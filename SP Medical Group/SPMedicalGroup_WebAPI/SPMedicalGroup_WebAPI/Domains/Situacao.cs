using System;
using System.Collections.Generic;

#nullable disable

namespace SPMedicalGroup_WebAPI.Domains
{
    public partial class Situacao
    {
        public Situacao()
        {
            Consulta = new HashSet<Consultum>();
        }

        public int IdSituacao { get; set; }
        public string NomeSituacao { get; set; }

        public virtual ICollection<Consultum> Consulta { get; set; }
    }
}
