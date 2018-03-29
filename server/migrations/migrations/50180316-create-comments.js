'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PostId: {
        references: { model: 'PostsTag', key: 'TagId' },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      UserId: {
        references: { model: 'Users', key: 'id' },
        onDelete: 'NO ACTION',
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
