var log = require('./log.js')
var jsonfile = require('jsonfile');

//TODO: load file name from somewhere
var planfile; 

var plan = [];

exports.load = function(filepath) {
    planfile = filepath;
    log.log("Loading plan: " + planfile);
    plan = jsonfile.readFileSync(planfile);
}

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
