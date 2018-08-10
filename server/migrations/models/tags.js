'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tags = sequelize.define(
    'Tags',
    {
      id: DataTypes.INTEGER,
      Text: DataTypes.STRING,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return Tags;
};
