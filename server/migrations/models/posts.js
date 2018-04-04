'use strict';
module.exports = (sequelize, DataTypes) => {
  var Posts = sequelize.define(
    'Posts',
    {
      id: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      CreatedAt: DataTypes.DATE,
      UpdatedAt: DataTypes.DATE,
      Description: DataTypes.TEXT
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
    {
      timestamps: false
    },
  );
  return Posts;
};
