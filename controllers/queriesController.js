const models = require('../models');
const sequelize = require('sequelize');
let clientId;
let clientType;


module.exports.displayImages = function (request, response) {

    models.Images.sequelize.query("SELECT imageLink FROM `Images` WHERE `propertyId` = 1",
        {type: sequelize.QueryTypes.SELECT})
        .then(results => {
            response.render('listing', {results})
        })
        .catch((err) => {
            return response.send(err);
        })
};

module.exports.loadInfo = function (request, response) {

    models.User.sequelize.query("SELECT * FROM `Users` WHERE `id` = :clientId",
        {replacements: {clientId: clientId}, type: sequelize.QueryTypes.SELECT})
        .then(results => {
            response.render('accountSettings', {results})
        })
        .catch((err) => {
            return response.send(err);
        })
};

module.exports.setClientId = function (email) {
    if (clientType === "agent") {
        models.User.sequelize.query("SELECT agentId FROM `Users` WHERE `email` = :email",
            {replacements: {email: email}, type: sequelize.QueryTypes.SELECT})
            .then(results => {
                console.log('RESULTS FROM CLIENT: ', results)
                clientId = results[0].agentId;
            });
    } else {
        models.User.sequelize.query("SELECT id FROM `Users` WHERE `email` = :email",
            {replacements: {email: email}, type: sequelize.QueryTypes.SELECT})
            .then(results => {
                console.log('RESULTS FROM CLIENT: ', results)
                clientId = results[0].id;
            });
    }
};

module.exports.getAgentId = function () {
    let agentId;
     models.User.sequelize.query("SELECT agentId FROM `Users` WHERE `id` = :id",
        {replacements: {id: clientId}, type: sequelize.QueryTypes.SELECT})
        .then(results => {
            agentId = results[0].agentId
            // console.log('FINAL AGENT ID: ', {results})
        });
     return agentId;
};


module.exports.getProperty = function (request, response) {
    let propertyId = request.body.listingdetailbutton
    console.log('PROPERTY ID:', propertyId)
    models.Properties.sequelize.query("SELECT * FROM `Properties` WHERE `id` = :id",
        {replacements: {id: propertyId}, type: sequelize.QueryTypes.SELECT})
        .then(results => {
            response.render('listingdetails', {results})
            console.log(results)
        }).catch((err) => {
        return response.send(err);
    });
}
