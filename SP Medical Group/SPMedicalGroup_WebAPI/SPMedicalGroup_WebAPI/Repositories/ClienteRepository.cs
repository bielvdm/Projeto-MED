using SPMedicalGroup_WebAPI.Contexts;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        MedContext ctx = new MedContext();

        public void Atualizar(int id, Cliente Dados)
        {
            Cliente buscado = BuscarId(id);

            if (Dados.NomeCliente != null)
            {
                buscado.IdUsuario = Dados.IdUsuario;
                buscado.Cpf = Dados.Cpf;
                buscado.IdCliente = Dados.IdCliente;
                buscado.Consulta = Dados.Consulta;
                buscado.NomeCliente = Dados.NomeCliente;
                buscado.Rg = Dados.Rg;
                buscado.DataNascimento = Dados.DataNascimento;
                buscado.TelefoneCliente = Dados.TelefoneCliente;
            }

            ctx.Clientes.Update(buscado);

            ctx.SaveChanges();
        }

        public Cliente BuscarId(int id)
        {
            return ctx.Clientes.Find(id);
        }

        public void Cadastrar(Cliente Dados)
        {
            ctx.Clientes.Add(Dados);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Cliente buscado = BuscarId(id);
            ctx.Clientes.Remove(buscado);
            ctx.SaveChanges();
        }

        public List<Cliente> ListarTodos()
        {
            return ctx.Clientes.ToList();
        }
    }
}
