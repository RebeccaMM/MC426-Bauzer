CREATE TABLE Usuario (
  id int AUTO_INCREMENT,
  login varchar(30) not null,
  senha varchar(20) not null,
  nome varchar(30) not null,
  tipoUsuario int not null,
  primary key (id)
);

CREATE TABLE Vaga (
  id int AUTO_INCREMENT,
  titulo varchar(20) not null,
  descricao varchar(255),
  idEmpresa int,
  primary key (id),
  foreign key (idEmpresa) references Usuario(id)
);

CREATE TABLE Interesse (
  id int AUTO_INCREMENT,
  nomeInteressado varchar(30) not null,
  email varchar(80) not null,
  telefone varchar(12) not null,
  idVaga int not null,
  primary key (id),
  foreign key (idVaga) references Vaga(id)
);

CREATE TABLE Grupo (
  id int AUTO_INCREMENT,
  inbox boolean not null,
  nome varchar(30),
  idUsuarioA int not null, -- Só para manter um registro de quem é o "Admin" da conversa. Nada a ver com a listagem na lista de contatos
  idUsuarioB int, -- Mesma coisa aqui
  primary key (id),
  foreign key (idUsuarioA) references Usuario(id),
  foreign key (idUsuarioB) references Usuario(id)
);

CREATE TABLE Mensagem (
  id int AUTO_INCREMENT,
  idUsuario int not null,
  idGrupo int not null,
  mensagem text not null,
  primary key (id),
  foreign key (idUsuario) references Usuario(id),
  foreign key (idGrupo) references Grupo(id)
);

CREATE TABLE Usuario_Grupo (
  idGrupo int not null,
  idUsuario int not null,
  foreign key (idGrupo) references Grupo(id),
  foreign key (idUsuario) references Usuario(id)
);
