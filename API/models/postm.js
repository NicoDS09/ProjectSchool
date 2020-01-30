'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostM = sequelize.define('PostM', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    idUser: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    post: {
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
  PostM.associate = function (models) {
    // associations can be defined here
  };
  return PostM;
};