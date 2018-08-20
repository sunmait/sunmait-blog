'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostLikes', {
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
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      UserId: {
        allowNull: false,
        foreignKey: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PostLikes');
  },
};
