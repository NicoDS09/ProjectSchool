'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nomBlogeur: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};