express = require "express"
io      = require "socket.io"
args    = require "command-line-args"
path    = require "path"

SerialManager = require "./serialmanager.js"
Log           = require "./log.js"
PlanLoader    = require "./planloader.js"

# Initialize global objects
app = express()
serialManager = new SerialManager()
planLoader = new PlanLoader()
@log = new Log()
# TODO: read this from settings file
PORT = 3030

# The client directory should be one level up
clientDir = path.resolve "../client/"

# Parse command line arguments
commandLineOptions = args
    name: "simulate", alias: "s", type: Boolean

argv = commandLineOptions.parse()

# Set up simulation mode
setupSimulationMode = =>
    @log.debug "Init", "Starting in simulation mode."

# Setup up the static resource paths and other routes
setupRoutes = =>
    # TODO: replace the settings path with a parsed relative path
    app.use "/css" , express.static "#{clientDir}/css"
    app.use "/js"  , express.static "#{clientDir}/js"
    app.use "/img" , express.static "#{clientDir}/img"
    app.use "/font", express.static "#{clientDir}/font"

    app.get "/", (req, res) ->
        res.sendFile "#{clientDir}/pages/main.html"

    app.get "/ports", (req, res) ->
        # If simulation mode is enabled, send a fake port
        if argv.simulate
            # FIXME: this will not work properly
            res.send
                portName: "/dev/null"
        else
            serialManager.getAvailablePorts (data) ->
                res.send data

setupSocketListeners = =>
    @io = io.listen @server
    @io.sockets.on "connection", (socket) =>
        @log.info "Server", "Client connected"

        socket.on "toggle switch", (switchID) =>
            @log.info "Server", "Toggling switch #{switchID}"
            if argv.simulate
                socket.emit "switch toggled", switchID
            else
                @log.error "Server", "Switch toggling is not implemented"

        socket.on "serial connection", (port) =>
            @log.info "Server", "Connection to port #{port} requested"
            serialManager.connect port

        socket.on "load plan", (filepath) ->
            planLoader.loadAsync filepath, (result) ->
                socket.emit "load plan", result

        socket.on "shutdown server", ->
            shutdownServer()
        
        socket.on "disconnect", =>
            @log.info "Server", "Client disconnected"
            
setupEventListeners = =>
    # When a connection to a serial device is established, send the
    # result to all servers.
    serialManager.on "connected", (result) =>
        @io.sockets.emit "serial connection", result


setupServer = =>
    # Start listening
    port = process.env.PORT || PORT
    @server = app.listen port, =>
        @log.info "Init", "Listening on port #{port}"
       
    # When killing the server, first disconnect
    process.on "SIGTERM", =>
        shutdownServer()

# This will exit the server. Before shutting down, disconnect from
# all serial devices.
shutdownServer = =>
    serialManager.once "disconnected", =>
        @log.info "Server", "Stopping server"
        process.exit 0
    serialManager.disconnect()


# ENTRY POINT
# TODO: save the last plan file in the settings
setupSimulationMode() if argv.simulate
setupRoutes()
setupServer()
setupSocketListeners()
setupEventListeners()

