using System;
using SPMedicalGroup_WebAPI.Domains;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Interfaces
{
    interface IClinicaRepository
    {
        List<Clinica> ListarTodos();
        void Cadastrar(Clinica Dados);
        void Deletar(int id);
        void Atualizar(int id, Clinica Dados);
        Clinica BuscarId(int id);
    }
}
