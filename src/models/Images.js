'use strict';
module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define('Images', {
        imageId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        propertyId: {type: DataTypes.INTEGER, foreignKey: true},
        imageLink: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        timestamps: true,
        tableName: 'Images'
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Images;
};