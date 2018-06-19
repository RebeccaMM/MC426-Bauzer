var vagaDAO = require('./query/vagaDAO')

var get = function (req, res) {
  var promise = vagaDAO.getAll();

  promise.then(function(result) {
    res.json(result);
  }).catch(function(error) {
    res.status(500).send('Internal server error');
  })
};

var getPorEmpresa = function (req, res) {
  var idEmpresa = req.params.idEmpresa;
  var promise = vagaDAO.getPorEmpresa(idEmpresa);

  promise.then(function(result) {
    res.json(result);
  }).catch(function(error) {
    res.status(500).send('Internal server error');
  })
};

// torna public o método get
module.exports = {
  get: get,
  getPorEmpresa: getPorEmpresa
};
