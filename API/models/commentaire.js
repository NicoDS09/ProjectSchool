'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentaire = sequelize.define('commentaire', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idpost: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'PostMs',
        key: 'id',
      },
    },
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    comm: {
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
  commentaire.associate = function (models) {
    // associations can be defined here
  };
  return commentaire;
};