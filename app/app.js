var express = require('express');
var io = require('socket.io');
var serialPort = require('serialport');
var app = express();

var projectRoot = __dirname;

//set up the express server to use static dirs
app.use('/css', express.static(projectRoot + '/client/css'));
app.use('/js', express.static(projectRoot + '/client/js'));
app.use('/img', express.static(projectRoot + '/client/img'));

//send the page over, if the user requests a connection
app.get('/', function (req, res) {
    res.sendFile('client/pages/main.html', {root : projectRoot});
});


var server = app.listen(3030, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});

serialPort.list(function(err, ports) {
    ports.forEach(function(port) {
        console.log("Port: " + port.comName);
    });
});

io = io.listen(server);

io.sockets.on('connection', function(socket) {
    var msgToClient = "Connection with server established";
    //Send the data to the client -> this will trigger the message event at the client
    socket.send(msgToClient);
    console.log('Socket.io : Connection with client established');

    socket.on('message', function(data) {
        data = JSON.parse(data);
        console.log(data);
        var ackToClient = "Server received message";
        //Send back an acknowledgement to the client
        socket.send(ackToClient);
    });

    socket.on('toggle message', function(data) {
        console.log("Socket.io : received toggle message: " + data);
        socket.send("Toggled: " + data);
    });

    socket.on('disconnect', function(socket) {
        console.log('Socket.io : Client disconnected');
    });
});
