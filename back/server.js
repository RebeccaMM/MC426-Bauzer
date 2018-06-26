const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

var bodyParser = require('body-parser');
var router = require('./router');
var socket = require('./socket');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

socket.events(io);
router.defineRoutes(app);

// Configura porta da API. Acessar localhost:8081/pessoa vai te deixar visualizar o resultado.
server.listen(8081, "0.0.0.0", function () {

   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});
