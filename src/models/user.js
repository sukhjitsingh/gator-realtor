'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT(20),
    email: DataTypes.STRING,
    password: DataTypes.STRING,
      agent: DataTypes.BOOLEAN,
      agentId: DataTypes.BIGINT(20)
  }, {
      tableName: 'Users'
  },
      {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};