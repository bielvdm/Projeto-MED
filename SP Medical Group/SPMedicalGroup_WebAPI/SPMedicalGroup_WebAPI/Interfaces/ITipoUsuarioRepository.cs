using System;
using System.Collections.Generic;
using SPMedicalGroup_WebAPI.Domains;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Interfaces
{
    interface ITipoUsuarioRepository
    {
        List<TipoUsuario> ListarTodos();
        void Cadastrar(TipoUsuario Dados);
        void Deletar(int id);
        void Atualizar(int id, TipoUsuario Dados);
        TipoUsuario BuscarId(int id);
    }
}
