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

var post = function (req, res) {
  var tituloVaga = req.body.vaga;
  var promise = vagaDAO.addVaga(vaga);

  promise.then(function(result) {
    if (typeof result === null || typeof result === 'undefined') {
      res.status(403).send('vaga não cadastrada');
    } else {
      res.status(200).send('top');
    }
  }).catch(function(error) {
    res.status(403).send('forbidden');
  });
};

// torna public o método get
module.exports = {
  get: get,
  getPorEmpresa: getPorEmpresa,
  post: post,
};
