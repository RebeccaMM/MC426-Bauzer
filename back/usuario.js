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

var getUserName = function (req, res) {
  var id = req.body.id;
  var promise = usuarioDAO.getUserName(id);

  promise.then(function(result) {
    res.json(result);
  }).catch(function(error) {
    res.status(403).send('forbidden');
  })
};

// Uso o meu login hehe
/*var checkLogin = function (req, res) {
  var username = req.body.username;
  var senha = req.body.senha;
  var promise = usuarioDAO.login(username, senha);

  promise.then(function(result) {
    if (typeof result === null || typeof result === 'undefined' || result.length === 0 || result.length > 1) {
      res.status(403).send('Usuario ou senha invalidos');
    } else {
      res.status(200).send('top');
    }
  }).catch(function(error) {
    res.status(500).send('internal server error');
  });
};*/

// torna public o método get
module.exports = {
  get: get,
  // checkLogin: checkLogin,
  getUserName: getUserName
};
