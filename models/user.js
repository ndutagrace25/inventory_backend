'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    userType: DataTypes.INTEGER,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER,
    resetPassword: DataTypes.INTEGER,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};