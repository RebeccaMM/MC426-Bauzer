var usuario = require('./usuario');
var vaga = require('./vaga');
var interesse = require('./interesse');
var grupo = require('./objetos/grupoObj');
var mensagem = require('./objetos/mensagemObj');
var usuarioObj = require('./objetos/usuarioObj');

// Define os endpoints, chamando as funções declaradas nos controllers
var defineRoutes = function (app) {
	app.get('/usuarios', usuario.get);
	app.post('/usuario', usuario.getUserName);
	app.post('/usuario/login', usuarioObj.checkLogin);
	app.get('/vagas', vaga.get);
	app.get('/vaga/empresa/:idEmpresa', vaga.getPorEmpresa);
	app.post('/vaga/addVaga', vaga.post);
	app.post('/grupos', grupo.listUserGroups);
	app.post('/mensagem', mensagem.insertMsg);
	app.post('/usuario/novo', usuarioObj.insertUser);
	app.post('/interesse', interesse.novoInteresse);
	app.get('/interesse/getInteressados', interesse.getInteressados);
}

module.exports = {
	defineRoutes: defineRoutes
}
