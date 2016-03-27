async  = require 'async'
colors = require 'colors'
fs     = require 'fs'
util   = require 'util'
EventEmitter = require('events').EventEmitter

# TODO: implement tracing

# ATTENTION:
# Be careful to not bind two Loggers to each other, as this will end
# in an infinite logging loop!

class Log
    constructor: (filePath) ->
        @d = new Date()
        @writeToFile = if filePath? then true else false
        fs.truncateSync filePath, 0 if @writeToFile
        @writeToConsole = true
        @filePath = filePath
        @writingQueue = []

    setWriteToConsole: (writeToConsole) ->
        @writeToConsole = writeToConsole

    setWriteToFile: (writeToFile) ->
        @writeToFile = writeToFile

    debug: (tag, message) ->
        # Debug messages should not be written to the logfile
        @emit 'logDebug', {tag: tag, message: message}
        if @writeToConsole
            m = "[D/#{tag}][#{@timeTag()}]#{message}"
            console.log m.white

    info: (tag, message) ->
        @emit 'logInfo', {tag: tag, message: message}
        m = "[I/#{tag}][#{@timeTag()}]#{message}"
        @writingQueue.push m
        if @writeToConsole
            console.log m.green
        @startWrite()

    warn: (tag, message) ->
        @emit 'logWarn', {tag: tag, message: message}
        m = "[W/#{tag}][#{@timeTag()}]#{message}"
        @writingQueue.push m
        if @writeToConsole
            console.log m.yellow
        @startWrite()

    error: (tag, message) ->
        @emit 'logError', {tag: tag, message: message}
        m = "[E/#{tag}][#{@timeTag()}]#{message}"
        @writingQueue.push m
        if @writeToConsole
            console.error m.red
        @startWrite()

    fatal: (tag, message) ->
        @emit 'logFatal', {tag: tag, message: message}
        m = "[F/#{tag}][#{@timeTag()}]#{message}"
        @writingQueue.push m
        if @writeToConsole
            console.error m.red.underline
        @startWrite()

    # To circumvent the missing pass by reference one master logger is
    # created. All other loggers should disable their output and emit
    # these events.
    bind: (logger) ->
        logger.on 'logDebug', (data) =>
            @debug data.tag, data.message
        logger.on 'logInfo', (data) =>
            @info data.tag, data.message
        logger.on 'logWarn', (data) =>
            @warn data.tag, data.message
        logger.on 'logError', (data) =>
            @error data.tag, data.message
        logger.on 'logFatal', (data) =>
            @fatal data.tag, data.message

    startWrite: () ->
        if @writeToFile is true
            writeStream = fs.createWriteStream @filePath, {
                flags: 'a'
                defaultEncoding: 'utf8'
                autoClose: true
            }
            writeStream.once 'open', () =>
                async.each @writingQueue
                ,(message, callback) ->
                    writeStream.once 'error', (error) ->
                        callback error
                    writeStream.write message + '\n'
                    callback null

                ,(err) =>
                    if err?
                        @error "Log", '''Error writing to file: #{err}.
                        Now disabling file logging output.'''
                        @writeToFile = false
                    writeStream.end()
                    @writingQueue = []

    timeTag: () ->
        @d = new Date()
        "#{@d.toLocaleTimeString()} on #{@d.toLocaleDateString()}"

    # Disables all visible logging and returns itself, used for getting a
    # binable instance of a logger
    getInstanceForBinding: () ->
        @writeToFile = false
        @writeToConsole = false
        @

util.inherits Log, EventEmitter

module.exports = Log
