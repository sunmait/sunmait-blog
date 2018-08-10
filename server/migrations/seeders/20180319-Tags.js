'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tags',
      [
        {
          id: 1,
          Text: 'Blog',
        },
        {
          id: 2,
          Text: 'Mine',
        },
        {
          id: 3,
          Text: 'Text',
        },
        {
          id: 4,
          Text: 'Story',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  },
};
