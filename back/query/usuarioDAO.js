var db = require('../db');
const format = require('string-format');

// declara os Selects em variáveis
var findAllQuery = 'SELECT * FROM Usuario';
var checkLoginQuery = "SELECT * FROM Usuario where login = '{0}' and senha = '{1}'"
var getUserNameQuery = "SELECT nome FROM Usuario where id = '{0}'";

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

// Expõe o método para o módulo (analogia: tornar o método public)
module.exports = {
  findAll: findAll,
  login: login,
  getUserName: getUserName
}
