using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarometroAPI.ViewModels
{
    public class AlunoViewModel
    {
        //criar view model
        public int idAluno { get; set; }
        public string nomeAluno { get; set; }
        public string turma { get; set; }
        public string periodo { get; set; }
        public string imagem { get; set; }
        //metodo interface
        //implementar repositorio com base a view model
        //endpoint
    }
}
