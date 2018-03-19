'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      idComment: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      idPost: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.STRING,
      },
      idUser: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      BodyComment: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  },
};
