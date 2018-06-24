var db = require('../db');
const format = require('string-format');

// declara os Selects em variáveis
var listUserGroupsQuery = `SELECT g.id as g_id,
													   g.inbox as g_inbox,
													   g.nome as g_nome,
													   g.idUsuarioA as g_idUsuarioA,
													   g.idUsuarioB as g_idUsuarioB,
													   m.id as m_id,
													   m.idUsuario as m_idUsuario,
													   m.idGrupo as m_idGrupo,
													   m.mensagem as m_mensagem
												FROM Grupo as g
													left join Mensagem as m on m.idGrupo = g.id
												WHERE idUsuarioA = {0} OR idUsuarioB = {0}`;

var getGrupoQuery = `SELECT * FROM Grupo WHERE id = {0}`;

// declara a função que executa o select
var listUserGroups = function(idUser) {
	return db.query(format(listUserGroupsQuery, idUser));
}

var getGrupo = function(idGrupo) {
	return db.query(format(getGrupo, idGrupo));
}

// Expõe o método para o módulo (analogia: tornar o método public)
module.exports = {
	listUserGroups: listUserGroups,
	getGrupo: getGrupo
}
