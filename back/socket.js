var mensagem = require('./objetos/mensagemObj')
var grupo = require('./objetos/grupoObj')

var events = function(io){
  io.on('connection', socket => {
    console.log('New client connected')

    socket.on('Mensagem enviada', (msg) => {
      mensagem.enviaMsg(msg).then(function(result){
        console.log(msg);
        io.sockets.emit('Mensagem nova')
      });
    })

    // socket.on('Usuario logado', (usr) => {
    //   io.sockets.emit('change color', color)
    // })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

}

module.exports = {
  events: events
}
