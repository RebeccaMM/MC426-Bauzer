var usuarioDAO = require('../query/usuarioDAO');

// Objeto usuario
function Usuario (id, login, senha, nome, tipoUsuario){
	this.id = id;
	this.login = login;
	this.senha = senha;
	this.nome = nome;
	this.tipoUsuario = tipoUsuario;

	this.getId = function(){
		return this.id;
	}

	this.getLogin = function(){
		return this.login;
	}

	this.getSenha = function(){
		return this.senha;
	}

	this.getNome = function(){
		return this.nome;
	}

	this.getTipoUsuario = function(){
		return this.tipoUsuario;
	}

	this.setLogin = function(login){
		this.login = login;
	}

	this.setSenha = function(senha){
		this.senha = senha;
	}

	this.setNome = function(nome){
		this.nome = nome;
	}

	this.setTipoUsuario = function(tipoUsuario){
		this.tipoUsuario = tipoUsuario;
	}

	this.save = function(){

	}

	this.print = function(){
		console.log([this.id, this.nome, this.login, this.tipoUsuario].join(' | '));
	}
}

// Lista todos os usuarios
var getAllUsers = function(req, res){
	var promise = usuarioDAO.findAll();

	promise.then(function(result){
		var allUsers = [];

		result.forEach(function(r){
			var u = new Usuario(r.id, r.login, r.senha, r.nome, r.tipoUsuario);
			allUsers.pushs(u);
		});

		res.json(allUsers);
	}).catch(function(error){
		res.status(500).send('internal server error');
	});
}

// Login
var checkLogin = function(req, res){
	console.log(req.session.user);
	if(JSON.stringify(req.body) === JSON.stringify({})){
		if(req.session.user !== undefined){
			res.json(u);
		}
		else{
			res.status(403).send('Usuario ou senha invalidos');
		}
		return;
	}

	var login = req.body.login;
	var senha = req.body.senha;
	var promise = usuarioDAO.login(login, senha);
	promise.then(function(result){
		if (typeof result === null || typeof result === 'undefined' || result.length === 0 || result.length > 1) {
			res.status(403).send('Usuario ou senha invalidos');
		}
		else{
			var u = new Usuario(result[0].id, result[0].login, result[0].senha, result[0].nome, result[0].tipoUsuario);
			res.json(JSON.stringify(u));
		}
	}).catch(function(error){
		req.session.user = undefined;
		res.status(500).send('internal server error');
	});
}

var getFullUser = function(req, res){
	var id = req.body.id;
	var promise = usuarioDAO.getFullUser(id);

	promise.then(function(result){
		var u = new Usuario(r.id, r.login, r.senha, r.nome, r.tipoUsuario);
		res.json(u);
	}).catch(function(error){
		res.status(500).send('internal server error');
	});
}

module.exports = {
	Usuario: Usuario,
	checkLogin: checkLogin
}
