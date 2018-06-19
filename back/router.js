var usuario = require('./usuario')
var vaga = require('./vaga')

// Define os endpoints, chamando as funções declaradas nos controllers
var defineRoutes = function (app) {
	app.get('/usuario', usuario.get);
	app.post('/usuario/login', usuario.checkLogin);
	app.get('/vaga', vaga.get);
	app.get('/vaga/empresa/:idEmpresa', vaga.getPorEmpresa);
	app.post('/vaga/addVaga', vaga.post);
}

module.exports = {
	defineRoutes: defineRoutes
}
