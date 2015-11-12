
/**
 * Wrapper for console.log() that adds a timestamp
 * @param message - the message to log
 * @param timestamp - optional, if true, the timestamp will be added
 */
exports.log = function(message) {
    var timestamp = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
    if (timestamp)
        console.log(getCurrentTime() + message);
    else
        console.log(message);
}

/**
 * Wrapper for console.error() that adds a timestamp
 * @param message - the message to log
 * @param timestamp - optional, if true, the timestamp will be added
 */
exports.error = function(message) {
    var timestamp = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
    if (timestamp)
        console.error(getCurrentTime() + message);
    else {
        console.error(message);
    }
}


/**
 * Function to get the current timestamp
 * @return String of [HOURS:MINUTES:SECONDS]
 * NOTE Maybe move to somewhere else
 */
function getCurrentTime() {
    var date = new Date();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var mins = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var secs = date.getSeconds()  < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return "[" + hours + ":" + mins + ":" + secs + "]";
}
