using SPMedicalGroup_WebAPI.Contexts;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        MedContext ctx = new MedContext();

        public void Atualizar(int id, Usuario Dados)
        {
            Usuario buscado = BuscarId(id);

            if (Dados.Email != null)
            {
                buscado.IdTipo = Dados.IdTipo;
                buscado.IdUsuario = Dados.IdUsuario;
                buscado.Email = Dados.Email;
                buscado.Senha = Dados.Senha;
                buscado.Clientes = Dados.Clientes;
            }

            ctx.Usuarios.Update(buscado);

            ctx.SaveChanges();
        }

        public Usuario BuscarId(int id)
        {
            return ctx.Usuarios.Find(id);
        }

        public void Cadastrar(Usuario Dados)
        {
            ctx.Usuarios.Add(Dados);
            ctx.SaveChanges();
        }

        public Usuario BuscarEmail(string Email)
        {
            Usuario usuariobuscado = ctx.Usuarios.FirstOrDefault(x => x.Email == Email);
            return usuariobuscado;
        }

        public void Deletar(int id)
        {
            Usuario buscado = BuscarId(id);
            ctx.Usuarios.Remove(buscado);
            ctx.SaveChanges();
        }

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios.ToList();
        }

        public Usuario Login(string Email, string Senha)
        {
            return ctx.Usuarios.FirstOrDefault(l => l.Email == Email && l.Senha == Senha);
        }
    }
}
