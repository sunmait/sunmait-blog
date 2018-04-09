'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      FirstName: {
        type: Sequelize.STRING,
      },
      LastName: {
        type: Sequelize.STRING,
      },
      PhotoUrl: {
        type: Sequelize.STRING,
      },
      Login: {
        type: Sequelize.STRING,
      },
      PasswordHash: {
        type: Sequelize.STRING,
      },
      CreatedAt: {
        type: Sequelize.DATE,
      },
      UpdatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  },
};
