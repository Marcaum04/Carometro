--USE CAROMETRO
--GO

INSERT INTO tipoUsuario(nomeTipoUsuario)
VALUES
	('Administrador'),
	('Aluno'),
	('Professor')
GO
--SELECT * FROM tipoUsuario
--GO

INSERT INTO instituicao(nomeInstituicao, numeroInstituicao, enderecoInstituicao)
VALUES
	('SESI', '081', 'Av. Sen. Roberto Símonsen, 550 - Jardim Imperador, Suzano - SP, 08673-270'),
	('SESI', '414', 'R. Carlos Weber, 835 - Vila Leopoldina, São Paulo - SP, 05303-902'),
	('SESI', '032', 'R. Catumbi, nº 318 - Belenzinho, São Paulo - SP, 03021-000'),
	('SESI', '175', 'R. Guararapes, 26 - Jardim Perracini, Poá - SP'),
	('SESI', '267', 'Av. Professor Engenheiro Ardevan Machado, 119 - Vila Carmosina, São Paulo - SP, 08295-003')
GO
--SELECT * FROM instituicao
--GO

INSERT INTO usuario(idInstituicao, idTipoUsuario, nomeUsuario, rg, email, senha)
VALUES
	('1','1', 'admteste', '12.345.678-9', 'adm@email.com', 'adm123'),
	('1', '2', 'Marcos', '23.456.789-0', 'marcos@email.com', 'marcos123'),
	('1', '2', 'Ricardo', '24.456.789-0', 'ricardo@email.com', 'ricardo123'),
	('1', '2', 'Yuri', '25.456.789-0', 'yuri@email.com', 'yuri123'),
	('1', '2', 'Angelo', '26.456.789-0', 'angelo@email.com', 'angelo123'),
	('1', '2', 'Guilherme', '27.456.789-0', 'guilherme@email.com', 'guilherme123'),
	('1', '2', 'William', '28.456.789-0', 'William@email.com', 'william123'),
	('1', '3', 'Saulove', '34.567.890-1', 'saulindo@email.com', 'saulo123'),
	('1', '3', 'Priscila', '35.567.890-1', 'priscila@email.com', 'priscila123')
GO
--SELECT * FROM usuario
--GO

INSERT INTO professor(idUsuario, matricula)
VALUES
	('8', '2345'),
	('9', '4237')
GO
--SELECT * FROM professor
--GO

INSERT INTO periodo(nomePeriodo)
VALUES
	('Manhã'),
	('Tarde')
GO
--SELECT * FROM periodo
--GO

INSERT INTO turma(idPeriodo, nomeTurma)
VALUES
	('1', '1°Ano'),
	('2', '1°Ano'),
	('1', '2°Ano'),
	('2', '2°Ano'),
	('1', '3°Ano'),
	('2', '3°Ano')
GO
--SELECT * FROM turma
--GO

INSERT INTO aluno(idTurma, idUsuario, matricula)
VALUES
	('6', '2', '112233'),
	('5', '3', '221133'),
	('4', '4', '331122'),
	('3', '5', '223311'),
	('2', '6', '332211'),
	('1', '7', '113322')
GO
--SELECT * FROM aluno
--GO

INSERT INTO cracha(idUsuario, token, ultimaAtualizacao)
VALUES
	('2', '423248732442343', ''),
	('3', '342542543252345', ''),
	('4', '435345436546543', ''),
	('5', '345435234523454', ''),
	('6', '234675657435543', ''),
	('7', '234547687658456', ''),
	('8', '234554767586744', ''),
	('9', '412354356457564', '')
GO
--SELECT * FROM cracha
--GO

--SELECT * FROM imagem