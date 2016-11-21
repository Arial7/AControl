var express = require("express"),
    io      = require("socket.io"),
    path    = require("path"),
    fs      = require("fs"),
    loggos  = require("loggos");

var SerialManager = require("./serialmanager");

var app = express();
var log = new loggos();
var serialManager = new SerialManager();

const PORT = 3030

var clientDir = path.resolve(__dirname, "./client");
log.info("Init", "The client directory is " + clientDir);
var nodeModulesDir = path.resolve(__dirname, "..", "node_modules");
log.info("Init", "The node modules directory is " + nodeModulesDir);

// Setup client stuff
app.set("views", clientDir + "/pages");
app.set("view engine", "pug");
app.use("/nm/", express.static(nodeModulesDir));
app.use("/css/", express.static(clientDir + "/css"));
app.use("/img/", express.static(clientDir + "/img"));
app.use("/js/", express.static(clientDir + "/js"));

app.get("/", function(req, res) {
    res.render("index", { acontrolVersion: "3.0.0 Alpha 1" });
});

app.get("/api/hasConnection", function(req, res) {
    res.json({ connected: serialManager.hasConnection() });
});

app.get("/api/getAvailablePorts", function(req, res) {
    serialManager.getAvailablePorts()
        .then((ports) => {
            let pArray = [];
            for (p of ports) {
                pArray.push(p.portName);
            }
            res.json({ ports: pArray });
        });
});

app.get("/api/plan/current", function(req, res) {
    let plan = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../", "testplan.acp"), "utf-8"));
    res.json(plan);
});

app.post("/api/plan/new", function(req, res) {
    console.log(req);
    res.json({ success: true });

});

app.listen(PORT, () => {
    log.info("Init", "Listening on port 3030");
});
