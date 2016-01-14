var express       = require('express');
var io            = require('socket.io');
var args          = require('command-line-args');
var SerialManager = require('./modules/serialmanager.js');
var log           = require('./modules/log.js');
var settings      = require('./modules/settings.js');
var planloader    = require('./modules/planloader.js');
var app           = express();
var server;

var serialManager = new SerialManager();

var projectRoot   = __dirname;

var cliOptions = args([
    {name : 'simulate', alias : 's', type : Boolean}
]);

var commandlineargs = cliOptions.parse();


/**
 * This function sets up the basic HTTP server to respond to requests
 */
function initializeServer() {
    if (commandlineargs.simulate) {
        log.log("Starting server in simulation mode");
    }
    //set up the express server to use static dirs
    app.use('/css', express.static(projectRoot + '/client/css'));
    app.use('/js', express.static(projectRoot + '/client/js'));
    app.use('/img', express.static(projectRoot + '/client/img'));
    app.use('/fonts', express.static(projectRoot + '/client/fonts'));

    //send the page over, if the user requests a connection
    app.get('/', function (req, res) {
        res.sendFile('client/pages/main.html', {root : projectRoot});
    });
    //send the editor page
    app.get('/editor', function (req, res) {
        res.sendFile('client/pages/editor.html', {root : __dirname});
    });
    app.get('/getPorts', function (req, res) {
        //if simulate-actions is set, send a fake-port
        if (commandlineargs.simulate) {
            res.send([{"portName" : "/dev/null"}]);
        }
        else {
            serialManager.getAvailablePorts(function(data) {
                res.send(data);
            });
        }
    });


    //echo out the current port and address
    server = app.listen(settings.get().port, function () {
        var port = server.address().port;

        log.log('Listening at port ' + port);
    });

    process.on('SIGTERM', function () {
        serialManager.once('disconnected', function() {
            log.log("Exiting now...");
            process.exit(0);
        });
        serialManager.disconnect();
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
        serialManager.on('connectedToPort', function(data) {
            socket.emit('connect port result', data);
        });
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
        socket.on('toggle switch', function(data) {
            log.log("Received toggle message: " + data);
            if (commandlineargs.simulate) {
                socket.emit("switch toggled", data);
            }
            else {
                log.error("Switch toggling not implemented yet");
                //TODO: switch toggling in serialmanager
            }
        });
        socket.on('disconnect', function(socket) {
            log.log('Client disconnected');
        });
        socket.on('connect port request', function(port) {
            log.log("Client wants to connect to port: " + port);
            serialManager.connectTo(port);
        });
        socket.on('get plan request', function(filepath) {
            planloader.loadAsync(filepath, function(data) {
                socket.emit('get plan result', data);
            });
        });
        socket.on('shutdownServer', function() {
            process.kill(process.pid, 'SIGTERM');
        });



    });
}


//ENTRY POINT
settings.load();
planloader.load(__dirname + "/" + settings.get().lastPlanFile);
initializeServer();
setupSocketListeners();
