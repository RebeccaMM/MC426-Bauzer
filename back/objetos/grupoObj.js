var JSONfn = require('json-fn');
var mensagem = require('./mensagemObj');
var usuario = require('./usuarioObj');
var grupoDAO = require('../query/grupoDAO');

// Objeto Grupo
function Grupo (id, inbox, nome, usuarioA, usuarioB){
	this.id = id;
	this.inbox = inbox;
	this.nome = nome;
	this.usuarioA = usuarioA;
	this.usuarioB = usuarioB;

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

	this.getNome = function(idUser){
		if(!this.inbox || this.usuarioA == null || this.usuarioB == null)
			return this.nome;

		if(idUser == this.usuarioA.id)
			return this.usuarioB.nome;
		if(idUser == this.usuarioB.id)
			return this.usuarioA.nome;

		return this.nome;
	}

	this.getUsuarioA = function(){
		return this.usuarioA;
	}

	this.getUsuarioB = function(){
		return this.usuarioB;
	}

	this.setInbox = function(inbox){
		this.inbox = inbox;
	}

	this.setNome = function(nome){
		this.nome = nome;
	}

	this.setUsuarioA = function(usuarioA){
		this.usuarioA = usuarioA;
	}

	this.setUsuarioB = function(usuarioB){
		this.usuarioB = usuarioB;
	}

	this.save = function(){

	}

	this.print = function(){
		console.log([this.id, this.inbox, this.nome, this.usuarioA, this.usuarioB].join(' | '));
	}
}

// Dado idUsuario, lista os grupos
var listUserGroups = function (req, res) {
	var idUsuario = req.body.idUsuario;
	var promise = grupoDAO.listUserGroups(idUsuario);

	promise.then(function(result){
		var grupos = {};

		result.forEach(function(g){
			if(grupos[g.g_id] === undefined){
				var ua = null;
				var ub = null;
				if(g.ua_id !== null)
					ua = new usuario.Usuario(g.ua_id, g.ua_login, '', g.ua_nome, g.ua_tipoUsuario);
				if(g.ub_id !== null)
					ub = new usuario.Usuario(g.ub_id, g.ub_login, '', g.ub_nome, g.ub_tipoUsuario);

				grupos[g.g_id] = new Grupo(g.g_id, g.g_inbox==0?false:true, g.g_nome, ua, ub);
			}

			if(g.m_id !== null){
				msg = new mensagem.Mensagem(g.m_id, g.m_idUsuario, g.m_idGrupo, g.m_mensagem);
				grupos[g.g_id].messages.push(msg);
			}
		});

		res.json(JSONfn.stringify(grupos));
	}).catch(function(error){
		console.log(error);
		res.status(500).send('internal server error');
	});
};

// Dado o idGrupo, retorna o grupo
var getGrupo = function(req, res){
	var idGrupo = req.body.idGrupo;
	var promise = grupoDAO.getGrupo(idGrupo);

	promise.then(function(result){
		res.json(result);
	}).catch(function(error){
		res.status(500).send('internal server error');
	});
};

var novoUsuarioPromise = function(idUser){
	return grupoDAO.criaInboxers(idUser);
}

// torna public o método get
module.exports = {
  listUserGroups: listUserGroups,
  getGrupo: getGrupo,
	novoUsuarioPromise: novoUsuarioPromise
}
