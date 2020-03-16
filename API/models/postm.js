'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostM = sequelize.define('PostM', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    sujet: {
      type: DataTypes.STRING
    },
    post: {
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
  PostM.associate = function (models) {
    // associations can be defined here
  };
  return PostM;
};