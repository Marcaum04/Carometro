CREATE DATABASE CAROMETRO
GO

USE CAROMETRO
GO

CREATE TABLE tipoUsuario(
	idTipoUsuario TINYINT PRIMARY KEY IDENTITY(1,1),
	nomeTipoUsuario VARCHAR(50) UNIQUE NOT NULL
)
GO	

CREATE TABLE instituicao(
	idInstituicao SMALLINT PRIMARY KEY IDENTITY(1,1),
	nomeInstituicao VARCHAR(50) NOT NULL,
	numeroInstituicao VARCHAR(3) UNIQUE NOT NULL,
	enderecoInstituicao VARCHAR(256) NOT NULL
)

CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY IDENTITY(1,1),
	idTipoUsuario TINYINT FOREIGN KEY REFERENCES tipoUsuario(idTipoUsuario),
	idInstituicao SMALLINT FOREIGN KEY REFERENCES instituicao(idInstituicao),
	nomeUsuario VARCHAR(256) NOT NULL,
	rg CHAR(12) UNIQUE NOT NULL,
	email CHAR(256) UNIQUE NOT NULL,
	senha VARCHAR(256) NOT NULL
);
GO

CREATE TABLE imagem(
	idImagem INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario),
	binario VARBINARY(MAX) NOT NULL,
	mimeType VARCHAR(30) NOT NULL,
	nomeArquivo VARCHAR(250) NOT NULL
)

CREATE TABLE professor(
	idProfessor INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario),
	matricula VARCHAR(4) UNIQUE NOT NULL,  
)
GO

CREATE TABLE periodo(
	idPeriodo TINYINT PRIMARY KEY IDENTITY(1,1),
	nomePeriodo VARCHAR(20) UNIQUE NOT NULL,
)
GO

CREATE TABLE turma(
	idTurma TINYINT PRIMARY KEY IDENTITY(1,1),
	idPeriodo TINYINT FOREIGN KEY REFERENCES periodo(idPeriodo),
	nomeTurma VARCHAR(10) NOT NULL,
)
GO

CREATE TABLE aluno(
	idAluno SMALLINT PRIMARY KEY IDENTITY(1,1),
	idTurma TINYINT FOREIGN KEY REFERENCES turma(idTurma),
	idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario),
	matricula VARCHAR(6) UNIQUE NOT NULL,
)
GO

CREATE TABLE cracha(
	idCracha INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario),
	token VARCHAR(256) UNIQUE NOT NULL,
	ultimaAtualizacao DATETIME NOT NULL
)