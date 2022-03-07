using CarometroAPI.Domains;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace CarometroAPI.Interfaces
{
    interface IImagemRepository
    {
        void Cadastrar(IFormFile foto, int idUsuario);
        List<Imagem> Listar();
    }
}
