const models = require('../models');
const sequelize = require('sequelize');

let loadInfo = (userId) => {
    return models.User.sequelize.query("SELECT * FROM `Users` WHERE `id` = :id",
        {replacements: {id: userId}, type: sequelize.QueryTypes.SELECT})
};

let getAgentId = (userId) => {
    return models.User.sequelize.query("SELECT agentId FROM `Users` WHERE `id` = :id",
        {replacements: {id: userId}, type: sequelize.QueryTypes.SELECT})
};


let getProperty = (propertyId) => {
    return models.Properties.sequelize.query("SELECT * FROM `Properties` WHERE `id` = :id",
        {replacements: {id: propertyId}, type: sequelize.QueryTypes.SELECT})
};

let dashboardProperties = (userId) => {
    return models.Properties.sequelize.query("SELECT * FROM `Properties` WHERE `agentId` IN ( SELECT `agentId` FROM `Users` WHERE  `id` = :agentId)",
        {replacements: {agentId: userId}, type: sequelize.QueryTypes.SELECT})
};

let getUser = (userId) => {
    return models.User.sequelize.query("SELECT * FROM `Users` WHERE `id` = :id",
        {replacements: {id: userId}, type: sequelize.QueryTypes.SELECT})
};

let getAgent = (propertyId) => {
    return models.User.sequelize.query("SELECT * FROM `Users` WHERE `agentId` IN ( SELECT `agentId` FROM `Properties` WHERE  `id` = :id)",
        {replacements: {id: propertyId}, type: sequelize.QueryTypes.SELECT})
};

let dashboardMessages = (userId) => {
    return models.Properties.sequelize.query("SELECT * FROM `buyerMessages` WHERE `agentId` IN ( SELECT `agentId` FROM `Users` WHERE  `id` = :id)",
        {replacements: {id: userId}, type: sequelize.QueryTypes.SELECT})
};

let deleteProperty = (id) => {
    return models.Properties.sequelize.query("DELETE FROM `Properties` WHERE `id` = :id",
        {replacements: {id: id}, type: sequelize.QueryTypes.DELETE})
};

let isRegistered = (email) => {
    return models.User.sequelize.query("SELECT * FROM `Users` WHERE `email` = :email",
        {replacements: {email: email}, type: sequelize.QueryTypes.SELECT})
};

let deleteAccount = (userId) => {
    return models.User.sequelize.query("DELETE FROM `Users` WHERE `id` = :id",
        {replacements: {id: userId}, type: sequelize.QueryTypes.DELETE})
};

let updateUserInfo = (id, fName, lName, email, phoneNum, psswd) => {
    return models.User.sequelize.query("UPDATE `Users` SET `firstName` = :fName, `lastName` = :lName, " +
        "`email` = :email, `phoneNumber` = :phoneNum, `password` =:psswd  WHERE `id` = :id",
        {
            replacements: {id: id, fName: fName, lName: lName, email: email, phoneNum: phoneNum, psswd: psswd},
            type: sequelize.QueryTypes.UPDATE
        })
};

let getUnsetPropertyId = () => {
    return models.Properties.sequelize.query("SELECT * FROM `Properties` WHERE `isSet` = :isSet",
        {replacements: {isSet: '0'}, type: sequelize.QueryTypes.SELECT})
};

let getImages = (propertyid) => {
    return models.Images.sequelize.query("SELECT * FROM `Images` WHERE `propertyId` = :propertyId",
        {replacements: {propertyId: propertyid}, type: sequelize.QueryTypes.SELECT})
};

let updatePropertyValue = () => {
    return models.Properties.sequelize.query("UPDATE `Properties` SET `isSet` = :isSet WHERE `isSet` = :value",
        {
            replacements: {isSet: '1', value: '0'}, type: sequelize.QueryTypes.UPDATE
        })
};

module.exports = {
    loadInfo,
    getAgentId,
    getProperty,
    dashboardProperties,
    deleteProperty,
    getUser,
    getAgent,
    dashboardMessages,
    isRegistered,
    deleteAccount,
    updateUserInfo,
    getUnsetPropertyId,
    getImages,
    updatePropertyValue
};