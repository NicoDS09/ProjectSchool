var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter.js').router;

var server = express();

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/AstroBlog/', apiRouter);

server.listen(3000, function () {
    console.log('Server en écoute :)');
});
