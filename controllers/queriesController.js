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

    models.Agent.sequelize.query("SELECT * FROM `Agents` WHERE `agentId` = :clientId",
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
        models.Agent.sequelize.query("SELECT agentId FROM `Agents` WHERE `email` = :email",
            {replacements: {email: email}, type: sequelize.QueryTypes.SELECT})
            .then(results => {
                clientId = results[0].agentId;
            });
    } else {
        models.User.sequelize.query("SELECT userId FROM `Users` WHERE `email` = :email",
            {replacements: {email: email}, type: sequelize.QueryTypes.SELECT})
            .then(results => {
                clientId = results[0].agentId;
            });
    }
};

module.exports.setClientType = function (type) {
    clientType = type;
};
