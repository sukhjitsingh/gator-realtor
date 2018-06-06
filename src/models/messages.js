'use strict';
module.exports = (sequelize, DataTypes) => {
    const buyerMessages = sequelize.define('buyerMessages', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        buyerFullName: DataTypes.STRING,
        buyerEmail: DataTypes.STRING,
        buyerPhoneNumber: DataTypes.BIGINT(20),
        listingNumber: DataTypes.BIGINT(20),
        agentId: DataTypes.BIGINT(20),
        message: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        timestamps: true,
        tableName: 'buyerMessages'
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return buyerMessages;
};