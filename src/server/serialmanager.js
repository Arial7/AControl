var serialPort   = require("serialport"),
    loggos       = require("loggos"),
    util         = require("util"),
    EventEmitter = require("events").EventEmitter,
    randomstring = require("randomstring");

const BAUDRATE = 115200;

class SerialManager {
    constructor() {
        EventEmitter.call(this);
        this.log = new loggos();
        this.commandIDQueue = [];
    };

    getAvailablePorts() {
        this.log.info("SerialManager", "Searching Ports");
        return new Promise((resolve, reject) => {
            serialPort.list((err, ports) => {
                if (err) {
                    this.log.error("SerialManager", "Error while getting available ports: " + err);
                    reject(err);
                } else {
                    if (ports) {
                        this.log.info("SerialManager", "Found ports: " + JSON.stringify(ports));
                        let portsArray = [];
                        this.log.info("SerialManager", "Found ports: " + JSON.stringify(ports));
                        for (port of ports) {
                            this.log.info("SerialManager", "Found ports: " + JSON.stringify(port));
                            portsArray.push({ portName: port.comName });
                        }
                        this.log.info("SerialManager", "Found ports: " + JSON.stringify(portsArray));
                        resolve(portsArray);
                    } else {
                        this.log.info("SerialManager", "No ports found");
                        resolve([]);
                    }
                }
            })
        });
    };

    hasConnection() {
        return (this.activePort != undefined) && this.activePort.isOpen();
    };
}

util.inherits(SerialManager, EventEmitter);
module.exports = SerialManager;
