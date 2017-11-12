const models = require('../models');
const sequelize = require('sequelize');
let clientId;

let displayImages = function (request, response) {

    models.Images.sequelize.query("SELECT imageLink FROM `Images` WHERE `propertyId` = 1",
        {type: sequelize.QueryTypes.SELECT})
        .then(results => {
            response.render('listing', {results})
        })
        .catch((err) => {
            return response.send(err);
        })
};

let loadInfo = function (request, response) {

    models.User.sequelize.query("SELECT * FROM `Users` WHERE `id` = :clientId",
        {replacements: {clientId: clientId}, type: sequelize.QueryTypes.SELECT})
        .then(results => {
            response.render('accountSettings', {results})
        })
        .catch((err) => {
            return response.send(err);
        })
};

let setClientId = function (email) {
     models.User.sequelize.query("SELECT id FROM `Users` WHERE `email` = :email",
            {replacements: {email: email}, type: sequelize.QueryTypes.SELECT})
            .then(results => {
                clientId = results[0].id;
            });
};

let getAgentId = function() {
    return models.User.sequelize.query("SELECT agentId FROM `Users` WHERE `id` = :id",
        {replacements: {id: clientId}, type: sequelize.QueryTypes.SELECT})
        .then(results => results[0].agentId);
};


let getProperty = function (request, response) {
     models.Properties.sequelize.query("SELECT * FROM `Properties` WHERE `id` = :id",
        {replacements: {id: request.body.listingdetailbutton}, type: sequelize.QueryTypes.SELECT})
        .then(results => {
            response.render('listingdetails', {results})
        }).catch((err) => {
        return response.send(err);
    });
};


let dashboardProperties = function (request, response) {
    getAgentId().then(agentId => {
            models.Properties.sequelize.query("SELECT * FROM `Properties` WHERE `agentId` = :agentId",
                {replacements: {agentId: agentId}, type: sequelize.QueryTypes.SELECT})
                .then(results => {
                    response.render('dashboard', {results})
                }).catch((err) => {
                return response.send(err);
            });
        })
};

let deleteProperty = function (request, response) {
    return models.Properties.sequelize.query("DELETE FROM `Properties` WHERE `id` = :id",
        {replacements: {id: request.body.deleteButton}, type: sequelize.QueryTypes.DELETE})
        .then(results => {
            response.redirect('/dashboard');
        }).catch((err) => {
        return response.send(err);
    });
};

module.exports = {
    displayImages: displayImages,
    loadInfo:loadInfo,
    setClientId:setClientId,
    getAgentId:getAgentId,
    getProperty:getProperty,
    dashboardProperties:dashboardProperties,
    deleteProperty:deleteProperty
}