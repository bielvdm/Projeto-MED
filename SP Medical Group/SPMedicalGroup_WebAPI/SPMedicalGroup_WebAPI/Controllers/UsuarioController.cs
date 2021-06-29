using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using SPMedicalGroup_WebAPI.Models;
using SPMedicalGroup_WebAPI.Repositories;
using SPMedicalGroup_WebAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository _UsuarioRepository { get; set; }
        private readonly IMailService _mailService;

        public UsuarioController(IMailService mailService)
        {
            _UsuarioRepository = new UsuarioRepository();
            _mailService = mailService;
        }

        [Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_UsuarioRepository.ListarTodos());
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }

        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _UsuarioRepository.Deletar(id);

                return StatusCode(204);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(Usuario Dados, [FromForm] WelcomeRequest request, string emaildapessoa)
        {
            try
            {    
                Usuario usuarioBuscado = _UsuarioRepository.BuscarEmail(Dados.Email);
                
                if(usuarioBuscado == null)
                {
                    _UsuarioRepository.Cadastrar(Dados);

                    emaildapessoa = Dados.Email;

                    _mailService.SendWelcomeEmailAsync(request, emaildapessoa);

                    return Created(HttpStatusCode.Created.ToString(), $"Usuário com o email {Dados.Email} cadastrados");
                }
                  
                return BadRequest("E-mail existente");
 
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }

        [Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Usuario Dados)
        {
            try
            {
                _UsuarioRepository.Atualizar(id, Dados);

                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [Authorize(Roles = "1")]
        [HttpGet("{id}")]
        public IActionResult GetId(int id)
        {
            try
            {
                Usuario buscado = _UsuarioRepository.BuscarId(id);

                return Ok(buscado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }
    }
}
