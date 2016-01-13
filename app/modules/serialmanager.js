var SerialPort = require('serialport').SerialPort;
var serialPort = require('serialport');
var log = require('./log.js');
var settings = require('./settings.js');
var util = require('util');
var randomstring = require('randomstring');
var EventEmitter = require('events').EventEmitter;

util.inherits(SerialManager, EventEmitter);

var commandIDQueue = [];

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
        handleResponse(data);
    }.bind(this));
}

SerialManager.prototype.toggleSwitch = function(id) {
    writeToPort("ASW-" + id);
}

SerialManager.prototype.disconnect = function () {
    if (activePort && activePort.isOpen()) {
        writeToPort("ADC");
    }
    this.emit('disconnected');
}

module.exports = SerialManager;

function handleResponse(response) {
    response = response.toString().replace(/^\s+|\s+$/g, '');
    var idPosition = response.indexOf('?');
    var success = (response.substring(0, idPosition) == 'AOK') ? true : false;
    var id = response.substring(idPosition + 1);

    if (!success) {
        log.error("Command with ID " + id + " did not execute successful");
    }
    if (id === commandIDQueue[0]) {
        commandIDQueue.shift();
    }
    else {
        log.error("Unexpected return ID " + id + ". Expected " + commandIDQueue[0]);
    }

}

/**
 * Writes the given command to the serial port. Genrates a random ID and places it in the array;
 * @param command - String, command to write
 */
function writeToPort(command) {
    var id = randomstring.generate({length: 3, charset: 'numeric'});
    commandIDQueue.push(id);
    activePort.write(command + "?" + id + "\n");

}
