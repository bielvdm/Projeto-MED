using SPMedicalGroup_WebAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Interfaces
{
    interface IConsultaRepository
    {
        List<Consultum> ListarTodos();
        void Cadastrar(Consultum Dados);
        List<Consultum> ListarProprias(int id);
        void Deletar(int id);
        void Atualizar(int id, Consultum Dados);
        Consultum BuscarId(int id);
    }
}
