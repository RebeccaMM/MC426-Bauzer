var usuario = require('./usuario')
var vaga = require('./vaga')

// Define os endpoints, chamando as funções declaradas nos controllers
var defineRoutes = function (app) {
	app.get('/usuarios', usuario.get);
	app.post('/usuario', usuario.getUserName);
	app.post('/usuario/login', usuario.checkLogin);
	app.get('/vagas', vaga.get);
	app.get('/vagas/empresa/:idEmpresa', vaga.getPorEmpresa);
}

module.exports = {
	defineRoutes: defineRoutes
}
