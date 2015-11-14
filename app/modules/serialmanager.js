var SerialPort = require('serialport').SerialPort;
var serialPort = require('serialport');
var io = require('socket.io');
var log = require('./log.js');

var activePortName;

/**
 * Scan for avaiable serial ports and log them to the console
 * @param httpResult - the HTTP result to write the ports found to
 * @return false if no port has been found, else an array holding the ports
 * TODO: refresh the ports from time to time
 */
exports.getSerialPortsAvailable = function(httpResult) {
    //echo out all the serial ports that have been found
    serialPort.list(function(err, ports) {
        //ports is undefined if no port has been found
        //TODO: improve this
        if (ports === undefined && err !== undefined) {
            log.log("No ports found");
            return false;
        }
        if (err === undefined) {
            log.log("Found the following ports:");
            var portString = new Array();
            ports.forEach(function(port) {
                log.log("\t " + port.comName, false);
                portString.push({"portName" : port.comName});
            });

            httpResult.send(portString);

            return portString;
        }
        else {
            log.error("An error occured while loading available ports: " + err.toString());
        }
    });
}

/**
 * Connect to a serial port and test for a succesful connection
 * @param name - the name of the serial port (/dev/ttyACM0, COM1 f.ex.)
 * @param socket - the socket that requested the connection
 */
exports.connectToPort = function(name, socket) {
    log.log("Starting to connect...");
    activePortName = name;
    var port = new SerialPort(name.toString(),
        {
            baudrate: 115200
        },
        function(error) {
            onPortOpened(error, socket)
        }

    );
}
/**
 * Callback for when the connection to the port has been established
 */
function onPortOpened(error, socket) {
    if (error === undefined){
        log.log("Connected to serial port: " + activePortName);
        socket.emit('connect port result', true);
    }
    else {
        log.error("Failed to connect to port: " + error);
        socket.emit('connect port result', false);
    }
}
