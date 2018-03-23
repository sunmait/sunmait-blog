'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Posts',
      [
        {
          id: 1,
          UserId: 1,
          CreatedAt: new Date('December 17, 2017 15:00:00'),
          UpdatedAt: new Date('November 21, 2017 11:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
        },
        {
          id: 2,
          UserId: 2,
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
        },
        {
          id: 3,
          UserId: 1,
          CreatedAt: new Date('December 19, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
        },
        {
          id: 4,
          UserId: 2,
          CreatedAt: new Date('February 1, 2018 16:41:56'),
          UpdatedAt: new Date('February 21, 2018 11:41:33'),
          Description:
            'Suspendisse libero magna, luctus quis augue eu, finibus placerat sem. Cras laoreet erat vitae varius placerat. Mauris sodales purus orci, eget imperdiet nunc dictum quis. Phasellus ornare arcu orci, nec luctus tortor faucibus sit amet.',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
