Log      = require "./log.js"
jsonfile = require "jsonfile"

# Very basic class used for loading and writing plan files.
# Caches the file's content for faster re-loading.
class PlanLoader
    constructor: ->
        @log = new Log()
    
    # Wrapper for the async jsonfile.readFile() function.
    # @param filepath - A relative or absolute path pointing to the
    # file to load.
    # @param callback - Called when the file's contents got loaded.
    # One parameter, containing the raw data gets passed.
    # @param forceReload - Boolean, if true, the cache gets
    # discarded and the file will be reloaded.
    loadAsync: (filepath, callback, forceReload) ->
        if filepath is @lastFile and not forceReload
           callack @lastContent
        else
            @lastFile = filepath
            @log.info "PlanLoader", "Loading plan #{filepath}"
            jsonfile.readFile filepath, (err, data) =>
                @log.error "Failed to load plan: #{err}" if err?
                @lastContent = data
                callback data

module.exports = PlanLoader
