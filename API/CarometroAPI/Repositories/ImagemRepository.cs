using CarometroAPI.Contexts;
using CarometroAPI.Domains;
using CarometroAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace CarometroAPI.Repositories
{
    public class ImagemRepository : IImagemRepository
    {
        CarometroContext ctx = new CarometroContext();
        public void Cadastrar(IFormFile foto, int idUsuario)
        {
            Imagem imagemUsuario = new Imagem();


            using (var ms = new MemoryStream())
            {
                foto.CopyTo(ms);
                imagemUsuario.Binario = ms.ToArray();
                imagemUsuario.NomeArquivo = foto.FileName;
                imagemUsuario.MimeType = foto.FileName.Split('.').Last();
                imagemUsuario.IdUsuario = idUsuario;
            }

            Imagem fotoexistente = new Imagem();
            fotoexistente = ctx.Imagems.FirstOrDefault(i => i.IdUsuario == idUsuario);

            if (fotoexistente != null)
            {
                fotoexistente.Binario = imagemUsuario.Binario;
                fotoexistente.NomeArquivo = imagemUsuario.NomeArquivo;
                fotoexistente.MimeType = imagemUsuario.MimeType;
                fotoexistente.IdUsuario = idUsuario;

                ctx.Imagems.Update(fotoexistente);
            }
            else
            {
                ctx.Imagems.Add(imagemUsuario);
            }

            ctx.SaveChanges();
        }

        public List<Imagem> Listar()
        {
            return ctx.Imagems.ToList();
        }
    }
}
