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
            Consultum buscado = ctx.Consulta.Find(id);

            if (Dados.IdMedico != null )
            {
                buscado.IdMedico = Dados.IdMedico;
            }
            if (Dados.IdSituacao != null )
            {
                buscado.IdSituacao = Dados.IdSituacao;
            }
            if (Dados.IdCliente != null )
            {
                buscado.IdCliente = Dados.IdCliente;
            }
            if (Dados.SobreConsulta != null )
            {
                buscado.SobreConsulta = Dados.SobreConsulta;
            }
            if (Dados.DataConsulta != null )
            {
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
            return ctx.Consulta
                .Include(c => c.IdClienteNavigation)
                .Include(c => c.IdMedicoNavigation)
                .Include(c => c.IdSituacaoNavigation)
                .ToList();
        }

        public List<Consultum> ListarProprias (int id)
        {
            return ctx.Consulta
                .Include(c => c.IdSituacaoNavigation)
                .Include(c => c.IdMedicoNavigation)
                .Where(c => c.IdCliente == id)
                .ToList();
        }

        public List<Consultum> ListarPropriasMedicos (int id)
        {
            return ctx.Consulta
                .Include(c => c.IdSituacaoNavigation)
                .Include(c => c.IdClienteNavigation)
                .Where(c => c.IdMedico == id)
                .ToList();
        }
    }
} 