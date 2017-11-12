const queriesController = require('../controllers/queriesController');

module.exports.displayDashboardProperties = function (req, res) {
    queriesController.dashboardProperties(req,res);
}

module.exports.deleteProperty = function (req, res) {
    queriesController.deleteProperty(req,res);
}