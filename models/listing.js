'use strict';
module.exports = (sequelize, DataTypes) => {
    const Properties = sequelize.define('Properties', {
        propertyId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        agentId: {type: DataTypes.INTEGER,ForeignKey: true},
        streetAddress: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        price: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Properties;
};