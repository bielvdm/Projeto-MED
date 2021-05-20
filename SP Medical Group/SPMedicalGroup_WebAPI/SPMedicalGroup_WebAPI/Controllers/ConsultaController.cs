using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using SPMedicalGroup_WebAPI.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Controllers
{
    [Produces ("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultaController : ControllerBase
    {
        private IConsultaRepository _consultaRepository { get; set; }
        public ConsultaController()
        {
            _consultaRepository = new ConsultaRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_consultaRepository.ListarTodos());
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _consultaRepository.Deletar(id);

                return StatusCode(204);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(Consultum Dados)
        {
            try
            {
                _consultaRepository.Cadastrar(Dados);

                return StatusCode(201);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Consultum Dados)
        {
            try
            {
                _consultaRepository.Atualizar(id, Dados);

                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetId(int id)
        {
            try
            {
                Consultum buscado = _consultaRepository.BuscarId(id);

                return Ok(buscado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }

        [Authorize(Roles = "2")]
        [HttpGet("suas")]
        public IActionResult ListarProprias ()
        {
            try
            {
                int idCliente = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                return Ok(_consultaRepository.ListarProprias(idCliente));
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensagem="Necessáio estar logado para vizualizar suas próprias consultas!",
                    ex
                });
            }
        }
    }
}
