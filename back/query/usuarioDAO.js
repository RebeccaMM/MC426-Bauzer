var db = require('../db')

// declara os Selects em variáveis
var findAllQuery = 'SELECT * FROM Usuario';
var checkLoginQuery = "SELECT * FROM Usuario where login = '{0}' and senha = '{1}'"

// declara a função que executa o select
var findAll = function() {
  return db.query(findAllQuery);
}

var login = function (login, senha) {
  return db.query(checkLoginQuery);
}

// Expõe o método para o módulo (analogia: tornar o método public)
module.exports = {
  findAll: findAll,
  login: login
}
