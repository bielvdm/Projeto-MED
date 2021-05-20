using SPMedicalGroup_WebAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Interfaces
{
    interface IMedicoRepository
    {
        List<Medico> ListarTodos();
        void Cadastrar(Medico Dados);
        void Deletar(int id);
        void Atualizar(int id, Medico Dados);
        Medico BuscarId(int id);
        List<Medico> ListarAssociado(int id);
    }
}
