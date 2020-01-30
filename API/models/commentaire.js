'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentaire = sequelize.define('commentaire', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    idpost: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'PostMs',
        key: 'id',
      },
    },
    iduser: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    comm: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  }, {});
  commentaire.associate = function (models) {
    // associations can be defined here
  };
  return commentaire;
};