var express = require('express');
var io = require('socket.io');
var serialPort = require('serialport');
var app = express();
var server;

var projectRoot = __dirname;

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
        getPortsResult = res;
        scanSerialPorts();
    });

    //echo out the current port and address
    server = app.listen(3030, function () {
        var host = server.address().address;
        var port = server.address().port;

        log('Listening at http://' + host + ':' + port);
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
        log('Connection with client established');

        socket.on('message', function(data) {
            data = JSON.parse(data);
            log(data);
            var ackToClient = "Server received message";
            //Send back an acknowledgement to the client
            socket.send(ackToClient);
        });

        socket.on('toggle message', function(data) {
            log("Received toggle message: " + data);
            socket.send("Toggled: " + data);
        });

        socket.on('disconnect', function(socket) {
            log('Client disconnected');
        });

        socket.on('connect port request', function(data) {
            log("Client wants to connect to port: " + data);
            //TODO: try to connect to the port instead of just sending true
            socket.emit('connect port result', true);
        });
    });
}

/**
 * Scan for avaiable serial ports and log them to the console
 * TODO: refresh the ports from time to time
 * @return false if no port has been found, else an array holding the ports
 */
function scanSerialPorts() {
    //echo out all the serial ports that have been found
    serialPort.list(function(err, ports, result) {
        //ports is undefined if no port has been found
        //TODO: improve this
        if (ports === undefined && err !== undefined) {
            log("No ports found");
            return false;
        }
        if (err === undefined) {
            log("Found the following ports:");
            var portString = new Array();
            ports.forEach(function(port) {
                log("\t " + port.comName, false);
                portString.push({"portName" : port.comName});
            });

            getPortsResult.send(data);

            return portString;
        }
        else {
            error("An error occured while loading available ports: " + err.toString());
        }
    });
}

/**
 * Wrapper for console.log() that adds a timestamp
 * @param message - the message to log
 * @param timestamp - optional, if true, the timestamp will be added
 */
function log(message) {
    var timestamp = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
    if (timestamp)
        console.log(getCurrentTime() + message);
    else
        console.log(message);
}

/**
 * Wrapper for console.error() that adds a timestamp
 */
function error(message) {
    console.error(getCurrentTime() + message);
}

/**
 * Function to get the current timestamp
 * @return String of [HOURS:MINUTES:SECONDS]
 * TODO: add 0 before times if they only have 1 digit
 */
function getCurrentTime() {
    var date = new Date();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var mins = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getHours();
    var secs = date.getSeconds()  < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return "[" + hours + ":" + mins + ":" + secs + "]";
}


//ENTRY POINT

initializeServer();
setupSocketListeners();
