var db = require('../db');
const format = require('string-format');

var getAllQuery = 'SELECT * FROM Interesse';

var insertInteresseQuery =
"INSERT INTO Interesse (nomeInteressado, email, telefone, idVaga) "+
"VALUES ('{0}', '{1}', '{2}', {3})";

var getInteressadosQuery = "SELECT * FROM interesse i LEFT JOIN vaga v ON i.idvaga = v.id WHERE v.idEmpresa = {0}";


var getAll = function() {
  return db.query(getAllQuery);
}

var addInteresse = function (interesse) {
  return db.query(format(insertInteresseQuery, interesse.nomeInteressado,
    interesse.email, interesse.telefone, interesse.idVaga));
}
var getInteressados = function (id) {
  return db.query(format(getInteressadosQuery, id));
}

module.exports = {
  getAll: getAll,
  addInteresse: addInteresse,
  getInteressados: getInteressados
}
