var log = require('./log.js')
var jsonfile = require('jsonfile');

const settingsFile = './settings.json'

var settings = [];

/**
 * Loads the settings file up and saves its content into the settings
 * array.
 * Loading of the settings file is synchronous, so only load it once
 */
exports.load = function() {
    log.log("Reading settings file: " + settingsFile);
    settings = jsonfile.readFileSync(settingsFile);
}

/**
 * @return the settings array
 */
exports.get = function() {
    return settings;
}

exports.save = function() {
    jsonfile.writeFile(settingsFile, settings, function(err) {
        if (err !== undefined) {
            log.error("Error while saving settings: " + err);
        }
    });
}
