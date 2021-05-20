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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class MedicoController : ControllerBase
    {
        private IMedicoRepository _medicoRepository { get; set; }
        public MedicoController()
        {
            _medicoRepository = new MedicoRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_medicoRepository.ListarTodos());
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
                _medicoRepository.Deletar(id);

                return StatusCode(204);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
            
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post (Medico Dados)
        {
            try
            {
                _medicoRepository.Cadastrar(Dados);

                return StatusCode(201);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
            
        }

        [HttpPut("{id}")]
        public IActionResult Put (int id, Medico Dados)
        {
            try
            {
                _medicoRepository.Atualizar(id, Dados);

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
                Medico buscado = _medicoRepository.BuscarId(id);

                return Ok(buscado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }

        [HttpGet("consultar")]
        public IActionResult ListarAssociado ()
        {
            try
            {
                int idMedico = Convert.ToInt32(HttpContext.User.Claims.First(m => m.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_medicoRepository.ListarAssociado(idMedico));
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensagem = "Necessário fazer o login",
                    ex
                });
            }

        }
    }
}
