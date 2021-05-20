using SPMedicalGroup_WebAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Interfaces
{
    interface IUsuarioRepository
    {
        List<Usuario> ListarTodos();
        void Cadastrar(Usuario Dados);
        void Deletar(int id);
        void Atualizar(int id, Usuario Dados);
        Usuario BuscarId(int id);
        Usuario Login(string Email, string Senha);
        Usuario BuscarEmail(string email);
    }
}
