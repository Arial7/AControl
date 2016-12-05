var express    = require("express"),
    io         = require("socket.io"),
    path       = require("path"),
    fs         = require("fs"),
    bodyParser = require("body-parser"),
    shortid    = require("shortid"),
    loggos     = require("loggos");


var webpack = require('webpack');
var config = require('../webpack.config');

var SerialManager = require("./serialmanager");
var planManager = require("./planmanager");

var app = express();
var compiler = webpack(config);
var log = new loggos();
var serialManager = new SerialManager();

const PORT = 3030

var clientDir = path.resolve(__dirname, "..", "client");
log.info("Init", "The client directory is " + clientDir);
var nodeModulesDir = path.resolve(__dirname, "..", "node_modules");
log.info("Init", "The node modules directory is " + nodeModulesDir);

// Setup client stuff
app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
	lazy: false,
	index: "/",
    noInfo: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", clientDir + "/views");
app.set("view engine", "pug");
app.use("/nm/", express.static(nodeModulesDir));
app.use("/css/", express.static(clientDir + "/css"));
app.use("/img/", express.static(clientDir + "/img"));
app.use("/js/", express.static(clientDir + "/js"));

app.get("/vendor.bundle.js", function(req, res) {
    res.sendFile(path.resolve(clientDir, "dist", "vendor.bundle.js"));
});
app.get("/bundle.js", function(req, res) {
    res.sendFile(path.resolve(clientDir, "dist", "bundle.js"));
});

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

app.get("/api/plan/:fileName", function(req, res) {
    if (req.params.fileName === "list") {
        res.json(planManager.getPlanList());
    } else {
        res.json(planManager.getPlan(req.params.fileName));
    }
});

app.get("/api/plan/current", function(req, res) {
    let plan = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../", "testplan.acp"), "utf-8"));
    res.json(plan);
});

app.post("/api/plan/new", function(req, res) {
    planManager.savePlan(req.body);
    res.json({ success: true });

});

// - Entry point
planManager.loadPlans();

app.listen(PORT, () => {
    log.info("Init", "Listening on port 3030");
});
