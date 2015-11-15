var express       = require('express');
var io            = require('socket.io');
var serialmanager = require('./modules/serialmanager.js');
var log           = require('./modules/log.js');
var settings      = require('./modules/settings.js');

var app           = express();
var server;

var projectRoot   = __dirname;

var getPortsResult; //Holds the HTTP result for getting ports.

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
    //TODO: read all of the ports
    app.get('/getPorts', function (req, res) {
        serialmanager.getSerialPortsAvailable(res);
        //getPortsResult = res;
        //scanSerialPorts();
    });

    //echo out the current port and address
    server = app.listen(settings.get().port, function () {
        var port = server.address().port;

        log.log('Listening at port ' + port);
    });
}

/**
 * This function sets up the socket.io listeners for connecting,
 * disconnecting etc.
 */
function setupSocketListeners() {
    //set up the io socket listeners
    io = io.listen(server);
    io.sockets.on('connection', function(socket) {

        //Send the data to the client -> this will trigger the message event at the client
        socket.send("Connection with server established");
        log.log('Connection with client established');

        socket.on('message', function(data) {
            data = JSON.parse(data);
            log.log(data);
            var ackToClient = "Server received message";
            //Send back an acknowledgement to the client
            socket.send(ackToClient);
        });

        socket.on('toggle message', function(data) {
            log.log("Received toggle message: " + data);
            socket.send("Toggled: " + data);
        });

        socket.on('disconnect', function(socket) {
            log.log('Client disconnected');
        });

        socket.on('connect port request', function(data) {
            log.log("Client wants to connect to port: " + data);
            serialmanager.connectToPort(data, socket);
        });
    });
}


//ENTRY POINT
settings.load();
initializeServer();
setupSocketListeners();
