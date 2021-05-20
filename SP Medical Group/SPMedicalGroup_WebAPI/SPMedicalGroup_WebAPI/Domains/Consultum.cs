using System;
using System.Collections.Generic;

#nullable disable

namespace SPMedicalGroup_WebAPI.Domains
{
    public partial class Consultum
    {
        public int IdConsulta { get; set; }
        public int? IdCliente { get; set; }
        public int? IdMedico { get; set; }
        public int? IdSituacao { get; set; }
        public string SobreConsulta { get; set; }
        public DateTime? DataConsulta { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Situacao IdSituacaoNavigation { get; set; }
    }
}
