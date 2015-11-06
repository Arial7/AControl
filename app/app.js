var express = require('express');
var io = require('socket.io');
var serialPort = require('serialport');
var app = express();
var server;

var projectRoot = __dirname;

/**
 * This function sets up the basic HTTP server to respond to requests
 */
function initializeServer() {
    //set up the express server to use static dirs
    app.use('/css', express.static(projectRoot + '/client/css'));
    app.use('/js', express.static(projectRoot + '/client/js'));
    app.use('/img', express.static(projectRoot + '/client/img'));
    app.use('/fonts', express.static(projectRoot + '/client/fonts'));

    //send the page over, if the user requests a connection
    app.get('/', function (req, res) {
        res.sendFile('client/pages/main.html', {root : projectRoot});
    });

    //echo out the current port and address
    server = app.listen(3030, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Listening at http://%s:%s', host, port);
    });
}
/**
 * This function sets up the socket.io listeners for connecting, disconnecting etc.
 * TODO: log to the console with timestamps
 */
function setupSocketListeners() {
    //set up the io socket listeners
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
}
/**
 * This function scans for avaiable serial ports and logs them to the console
 * TODO: save the found ports somewhere
 * TODO: refresh the ports from time to time
 */
function scanSerialPorts() {
    //echo out all the serial ports that have been found
    serialPort.list(function(err, ports) {
        if (err !== undefined) {
            ports.forEach(function(port) {
                console.log("Port: " + port.comName);
            });
        }
    });
}

initializeServer();
setupSocketListeners();

scanSerialPorts();
