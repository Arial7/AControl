serialPort   = require "serialport"
SerialPort   = serialPort.SerialPort
Log          = require "./log.js"
util         = require "util"
EventEmitter = require("events").EventEmitter
randomstring = require "randomstring"

# This class is reponsible for all serial communication. It connects
# to the devices, manages low-level commands and provides a base for
# issuing higher-level commands.
#
# TODO: Move high-level commands such as toggling switches.
# TODO: Implement logging via a master logger.
class SerialManager
    constructor: ->
        EventEmitter.call @
        @log = new Log()
        @commandIDQueue = []

        # TODO: read this from settings file
        @BAUDRATE = 115200

    # Queries the system for available serial ports to connect to.
    # Note that it cannot detect, whether an ADevice is connected to
    # a port or not.
    # @param callback - A callback function with one argument. A
    # list of the available ports will be passed.
    getAvailablePorts: (callback) ->
        serialPort.list (err, ports) =>
            if err?
                @log.error "SerialManager", "An error occured while getting
                    available ports: #{err}"
                callback null
            else
                if not ports?
                    @log.info "SerialManager", "No ports found"
                    callback null
                else
                    portsArray = []
                    portsArray.push {portName: port.comName} for port in ports
                    callback portsArray
    
    # Establishes a connection to a serial device (hopefully an
    # ADevice) and sets up the basic listeners.
    # @param name - The name of the serial device (should be like
    # '/dev/...' on *NIX systems and 'COM...' on Windows.
    # @emits connected - After the connection has been established.
    connect: (name) ->
        @log.info "SerialManager", "Connecting to #{name}"
        @activePort = new SerialPort name, {baudrate: @BAUDRATE}
        @activePort.on "open", =>
            writeToPort "ACN"
            @emit "connected", true
            @log.info "SerialManager", "Connected"
        @activePort.on "data", (data) =>
            @emit "data received", data
            handleResponse data

    # Toggles a switch

    # TODO: Move this to another class
    toggleSwitch: (id) ->
        writeToPort "ASW-#{id}"

    # Disconnects from the ADevice.
    # @emits "disconnected" - After a successful disconnection.
    #
    # TODO: Check if serialport needs some sort of disconnecting
    disconnect: ->
        if @activePort? and @activePort.isOpen()
            writeToPort "ADC"
        @emit "disconnected"

    # Handles the responses of the connected ADevice. Checks if the
    # returned ID was expected, throws an error if not.
    # @param response - The raw response string sent by the ADevice.
    handleResponse: (response) ->
        response = response.toString().replace /^\s+|\s+$/g, ''
        
        idPosition = response.indexOf "?"
        # FIXME: This will not work
        success = (response.substring 0, idPosition is "AOK") ? true: false
        id = response.substring idPosition + 1

        unless sucess is true
            for command in @commandIDQueue
                if command.id is id
                    @log.error "SerialManager", "Command '#{command.command}'
                        did not execute successfully"
                    break
        if id is @commandIDQueue[0].id
            @commandIDQueue.shift()
        else
            @log.error "SerialManager", "ADevice returned unexpected ID #{id}.
                Expected ID was #{@commandIDQueue[0].id}"

    # Sends a command to the ADevice. Generates an ID for the given
    # command and appends it to the queue.
    # @param command - Raw command string WITHOUT an ID or the
    # questionmark (?).
    writeToPort: (command) ->
        id = randomstring.generate
            length: 3, charset: 'numeric'
        @commandIDQueue.push
            command: command
            id: id
        @activePort.write "#{command}?#{id}\n"


util.inherits SerialManager, EventEmitter
module.exports = SerialManager
