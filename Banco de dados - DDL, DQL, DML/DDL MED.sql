--DDL
CREATE DATABASE MedGroup

USE MedGroup

CREATE TABLE TipoUsuario (

IdTipo INT PRIMARY KEY IDENTITY,
Nome   VARCHAR(200) NOT NULL

);

CREATE TABLE Usuario (

IdTipo      INT FOREIGN KEY REFERENCES TipoUsuario (IdTipo),
IdUsuario   INT PRIMARY KEY IDENTITY, 
Email       VARCHAR(200) NOT NULL,
Senha		VARCHAR(200) NOT NULL
					
);

CREATE TABLE Situacao (

IdSituacao   INT PRIMARY KEY IDENTITY, 
NomeSituacao VARCHAR(100) NOT NULL

);

CREATE TABLE Especializacao (

IdEspecializacao    INT PRIMARY KEY IDENTITY,
NomeEspecializacao  VARCHAR(100) NOT NULL

);

CREATE TABLE Medico (

IdMedico           INT PRIMARY KEY IDENTITY,
IdClinica		   INT FOREIGN KEY REFERENCES Clinica (IdClinica),
IdEspecializacao   INT FOREIGN KEY REFERENCES Especializacao(IdEspecializacao),
NomeMedico         VARCHAR(200) NOT NULL,
CRM				   CHAR(6) NOT NULL

)

CREATE TABLE Clinica (

IdCLinica      INT PRIMARY KEY IDENTITY, 
Endereco		VARCHAR(200) NOT NULL,
NomeFantasia	VARCHAR(100),
RazaoSocial		VARCHAR(100) NOT NULL

)

CREATE TABLE Cliente (

IdUsuario		INT FOREIGN KEY REFERENCES Usuario (IdUsuario),
IdCliente		INT PRIMARY KEY IDENTITY,
NomeCliente		VARCHAR (200),
RG				CHAR(9) NOT NULL,
CPF				CHAR(11) NOT NULL,
Endereco		VARCHAR(200) NOT NULL,
DataNascimento  DATE NOT NULL,
TelefoneCliente INT NOT NULL

)


CREATE TABLE Consulta (

IdConsulta		INT PRIMARY KEY IDENTITY,
IdCliente		INT FOREIGN KEY REFERENCES Cliente (IdCliente),
IdMedico		INT FOREIGN KEY REFERENCES Medico (IdMedico),
IdSituacao		INT FOREIGN KEY REFERENCES Situacao (IdSituacao),
SobreConsulta	VARCHAR(200),
DataConsulta	DATE

)