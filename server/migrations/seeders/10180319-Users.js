'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          FirstName: 'Angelina',
          LastName: 'Magidova',
          PhotoUrl: 'https://vk.com/id214420083?z=photo214420083_456240802%2Falbum214420083_0%2Frev',
        },
        {
          id: 2,
          FirstName: 'Vadim',
          LastName: 'Chernickov',
          PhotoUrl: 'https://vk.com/id112777004?z=photo112777004_456239409%2Falbum112777004_0%2Frev',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
 