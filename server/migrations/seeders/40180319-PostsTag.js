'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'PostsTag',
      [
        {
          id: 1,
          PostId: 15,
          TagId: 1,
        },
        {
          id: 2,
          PostId: 14,
          TagId: 2,
        },
        {
          id: 3,
          PostId: 13,
          TagId: 3,
        },
        {
          id: 4,
          PostId: 12,
          TagId: 1,
        },
        {
          id: 5,
          PostId: 11,
          TagId: 2,
        },
        {
          id: 6,
          PostId: 10,
          TagId: 4,
        },
        {
          id: 7,
          PostId: 9,
          TagId: 3,
        },
        {
          id: 8,
          PostId: 8,
          TagId: 2,
        },
        {
          id: 9,
          PostId: 7,
          TagId: 4,
        },
        {
          id: 10,
          PostId: 6,
          TagId: 3,
        },
        {
          id: 11,
          PostId: 5,
          TagId: 2,
        },
        {
          id: 12,
          PostId: 4,
          TagId: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PostsTag', null, {});
  },
};
