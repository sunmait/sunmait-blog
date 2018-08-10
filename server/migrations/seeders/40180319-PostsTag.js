'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'PostsTag',
      [
        {
          id: 1,
          PostId: 1,
          TagId: 1,
        },
        {
          id: 2,
          PostId: 2,
          TagId: 2,
        },
        {
          id: 3,
          PostId: 3,
          TagId: 3,
        },
        {
          id: 4,
          PostId: 4,
          TagId: 4,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PostsTag', null, {});
  },
};
