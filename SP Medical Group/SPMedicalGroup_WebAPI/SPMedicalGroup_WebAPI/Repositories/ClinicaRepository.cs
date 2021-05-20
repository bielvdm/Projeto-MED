using SPMedicalGroup_WebAPI.Contexts;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        MedContext ctx = new MedContext();

        public void Atualizar(int id, Clinica Dados)
        {
            Clinica buscado = BuscarId(id);

            if (Dados.Endereco != null)
            {
                buscado.Endereco = Dados.Endereco;
                buscado.Medicos = Dados.Medicos;
                buscado.NomeFantasia = Dados.NomeFantasia;
                buscado.RazaoSocial = Dados.RazaoSocial;
                buscado.IdClinica = Dados.IdClinica;
            }

            ctx.Clinicas.Update(buscado);

            ctx.SaveChanges();
        }

        public Clinica BuscarId(int id)
        {
            return ctx.Clinicas.Find(id);
        }

        public void Cadastrar(Clinica Dados)
        {
            ctx.Clinicas.Add(Dados);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Clinica buscado = BuscarId(id);
            ctx.Clinicas.Remove(buscado);
            ctx.SaveChanges();
        }

        public List<Clinica> ListarTodos()
        {
            return ctx.Clinicas.ToList();
        }
    }
}
