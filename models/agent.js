'use strict';
module.exports = (sequelize, DataTypes) => {
  var Agent = sequelize.define('Agent', {
    agentId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fName: DataTypes.STRING,
    lName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Agent;
};