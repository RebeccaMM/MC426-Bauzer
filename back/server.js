var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router');

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
app.use(session({secret: "Hives123$", resave: true, saveUninitialized: true,  cookie: { maxAge: 60000 } }));

router.defineRoutes(app);

// Configura porta da API. Acessar localhost:8081/pessoa vai te deixar visualizar o resultado.
var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
