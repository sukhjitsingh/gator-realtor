'use strict';
module.exports = (sequelize, DataTypes) => {
  const Properties = sequelize.define('Properties', {
    propertyId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    streetAddress: DataTypes.STRING,
    streetAddress2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    buildYear: DataTypes.INTEGER,
    bedrooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    imageLink: DataTypes.STRING,
    agentId: {type: DataTypes.INTEGER, foreignKey: true},
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    timestamps: true,
    tableName: 'Properties'
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Properties;
};