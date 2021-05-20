using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using SPMedicalGroup_WebAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EspecializacaoController : ControllerBase
    {
        private IEspecializacaoRepository _EspecializacaoRepository { get; set; }
        public EspecializacaoController()
        {
            _EspecializacaoRepository = new EspecializacaoRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_EspecializacaoRepository.ListarTodos());
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
                _EspecializacaoRepository.Deletar(id);

                return StatusCode(204);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(Especializacao Dados)
        {
            try
            {
                _EspecializacaoRepository.Cadastrar(Dados);

                return StatusCode(201);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Especializacao Dados)
        {
            try
            {
                _EspecializacaoRepository.Atualizar(id, Dados);

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
                Especializacao buscado = _EspecializacaoRepository.BuscarId(id);

                return Ok(buscado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }
    }
}
