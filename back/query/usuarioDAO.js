var db = require('../db');
const format = require('string-format');

// declara os Selects em variáveis
var findAllQuery = 'SELECT * FROM Usuario';
var checkLoginQuery = "SELECT * FROM Usuario where login = '{0}' and senha = '{1}'";
var getUserNameQuery = "SELECT nome FROM Usuario where id = {0}";

var getFullUserQuery = "SELECT * FROM Usuario where id = {0}";
var insertUserQuery = `INSERT INTO Usuario(login, senha, nome, tipoUsuario) VALUES('{0}', '{1}', '{2}', {3})`;
var getLastIDInsertedQUery = `SELECT LAST_INSERT_ID() as id`;

// declara a função que executa o select
var findAll = function() {
	return db.query(findAllQuery);
}

// declara a função que executa o select
var getUserName = function(id) {
	return db.query(format(getUserNameQuery, id));
}

var login = function (login, senha) {
	return db.query(format(checkLoginQuery, login, senha));
}

var getFullUser = function(id) {
	return db.query(format(getFullUserQuery, id));
}

var insertUser = function(login, senha, nome, tipoUsuario){
	return db.query(format(insertUserQuery, login, senha, nome, tipoUsuario))
	.then(result => {
		return db.query(getLastIDInsertedQUery);
	});
}

// Expõe o método para o módulo (analogia: tornar o método public)
module.exports = {
	findAll: findAll,
	login: login,
	getUserName: getUserName,
	getFullUser: getFullUser,
	insertUser: insertUser
}
