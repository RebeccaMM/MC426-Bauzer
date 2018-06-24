var mensagemDAO = require('../query/mensagemDAO');

// Objeto Mensagem
function Mensagem(id, idUsuario, idGrupo, mensagem){
	this.id = id;
	this.idUsuario = idUsuario;
	this.idGrupo = idGrupo;
	this.mensagem = mensagem;

	this.getId = function(){
		return this.id;
	}

	this.getIdUsuario = function(){
		return this.idUsuario;
	}

	this.getIdGrupo = function(){
		return this.idGrupo;
	}

	this.getMensagem = function(){
		return this.mensagem;
	}

	this.setIdUsuario = function(idUsuario){
		this.idUsuario = idUsuario;
	}

	this.setIdGrupo = function(idGrupo){
		this.idGrupo = idGrupo;
	}

	this.setMensagem = function(mensagem){
		this.mensagem = mensagem;
	}

	this.save = function(){

	}

	this.print = function(){
		console.log([this.id, this.idUsuario, this.idGrupo, this.mensagem].join(' | '));
	}
}

// Converte Query em uma lista de mensagens
var queryToList = function(result){
	var mensagens = [];

	result.forEach(function(m){
		var msg = new Mensagem(m.id, m.idUsuario, m.idGrupo, m.mensagem);
		mensagens.push(msg);
	});

	return mensagens;
}

// Mensagens de um Grupo
var getMsgsFromGroupPromise = function(idGrupo){
	return mensagemDAO.getMsgsFromGroup(idGrupo);
}

// Envia Mensagem
var insertMsg = function(req, res){
	var idUsuario = req.body.idUsuario;
	var idGrupo = req.body.idGrupo;
	var mensagem = req.body.mensagem;

	var promise = mensagemDAO.insertMsg(idUsuario, idGrupo, mensagem);
	promise.then(function(result){
		res.status(200).send('Mensagem enviada');
	}).catch(function(error){
		res.status(500).send('internal server error');
	});
}

var enviaMsg = function(msg){
	return promise = mensagemDAO.insertMsg(msg.idUsuario, msg.idGrupo, msg.mensagem);
}

// Mensagens de um grupo (request)
var getMsgsFromGroup = function(req, res){
	var idGrupo = req.body.idGrupo;
	var promise = this.getMsgsFromGroupPromise(idGrupo);

	promise.then(function(result){
		var mensagens = this.queryToList(result);

		res.json(mensagens);
	}).catch(function(error){
		res.status(500).send('internal server error');
	});
}

// Expõe o método para o módulo (analogia: tornar o método public)
module.exports = {
	Mensagem: Mensagem,
	insertMsg: insertMsg,
	enviaMsg: enviaMsg
}
