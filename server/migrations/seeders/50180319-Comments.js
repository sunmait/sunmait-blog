'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Comments',
      [
        {
          id: 1,
          PostId: 1,
          UserId: 1,
          BodyComment: 'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
        },
        {
          id: 2,
          PostId: 2,
          UserId: 2,
          BodyComment: 'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
        },
        {
          id: 3,
          PostId: 3,
          UserId: 1,
          BodyComment: 'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
        },
        {
          id: 4,
          PostId: 4,
          UserId: 2,
          BodyComment: 'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  },
};
