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
    public class SituacaoController : ControllerBase
    {
        private ISituacaoRepository _SituacaoRepository { get; set; }
        public SituacaoController()
        {
            _SituacaoRepository = new SituacaoRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_SituacaoRepository.ListarTodos());
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
                _SituacaoRepository.Deletar(id);

                return StatusCode(204);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(Situacao Dados)
        {
            try
            {
                _SituacaoRepository.Cadastrar(Dados);

                return StatusCode(201);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Situacao Dados)
        {
            try
            {
                _SituacaoRepository.Atualizar(id, Dados);

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
                Situacao buscado = _SituacaoRepository.BuscarId(id);

                return Ok(buscado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }
    }
}
