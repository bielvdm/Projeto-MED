using SPMedicalGroup_WebAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Interfaces
{
    interface IEspecializacaoRepository
    {
        List<Especializacao> ListarTodos();
        void Cadastrar(Especializacao Dados);
        void Deletar(int id);
        void Atualizar(int id, Especializacao Dados);
        Especializacao BuscarId(int id);
    }
}
