var log = require('./log.js')
var jsonfile = require('jsonfile');

//TODO: load file name from somewhere
const planfile = './plan1.acp';

var plan = [];

/**
 * Loads the settings file up and saves its content into the settings
 * array.
 * Loading of the settings file is synchronous, so only load it once
 */
exports.load = function() {
    log.log("Loading plan: " + planfile);
    plan = jsonfile.readFileSync(planfile);
    console.log(JSON.stringify(plan));
}

/**
 * @return the settings array
 */
exports.getRaw = function() {
    return plan;
}


exports.save = function() {
    jsonfile.writeFile(planfile, plan, function(err) {
        if (err) {
            log.error("Error while saving plan: " + err);
        }
    });
}
