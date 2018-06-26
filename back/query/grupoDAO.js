var db = require('../db');
const format = require('string-format');

// declara os Selects em variáveis
var listUserGroupsQuery =
`SELECT g.id as g_id,
	   g.inbox as g_inbox,
	   g.nome as g_nome,
	   g.idUsuarioA as g_idUsuarioA,
	   g.idUsuarioB as g_idUsuarioB,
	   m.id as m_id,
	   m.idUsuario as m_idUsuario,
	   m.idGrupo as m_idGrupo,
	   m.mensagem as m_mensagem,
	   ua.id as ua_id,
	   ua.login as ua_login,
	   ua.nome as ua_nome,
	   ua.tipoUsuario as ua_tipoUsuario,
	   ub.id as ub_id,
	   ub.login as ub_login,
	   ub.nome as ub_nome,
	   ub.tipoUsuario as ub_tipoUsuario
FROM Usuario_Grupo as ug
	left join Grupo as g on ug.idGrupo = g.id
	left join Mensagem as m on g.id = m.idGrupo
	left join Usuario as ua on g.idUsuarioA = ua.id
	left join Usuario as ub on g.idUsuarioB = ub.id
WHERE ug.idUsuario = {0}`;

var getGrupoQuery = `SELECT * FROM Grupo WHERE id = {0}`;

var criaInboxersQuery =
`INSERT INTO Grupo(inbox, nome, idUsuarioA, idUsuarioB)
SELECT 1 as inbox, '' as nome, id as idUsuarioA, {0} as idUsuarioB
FROM Usuario
WHERE id <> {0}`;

var insereRelacoesQuery =
`INSERT INTO Usuario_Grupo(idGrupo, idUsuario)
SELECT id as idGrupo, idUsuario{0} as idUsuario
FROM Grupo
WHERE idUsuarioB = {1}`;

// declara a função que executa o select
var listUserGroups = function(idUser) {
	return db.query(format(listUserGroupsQuery, idUser));
}

var getGrupo = function(idGrupo) {
	return db.query(format(getGrupoQuery, idGrupo));
}

var criaInboxers = function(idUser){
	return db.query(format(criaInboxersQuery, idUser))
	.then(result => {
		return db.query(format(insereRelacoesQuery, 'A', idUser))
		.then(result => {
			return db.query(format(insereRelacoesQuery, 'B', idUser));
		})
	});
}

// Expõe o método para o módulo (analogia: tornar o método public)
module.exports = {
	listUserGroups: listUserGroups,
	getGrupo: getGrupo,
	criaInboxers: criaInboxers
}
