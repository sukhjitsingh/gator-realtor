'use strict';
module.exports = (sequelize, DataTypes) => {
    const favorites = sequelize.define('favorites', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        propertyid: DataTypes.BIGINT(20),
        userid: DataTypes.BIGINT(20),
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        timestamps: true,
        tableName: 'favorites'
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return favorites;
};