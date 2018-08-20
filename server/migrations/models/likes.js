'use strict';
module.exports = (sequelize, DataTypes) => {
  var Likes = sequelize.define(
    'Likes',
    {
      id: DataTypes.INTEGER,
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
  return Likes;
};
