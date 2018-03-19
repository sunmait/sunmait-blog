'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Connect',
      [
        {
          idConnect: 1,
          idPost: 1,
          idTag: 1,
        },
        {
          idConnect: 2,
          idPost: 2,
          idTag: 2,
        },
        {
          idConnect: 3,
          idPost: 3,
          idTag: 3,
        },
        {
          idConnect: 4,
          idPost: 4,
          idTag:4,
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Connect', null, {});
  },
};
