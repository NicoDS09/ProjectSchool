var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter.js').router;

var server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/AstroBlog/', apiRouter);

server.listen(3000, function () {
    console.log('Server en écoute :)');
});
