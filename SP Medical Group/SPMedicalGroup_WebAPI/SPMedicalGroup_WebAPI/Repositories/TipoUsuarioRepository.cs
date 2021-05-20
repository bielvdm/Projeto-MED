using SPMedicalGroup_WebAPI.Contexts;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        MedContext ctx = new MedContext();

        public void Atualizar(int id, TipoUsuario Dados)
        {
            TipoUsuario buscado = BuscarId(id);

            if (Dados.Nome != null)
            {
                buscado.IdTipo = Dados.IdTipo;
                buscado.Nome = Dados.Nome;
                buscado.Usuarios = Dados.Usuarios;
            }
            ctx.TipoUsuarios.Update(buscado);

            ctx.SaveChanges();
        }

        public TipoUsuario BuscarId(int id)
        {
            return ctx.TipoUsuarios.Find(id);
        }

        public void Cadastrar(TipoUsuario Dados)
        {
            ctx.TipoUsuarios.Add(Dados);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            TipoUsuario buscado = BuscarId(id);
            ctx.TipoUsuarios.Remove(buscado);
            ctx.SaveChanges();
        }

        public List<TipoUsuario> ListarTodos()
        {
            return ctx.TipoUsuarios.ToList();
        }
    }
}
