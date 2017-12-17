'use strict';
module.exports = (sequelize, DataTypes) => {
    const Properties = sequelize.define('Properties', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        streetAddress: DataTypes.STRING,
        streetAddress2: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        zipcode: DataTypes.INTEGER,
        price: DataTypes.BIGINT,
        buildYear: DataTypes.INTEGER,
        bedrooms: DataTypes.INTEGER,
        bathrooms: DataTypes.INTEGER,
        lotSize: DataTypes.INTEGER,
        type: DataTypes.STRING,
        agentId: DataTypes.BIGINT(20),
        parking: DataTypes.INTEGER,
        isSet: DataTypes.BOOLEAN,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        timestamps: true,
        tableName: 'Properties'
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return Properties;
};