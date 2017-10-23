'use strict';
module.exports = (sequelize, DataTypes) => {
    const Agent = sequelize.define('Agent', {
        agentId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        phoneNumber: DataTypes.INTEGER,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Agent;
};