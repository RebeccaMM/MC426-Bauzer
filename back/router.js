var pessoa = require('./usuario')


// Define os endpoints, chamando as funções declaradas nos controllers
var defineRoutes = function (app) {
	app.get('/usuario', usuario.get);
	app.post('/usuario/login', usuario.checkLogin);

}

module.exports = {
	defineRoutes: defineRoutes
}
