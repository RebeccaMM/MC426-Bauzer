var db = require('../db');
const format = require('string-format');

var getAllQuery = 'SELECT * FROM Interesse';

var insertInteresseQuery =
"INSERT INTO Interesse (nomeInteressado, email, telefone, idVaga) "+
"VALUES ('{0}', '{1}', '{2}', {3})"

var getAll = function() {
  return db.query(getAllQuery);
}

var addInteresse = function (interesse) {
  return db.query(format(insertInteresseQuery, interesse.nomeInteressado,
    interesse.email, interesse.telefone, interesse.idVaga));
}

module.exports = {
  getAll: getAll,
  addInteresse: addInteresse
}
