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
          Value: 2,
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
        // {
        //   id: 7,
        //   PostId: 7,
        //   UserId: 3,
        //   Value: 2,
        // },
        // {
        //   id: 8,
        //   PostId: 8,
        //   UserId: 3,
        //   Value: 2,
        // },
        // {
        //   id: 9,
        //   PostId: 9,
        //   UserId: 3,
        //   Value: 2,
        // },
        // {
        //   id: 10,
        //   PostId: 10,
        //   UserId: 3,
        //   Value: 2,
        // },
        // {
        //   id: 11,
        //   PostId: 11,
        //   UserId: 3,
        //   Value: 2,
        // },
        // {
        //   id: 12,
        //   PostId: 12,
        //   UserId: 3,
        //   Value: 2,
        // },
        // {
        //   id: 13,
        //   PostId: 13,
        //   UserId: 3,
        //   Value: 2,
        // },
        // {
        //   id: 14,
        //   PostId: 14,
        //   UserId: 3,
        //   Value: 2,
        // },
        // {
        //   id: 15,
        //   PostId: 15,
        //   UserId: 4,
        //   Value: 2,
        // },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PostRatings', null, {});
  },
};
