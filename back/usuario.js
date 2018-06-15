// importa o usuarioDAO
var usuarioDAO = require('./query/usuarioDAO')

// função que executa o método contido em usuarioDAO, e a partir do resultado da
// consulta, retorna o json de resposta caso OK, ou uma mensagem de erro, caso NOK
var get = function (req, res) {
  var promise = usuarioDAO.findAll();

  promise.then(function(result) {
    res.json(result);
  }).catch(function(error) {
    res.status(500).send('internal server error');
  })
};

var checkLogin = function (req, res) {
  var userName = req.body.userName;
  var senha = req.body.senha;
  var promise = usuarioDAO.login(userName, senha);

  promise.then(function(result) {
    if (typeof result === null || typeof result === 'undefined' || result.length === 0 || result.length > 1) {
      res.json(false);
    } else {
      res.json(true);
    }
  }).catch(function(error) {
    res.status(500).send('internal server error');
  })
};

// torna public o método get
module.exports = {
  get: get,
  checkLogin: checkLogin
};
