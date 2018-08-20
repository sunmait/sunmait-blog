'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'PostLikes',
      [
        {
          id: 1,
          PostId: 1,
          UserId: 1,
        },
        {
          id: 2,
          PostId: 2,
          UserId: 2,
        },
        {
          id: 3,
          PostId: 3,
          UserId: 3,
        },
        {
          id: 4,
          PostId: 4,
          UserId: 2,
        },
        {
          id: 5,
          PostId: 4,
          UserId: 1,
        },
        {
          id: 6,
          PostId: 4,
          UserId: 3,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PostLikes', null, {});
  },
};
