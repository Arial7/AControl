var express = require("express"),
    io      = require("socket.io"),
    path    = require("path"),
    loggos  = require("loggos");

var SerialManager = require("./serialmanager");

var app = express();
var log = new loggos();
var serialManager = new SerialManager();

const PORT = 3030

var clientDir = path.resolve(__dirname, "./client");
log.info("Init", "The client directory is " + clientDir);
var mdlDir = path.resolve(__dirname, "../node_modules/material-design-lite/");
var fetchDir = path.resolve(__dirname, "../node_modules/whatwg-fetch/");
var jqueryDir = path.resolve(__dirname, "../node_modules/jquery/dist/");

// Setup client stuff
app.set("views", clientDir + "/pages");
app.set("view engine", "pug");
app.use("/nm/mdl/", express.static(mdlDir));
app.use("/nm/fetch/", express.static(fetchDir));
app.use("/nm/jquery/", express.static(jqueryDir));
app.use("/css/", express.static(clientDir + "/css"));
app.use("/img/", express.static(clientDir + "/img"));
app.use("/js/", express.static(clientDir + "/js"));

app.get("/", function(req, res) {
    res.render("index", { acontrolVersion: "3.0.0 Alpha 1" });
});

app.get("/einstellungen", function(req, res) {
    res.render("settings", {acontrolVersion: "3.0.0 Alpha 1"});
});

app.get("/api/hasConnection", function(req, res) {
    res.json({ connected: serialManager.hasConnection() });
});

app.get("/api/getAvailablePorts", function(req, res) {
    serialManager.getAvailablePorts()
        .then((ports) => {
            res.json({ ports: ports });
        });
});

app.listen(PORT, () => {
    log.info("Init", "Listening on port 3030");
});
