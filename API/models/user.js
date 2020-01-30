'use strict';
module.exports = (DataTypes, DataTypes) => {
  const User = DataTypes.define('User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      prenom: {
        type: DataTypes.STRING
      },
      nom: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      nomBlogeur: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};