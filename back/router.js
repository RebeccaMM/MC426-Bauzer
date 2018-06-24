var usuario = require('./usuario');
var vaga = require('./vaga');
var grupo = require('./objetos/grupoTO');
var mensagem = require('./objetos/mensagemTO');
var usuarioTO = require('./objetos/usuarioTO');

// Define os endpoints, chamando as funções declaradas nos controllers
var defineRoutes = function (app) {
	app.get('/usuarios', usuario.get);
	app.post('/usuario', usuario.getUserName);
	app.post('/usuario/login', usuarioTO.checkLogin);
	app.get('/vagas', vaga.get);
	app.get('/vaga/empresa/:idEmpresa', vaga.getPorEmpresa);
	app.post('/vaga/addVaga', vaga.post);
	app.post('/grupos', grupo.listUserGroups);
	app.post('/mensagem', mensagem.insertMsg);
}

module.exports = {
	defineRoutes: defineRoutes
}
