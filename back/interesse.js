var interesseDAO = require('./query/interesseDAO')

var get = function (req, res) {
  var promise = interesseDAO.getAll();

  promise.then(function(result) {
    res.json(result);
  }).catch(function(error) {
    res.status(500).send('Internal server error');
  })
};

var novoInteresse = function (req, res) {
  var interesse = req.body.interesse;
  var promise = interesseDAO.addInteresse(interesse);

  promise.then(function(result) {
    if (typeof result === null || typeof result === 'undefined') {
      res.status(403).send('Forbidden');
    } else {
      res.status(200).send('top');
    }
  }).catch(function(error) {
    res.status(500).send('unexpected error');
  });
};

module.exports = {
  get: get,
  novoInteresse: novoInteresse
};
