var db = require('../db');
const format = require('string-format');

// declara os Selects em variáveis
var getAllQuery = 'SELECT * FROM Vaga';
var getPorEmpresaQuery = "SELECT * FROM Vaga where idEmpresa = '{0}'"

// declara a função que executa o select
var getAll = function() {
  return db.query(getAllQuery);
}

var getPorEmpresa = function (idEmpresa) {
  return db.query(format(getPorEmpresaQuery, idEmpresa));
}

// Expõe o método para o módulo (analogia: tornar o método public)
module.exports = {
  getAll: getAll,
  getPorEmpresa: getPorEmpresa
}
