const queriesController = require('../controllers/queriesController');


module.exports.displayListing = function(request, res, next){

    queriesController.getProperty(request, res);
};