'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tags',
      [
        {
          idTag: 1,
          Text: 'Blog',
        },
        {
          idTag: 2,
          Text: 'Mine',
        },
        {
          idTag: 3,
          Text: 'Text',
        },
        {
          idTag: 4,
          Text: 'Story',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  },
};
