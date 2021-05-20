using SPMedicalGroup_WebAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Interfaces
{
    interface IClienteRepository
    {
        List<Cliente> ListarTodos();
        void Cadastrar(Cliente Dados);
        void Deletar(int id);
        void Atualizar(int id, Cliente Dados);
        Cliente BuscarId(int id);
    }
}
