var mensagem = require('./mensagemTO.js');
var grupoDAO = require('../query/grupoDAO');

function Grupo (id, inbox, nome, idUsuarioA, idUsuarioB){
	this.id = id;
	this.inbox = inbox;
	this.nome = nome;
	this.idUsuarioA = idUsuarioA;
	this.idUsuarioB = idUsuarioB;

	this.messages = [];

	this.updateMessages = function(){
		var p = mensagemTO.getMsgsFromGroupPromise(this.id);
		p.then(function(result){
			this.messages = mensagemTO.queryToList(result);
		});
	}

	this.setMessages = function(messages){
		this.messages = messages;
	}

	this.getMessages = function(){
		return this.messages;
	}

	this.getId = function(){
		return this.id;
	}

	this.getInbox = function(){
		return this.inbox;
	}

	this.getNome = function(){
		return this.nome;
	}

	this.getIdUsuarioA = function(){
		return this.idUsuarioA;
	}

	this.getIdUsuarioB = function(){
		return this.idUsuarioB;
	}

	this.setInbox = function(inbox){
		this.inbox = inbox;
	}

	this.setNome = function(nome){
		this.nome = nome;
	}

	this.setIdUsuarioA = function(idUsuarioA){
		this.idUsuarioA = idUsuarioA;
	}

	this.setIdUsuarioB = function(idUsuarioB){
		this.idUsuarioB = idUsuarioB;
	}

	this.save = function(){

	}

	this.print = function(){
		console.log([this.id, this.inbox, this.nome, this.idUsuarioA, this.idUsuarioB].join(' | '));
	}
}

var listUserGroups = function (req, res) {
	var idUsuario = req.body.idUsuario;
	var promise = grupoDAO.listUserGroups(idUsuario);

	promise.then(function(result){
		var grupos = {};
		result.forEach(function(g){
			grupos[g.g_id] = grupos[g.g_id] || new Grupo(g.g_id, g.g_inbox==0?false:true, g.g_nome, g.g_idUsuarioA, g.g_idUsuarioB);
			msg = new mensagem.Mensagem(g.m_id, g.m_idUsuario, g.m_idGrupo, g.m_mensagem);
			grupos[g.g_id].messages.push(msg);
		});

		res.json(grupos);
	}).catch(function(error){
		console.log(error);
		res.status(500).send('internal server error');
	});
};

var getGrupo = function(req, res){
	var idGrupo = req.body.idGrupo;
	var promise = grupoDAO.getGrupo(idGrupo);

	promise.then(function(result){
		res.json(result);
	}).catch(function(error){
		res.status(500).send('internal server error');
	});
};

// torna public o método get
module.exports = {
  listUserGroups: listUserGroups,
  getGrupo: getGrupo
};
