var SerialPort = require('serialport').SerialPort;
var serialPort = require('serialport');
var log = require('./log.js');
var settings = require('./settings.js');
var util = require('util');
var EventEmitter = require('events').EventEmitter;


util.inherits(SerialManager, EventEmitter);


var activePortName;
var activePort;

function SerialManager() {
    EventEmitter.call(this);
}
SerialManager.prototype.getAvailablePorts = function(callback) {
    //echo out all the serial ports that have been found
    serialPort.list(function(err, ports) {
        //ports is undefined if no port has been found
        //TODO: improve this
        if (ports === undefined && err !== undefined) {
            log.log("No ports found");
            //TODO: send sth to client showing that there aren't any ports
            return false;
        }
        if (err === undefined) {
            log.log("Found the following ports:");
            var portString = new Array();
            ports.forEach(function(port) {
                log.log("\t " + port.comName, false);
                portString.push({"portName" : port.comName});
            });

            callback(portString);

            return portString;
        }
        else {
            log.error("An error occured while loading available ports: " + err.toString());
        }
    });
}

SerialManager.prototype.connectTo = function(name) {
    log.log("Starting to connect...");
    activePort = new SerialPort(
        name.toString(),
        {
            baudrate: settings.get().baudrate
        }
    );
    activePort.on('open', function() {
        writeToPort('ACN');
        this.emit('connectedToPort', true);
        log.log("Connected to serial device");
    }.bind(this));
    activePort.on('data', function(data) {
        log.log("[ABase]" + data);
        this.emit('dataReceived', data);
    }.bind(this));
}

SerialManager.prototype.toggleSwitch = function(id) {
    writeToPort("ASW-" + id);
}

module.exports = SerialManager;

/**
 * Writes the given command to the serial port. Genrates a random ID and places it in the array;
 * @param command - String, command to write
 */
function writeToPort(command) {
    //TODO: generate random ID
    activePort.write(command + "?000" + "\n");
}
