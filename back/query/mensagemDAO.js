var db = require('../db');
const format = require('string-format');

// declara os Selects em variáveis
var listAllGroupQuery = `SELECT * FROM Mensagem WHERE idGrupo = {0}`;
var insertMsgQuery = `INSERT INTO Mensagem(idUsuario, idGrupo, mensagem)
												VALUES ({0}, {1}, '{2}')`;

// declara a função que executa o select
var listAllGroup = function(idGrupo) {
	return db.query(format(listAllGroupQuery, idGrupo));
}

var insertMsg = function(idUsuario, idGrupo, mensagem){
	return db.query(format(insertMsgQuery, idUsuario, idGrupo, mensagem));
}

// Expõe o método para o módulo (analogia: tornar o método public)
module.exports = {
	listAllGroup: listAllGroup,
	insertMsg: insertMsg
}
