'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tags = sequelize.define(
    'Tags',
    {
      idTag: DataTypes.INTEGER,
      Text: DataTypes.STRING,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  );
  return Tags;
};
