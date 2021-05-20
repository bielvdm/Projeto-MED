using Microsoft.EntityFrameworkCore;
using SPMedicalGroup_WebAPI.Contexts;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {
        MedContext ctx = new MedContext();

        public void Atualizar(int id, Medico Dados)
        {
            Medico buscado = BuscarId(id);

            if (Dados.NomeMedico != null)
            {
                buscado.IdClinica = Dados.IdClinica;
                buscado.IdMedico = Dados.IdMedico;
                buscado.IdEspecializacao = Dados.IdEspecializacao;
                buscado.NomeMedico = Dados.NomeMedico;
                buscado.Crm = Dados.Crm;
            }

            ctx.Medicos.Update(buscado);

            ctx.SaveChanges();
        }

        public Medico BuscarId(int id)
        {
            return ctx.Medicos.Find(id);
        }

        public void Cadastrar(Medico Dados)
        {
            ctx.Medicos.Add(Dados);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Medico buscado = BuscarId(id);
            ctx.Medicos.Remove(buscado);
            ctx.SaveChanges();
        }

        public List<Medico> ListarTodos()
        {
            return ctx.Medicos.ToList();
        }

        public List<Medico> ListarAssociado(int id)
        {

            return ctx.Medicos
                .Include(m=> m.IdClinicaNavigation)
                .Include(m => m.Consulta)
                .Where(m => m.IdMedico == id)
                .ToList();
        }
    }
}
