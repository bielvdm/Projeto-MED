using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SPMedicalGroup_WebAPI.Domains;
using SPMedicalGroup_WebAPI.Interfaces;
using SPMedicalGroup_WebAPI.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SPMedicalGroup_WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }

        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Login (Usuario Dados)
        {
            try
            {
                Usuario Login = _usuarioRepository.Login(Dados.Email, Dados.Senha);

                if (Login == null)
                {
                    return NotFound("E-mail e/ou senha não encontrados");
                }

                var claim = new[]
                {
                    new Claim (JwtRegisteredClaimNames.Email, Login.Email),
                    new Claim (JwtRegisteredClaimNames.Jti, Login.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, Login.IdTipo.ToString())
                };

                var Key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("medico-webapi-projeto"));

                var creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken
                (
                    issuer: "SPMedicalGroup_WebAPI",
                    audience: "SPMedicalGroup_WebAPI",
                    claims: claim,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                );

                return Ok
                (
                    new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token)
                    }
                );
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
