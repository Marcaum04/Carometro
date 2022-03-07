using CarometroAPI.Contexts;
using CarometroAPI.Domains;
using CarometroAPI.Interfaces;
using CarometroAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarometroAPI.Repositories
{
    public class AlunoRepository : IAlunoRepository
    {
        CarometroContext ctx = new CarometroContext();

        public void Atualizar(Aluno alunoAtualizado)
        {
            Aluno alunoBuscado = BuscarPorId(alunoAtualizado.IdAluno);

            if (alunoAtualizado.IdUsuario != null)
            {
                alunoBuscado.IdUsuario = alunoAtualizado.IdUsuario;
            }

            if (alunoAtualizado.IdTurma != null)
            {
                alunoBuscado.IdTurma = alunoAtualizado.IdTurma;
            }

            if (alunoAtualizado.Matricula != null)
            {
                alunoBuscado.Matricula = alunoAtualizado.Matricula;
            }

            ctx.Alunos.Update(alunoBuscado);

            ctx.SaveChanges();
        }

        public Aluno BuscarPorId(int idAluno)
        {
            return ctx.Alunos.FirstOrDefault(u => u.IdAluno == idAluno);
        }

        public void Cadastrar(Aluno novoAluno)
        {
            ctx.Alunos.Add(novoAluno);

            ctx.SaveChanges();
        }

        public void Deletar(int idAluno)
        {
            Aluno alunoBuscado = BuscarPorId(idAluno);

            ctx.Alunos.Remove(alunoBuscado);

            ctx.SaveChanges();
        }

        public List<Aluno> Listar()
        {
            return ctx.Alunos
                .Select(
                a => new Aluno
            {
                IdAluno = a.IdAluno,
                IdTurma = a.IdTurma,
                IdUsuario = a.IdUsuario,
                Matricula = a.Matricula,
                IdUsuarioNavigation = new Usuario
                {
                    IdUsuario = a.IdUsuarioNavigation.IdUsuario,
                    IdTipoUsuario = a.IdUsuarioNavigation.IdTipoUsuario,
                    IdInstituicao = a.IdUsuarioNavigation.IdInstituicao,
                    NomeUsuario = a.IdUsuarioNavigation.NomeUsuario,
                    Rg = a.IdUsuarioNavigation.Rg,
                    Email = a.IdUsuarioNavigation.Email,
                    Senha = a.IdUsuarioNavigation.Senha
                },
                    IdTurmaNavigation = new Turma
                    {
                        IdTurma = a.IdTurmaNavigation.IdTurma,
                        IdPeriodo = a.IdTurmaNavigation.IdPeriodo,
                        NomeTurma = a.IdTurmaNavigation.NomeTurma,
                        IdPeriodoNavigation = new Periodo
                        {
                            IdPeriodo = a.IdTurmaNavigation.IdPeriodoNavigation.IdPeriodo,
                            NomePeriodo = a.IdTurmaNavigation.IdPeriodoNavigation.NomePeriodo
                        }
                    }

                })
                .ToList();
        }

        public List<Aluno> ListarAluno(int id)
        {
            return ctx.Alunos
                .Select(a => new Aluno
                {
                    IdAluno = a.IdAluno,
                    IdTurma = a.IdTurma,
                    IdUsuario = a.IdUsuario,
                    IdUsuarioNavigation = new Usuario
                    {
                        IdUsuario = a.IdUsuarioNavigation.IdUsuario,
                        IdTipoUsuario = a.IdUsuarioNavigation.IdTipoUsuario,
                        IdInstituicao = a.IdUsuarioNavigation.IdInstituicao,
                        NomeUsuario = a.IdUsuarioNavigation.NomeUsuario,
                        Rg = a.IdUsuarioNavigation.Rg,
                        Email = a.IdUsuarioNavigation.Email,
                        Senha = a.IdUsuarioNavigation.Senha
                    },
                    IdTurmaNavigation = new Turma
                    {
                        IdTurma = a.IdTurmaNavigation.IdTurma,
                        IdPeriodo = a.IdTurmaNavigation.IdPeriodo,
                        NomeTurma = a.IdTurmaNavigation.NomeTurma
                    }

                })
                .Where(c => c.IdUsuario == id)
                .ToList();
        }

        public List<AlunoViewModel> ListarImagem()
        {

            List<AlunoViewModel> listaAlunosViewModel = new List<AlunoViewModel>();

            List<Aluno> listaAlunos = ctx.Alunos
                .Select(a => new Aluno
                {
                    IdAluno = a.IdAluno,
                    IdUsuario = a.IdUsuario,
                    IdTurma = a.IdTurma,
                    Matricula = a.Matricula,
                    IdUsuarioNavigation = new Usuario
                    {
                        IdUsuario = a.IdUsuarioNavigation.IdUsuario,
                        IdTipoUsuario = a.IdUsuarioNavigation.IdTipoUsuario,
                        IdInstituicao = a.IdUsuarioNavigation.IdInstituicao,
                        NomeUsuario = a.IdUsuarioNavigation.NomeUsuario,
                        Rg = a.IdUsuarioNavigation.Rg,
                        Email = a.IdUsuarioNavigation.Email,
                        Senha = a.IdUsuarioNavigation.Senha,
                        Imagems = a.IdUsuarioNavigation.Imagems
                    },
                    IdTurmaNavigation = new Turma
                    {
                        IdTurma = a.IdTurmaNavigation.IdTurma,
                        IdPeriodo = a.IdTurmaNavigation.IdPeriodo,
                        NomeTurma = a.IdTurmaNavigation.NomeTurma
                    }
                })
                .ToList();

            foreach (var item in listaAlunos)
            {
                AlunoViewModel AVM = new AlunoViewModel(); 
                AVM.idAluno = item.IdAluno;
                AVM.nomeAluno = item.IdUsuarioNavigation.NomeUsuario;
                AVM.turma = item.IdTurmaNavigation.NomeTurma;
                AVM.imagem = Convert.ToBase64String(item.IdUsuarioNavigation.Imagems.FirstOrDefault(i => i.IdUsuario == item.IdUsuario).Binario);

                listaAlunosViewModel.Add(AVM);
            }

            return listaAlunosViewModel;
        }
    }
}
