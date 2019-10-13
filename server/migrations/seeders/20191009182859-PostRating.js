'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'PostRatings',
      [
        {
          id: 1,
          PostId: 1,
          UserId: 1,
          Value: 5,
        },
        {
          id: 2,
          PostId: 2,
          UserId: 2,
          Value: 3,
        },
        {
          id: 3,
          PostId: 3,
          UserId: 3,
          Value: 2,
        },
        {
          id: 4,
          PostId: 4,
          UserId: 2,
          Value: 2,
        },
        {
          id: 5,
          PostId: 4,
          UserId: 1,
          Value: 2,
        },
        {
          id: 6,
          PostId: 4,
          UserId: 3,
          Value: 2,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PostRatings', null, {});
  },
};
