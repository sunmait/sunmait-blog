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
          Login: 'DinAlla',
          PasswordHash: 'sha1$2b6cc855$1$b5d388c99fcdb546494bcdc12df02ebd6ca03936',
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 2,
          FirstName: 'Vadim',
          LastName: 'Chernickov',
          PhotoUrl: 'https://vk.com/id112777004?z=photo112777004_456239409%2Falbum112777004_0%2Frev',
          Login: 'Vadimdom ',
          PasswordHash: 'sha1$275bc8b5$1$c5b4d8d74126e7db8fa111a6ddc5741ecaaf8268',
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
 