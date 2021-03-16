--DML

USE MedGroup

INSERT INTO TipoUsuario 
VALUES ('ADM'),
       ('Médico'),
	   ('Cliente')


INSERT INTO Usuario (IdTipo, Email, Senha)
VALUES			    (3, 'joao@hotmail.com','joao123'),
					(2, 'luiza@gmail.com', 'luiza43'),
					(2, 'fernando@icloud.com', 'FernadoMedico1')


INSERT INTO Situacao 
VALUES      ('Completa'),
			('Agendada'),
            ('Cancelada')


INSERT INTO Especializacao
VALUES		('Acupuntura'),
			('Anestesiologia'),
			('Angiologia'),
			('Cardiologia'),
			('Cirurgia Cardiovascular'),
			('Cirurgia da Mão'),
			('Cirurgia do Aparelho Digestivo'),
			('Cirurgia Geral'),
			('Cirurgia Pediátrica'),
			('Cirurgia Plástica'),
			('Cirurgia Torácica'),
			('Cirurgia Vascular'),
			('Dermatologia'),
			('Radioterapia'),
			('Urologia'),
			('Pediatria'),
			('Psiquiatria')


INSERT INTO Clinica (Endereco, NomeFantasia, RazaoSocial)
VALUES              ('Rua Rodolfo BBB, 21 Vila Matilde', 'MedClinica', 'Clínica Médica Med LTDA')


INSERT INTO Medico (IdEspecializacao, NomeMedico, IdClinica, CRM)
VALUES             (4, 'Dr. Fernando',1, '9999SP'),
				   (9, 'Dra. Luiza',1, '5555SP')


INSERT INTO Cliente (IdUsuario, NomeCliente, RG, CPF, Endereco, DataNascimento, TelefoneCliente)
VALUES              (1,	'João Silva Santos', '555555555', '44444444444', 'Rua Piauí 69 Osasco',	'19801025', 1140028922)


INSERT INTO Consulta (IdMedico, IdCliente, IdSituacao, SobreConsulta, DataConsulta)
VALUES				 (2, 1, 2, 'Dor de cabeça forte', '20200630')