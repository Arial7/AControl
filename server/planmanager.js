var shortid = require("shortid");
var path    = require("path");
var loggos  = require("loggos");
var fs      = require("fs");

var log = new loggos();

var plans = [];

const planDir = path.resolve(__dirname, "plans");

const loadPlans = () => {
    files = fs.readdirSync(planDir);
    for (let file of files) {
        let p = JSON.parse(fs.readFileSync(path.resolve(planDir, file), "utf-8"));
        plans.push({ fileName: file, name: p.name });
    }
}

module.exports.loadPlans = loadPlans;

const getPlan = (fileName) => {
    return JSON.parse(fs.readFileSync(path.resolve(planDir, fileName), "utf-8"));
}

module.exports.getPlan = getPlan;

const getPlanList = () => {
    return plans;
}

module.exports.getPlanList = getPlanList;

const savePlan = (planData) => {
    fs.writeFileSync(path.resolve(planDir, shortid.generate() + ".acp"), JSON.stringify(planData));
    log.info("PlanManager", "New plan written");
    loadPlans();
}

module.exports.savePlan = savePlan;

const updatePlan = (fileName, planData) => {
    fs.writeFileSync(path.resolve(planDir, fileName), planData);
    log.info("PlanManager", "Plan updated");
}

module.exports.updatePlan = updatePlan;
