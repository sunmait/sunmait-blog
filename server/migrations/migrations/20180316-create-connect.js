'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Connect', {
      idConnect: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      idPost: {
        allowNull: false,
        foreignKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      idTag: {
        allowNull: false,
        foreignKey: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Connect');
  },
};
