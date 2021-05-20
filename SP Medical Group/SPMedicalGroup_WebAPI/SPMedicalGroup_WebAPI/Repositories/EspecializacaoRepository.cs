using SPMedicalGroup_WebAPI.Contexts;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Repositories
{
    public class EspecializacaoRepository : IEspecializacaoRepository
    {
        MedContext ctx = new MedContext();

        public void Atualizar(int id, Especializacao Dados)
        {
            Especializacao buscado = BuscarId(id);

            if (Dados.NomeEspecializacao != null)
            {
                buscado.IdEspecializacao = Dados.IdEspecializacao;
                buscado.NomeEspecializacao = Dados.NomeEspecializacao;
                buscado.Medicos = Dados.Medicos;
            }

            ctx.Especializacaos.Update(buscado);

            ctx.SaveChanges();
        }

        public Especializacao BuscarId(int id)
        {
            return ctx.Especializacaos.Find(id);
        }

        public void Cadastrar(Especializacao Dados)
        {
            ctx.Especializacaos.Add(Dados);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Especializacao buscado = BuscarId(id);
            ctx.Especializacaos.Remove(buscado);
            ctx.SaveChanges();
        }

        public List<Especializacao> ListarTodos()
        {
            return ctx.Especializacaos.ToList();
        }
    }
}
