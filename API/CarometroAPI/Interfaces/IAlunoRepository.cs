using CarometroAPI.Domains;
using System.Collections.Generic;

namespace CarometroAPI.Interfaces
{
    public interface IAlunoRepository
    {
        Aluno BuscarPorId(int idAluno);
        void Cadastrar(Aluno novoAluno);
        List<Aluno> alunoUsuario(int id);
        List<Aluno> Listar();
        void Atualizar(Aluno AlunoAtualizado);
        void Deletar(int idAluno);
    }
}
