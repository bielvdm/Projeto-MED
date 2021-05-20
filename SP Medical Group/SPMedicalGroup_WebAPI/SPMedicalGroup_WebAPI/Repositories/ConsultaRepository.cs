using SPMedicalGroup_WebAPI.Contexts;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        MedContext ctx = new MedContext();

        public void Atualizar(int id, Consultum Dados)
        {
            Consultum buscado = BuscarId(id);

            if (Dados.SobreConsulta != null )
            {
                buscado.IdConsulta = Dados.IdConsulta;
                buscado.IdMedico = Dados.IdMedico;
                buscado.IdSituacao = Dados.IdSituacao;
                buscado.IdCliente = Dados.IdCliente;
                buscado.SobreConsulta = Dados.SobreConsulta;
                buscado.DataConsulta = Dados.DataConsulta;
            }

            ctx.Consulta.Update(buscado);

            ctx.SaveChanges();
        }

        public Consultum BuscarId(int id)
        {
            return ctx.Consulta.Find(id);
        }

        public void Cadastrar(Consultum Dados)
        {
            ctx.Consulta.Add(Dados);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Consultum buscado = BuscarId(id);
            ctx.Consulta.Remove(buscado);
            ctx.SaveChanges();
        }

        public List<Consultum> ListarTodos()
        {
            return ctx.Consulta.ToList();
        }

        public List<Consultum> ListarProprias (int id)
        {
            return ctx.Consulta
                .Include(c => c.IdSituacaoNavigation)
                .Where(c => c.IdCliente == id)
                .ToList();
        }
    }
}
