using CarometroAPI.Interfaces;
using CarometroAPI.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace CarometroAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ImagensController : ControllerBase
    {
        /// <summary>
        /// Objeto que irá receber todos os métodos da interface
        /// </summary>
        private IImagemRepository _imagemRepository { get; set; }

        /// <summary>
        /// Instancia o objeto para que haja referência às implementações no repositório
        /// </summary>
        public ImagensController()
        {
            _imagemRepository = new ImagemRepository();
        }

        /// <summary>
        /// Lista todas as Imagens existentes
        /// </summary>
        /// <returns>Uma lista de imagens</returns>
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_imagemRepository.Listar());
        }

        /// <summary>
        /// Consulta a foto de perfil de um usuário
        /// </summary>
        /// <returns>A foto em base64</returns>
        [HttpPost("{idUsuario}")]
        public IActionResult salvarImagem(IFormFile foto, int idUsuario)
        {
            try
            {
                if (foto.Length > 500000000) //5MB
                    return BadRequest(new { mensagem = "O tamanho máximo da imagem foi atingido." });

                string extensao = foto.FileName.Split('.').Last();

                _imagemRepository.Cadastrar(foto, idUsuario);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
