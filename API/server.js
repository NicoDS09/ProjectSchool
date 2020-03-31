var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter.js').router;
var cors = require('cors');
var server = require('express')();
var http = require('http').Server(server);
var io = require('socket.io')(http);
server.use(cors());

io.on('connection', function (socket) {
    console.log('im socket');
    socket.join('some room');
    socket.join('commentaires');
})


server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/AstroBlog/', apiRouter);

http.listen(3000, function () {
    console.log('Server en écoute :)');
});

exports.callmessage = function () {
    io.to('some room').emit('test event', 'test');
}

exports.callcommentaire = function () {
    io.to('commentaires').emit('commentaires', 'commentaires');
}