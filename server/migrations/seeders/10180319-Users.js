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
          PhotoUrl: 'https://pp.userapi.com/c834402/v834402244/10f259/3Kqvbcc0TXQ.jpg',
          Login: 'DinAlla',
          PasswordHash: 'sha1$2b6cc855$1$b5d388c99fcdb546494bcdc12df02ebd6ca03936',
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 2,
          FirstName: 'Vadim',
          LastName: 'Chernikov',
          PhotoUrl: 'https://pp.userapi.com/c837639/v837639004/412d1/4MzaDc0pFgo.jpg',
          Login: 'Vadimdom',
          PasswordHash: 'sha1$b0c74340$1$9a2dba718cffc8992e419d833e2965da126c8e81',
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 3,
          FirstName: 'Hannah',
          LastName: 'Bugai',
          PhotoUrl:
            'https://st3.depositphotos.com/1742172/18355/v/1600/depositphotos_183552448-stock-illustration-vector-illustration-funny-cartoon-cat.jpg',
          Login: 'chornycmok',
          PasswordHash: 'sha1$cf8d3dea$1$4a42e619fafe036cc629a3cf1942c7ef81fda64a',
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
        {
          id: 4,
          FirstName: 'Admin',
          LastName: 'Admin',
          PhotoUrl: 'https://pngimage.net/wp-content/uploads/2018/05/admin-avatar-png-5.png',
          Login: 'admin',
          PasswordHash: 'sha1$342f9c61$1$f8bfc72285015f93da1dcccc85276ec23e35d090',
          CreatedAt: new Date('December 18, 2017 16:41:56'),
          UpdatedAt: new Date('December 21, 2017 11:41:33'),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
