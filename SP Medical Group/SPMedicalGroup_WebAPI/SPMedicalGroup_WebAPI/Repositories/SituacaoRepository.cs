using SPMedicalGroup_WebAPI.Contexts;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Repositories
{
    public class SituacaoRepository : ISituacaoRepository
    {
        MedContext ctx = new MedContext();

        public void Atualizar(int id, Situacao Dados)
        {
            Situacao buscado = BuscarId(id);

            if (Dados.NomeSituacao != null)
            {
                buscado.IdSituacao = Dados.IdSituacao;
                buscado.NomeSituacao = Dados.NomeSituacao;
                buscado.Consulta = Dados.Consulta;
            }

            ctx.Situacaos.Update(buscado);

            ctx.SaveChanges();
        }

        public Situacao BuscarId(int id)
        {
            return ctx.Situacaos.Find(id);
        }

        public void Cadastrar(Situacao Dados)
        {
            ctx.Situacaos.Add(Dados);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Situacao buscado = BuscarId(id);
            ctx.Situacaos.Remove(buscado);
            ctx.SaveChanges();
        }

        public List<Situacao> ListarTodos()
        {
            return ctx.Situacaos.ToList();
        }
    }
}
