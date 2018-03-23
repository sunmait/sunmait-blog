'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostsTag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PostId: {
        allowNull: false,
        foreignKey: true,
        references: { model: 'Posts', key: 'id' },
        type: Sequelize.INTEGER,
      },
      TagId: {
        allowNull: false,
        foreignKey: true,
        references: { model: 'Tags', key: 'id' },
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PostsTag');
  },
};
