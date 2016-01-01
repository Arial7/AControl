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
//TODO: this does not work
exports.loadAsync = function(filepath, callback) {
    log.log("Loading plan async: " + filepath);
    jsonfile.readFile(filepath, function(err, data) {
        callback(data);   
    });
}


exports.save = function() {
    jsonfile.writeFile(planfile, plan, function(err) {
        if (err) {
            log.error("Error while saving plan: " + err);
        }
    });
}
