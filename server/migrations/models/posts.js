'use strict';
module.exports = (sequelize, DataTypes) => {
  var Posts = sequelize.define(
    'Posts',
    {
      idPost: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
      CreatedAt: DataTypes.DATE,
      UpdatedAt: DataTypes.DATE,
      Description: DataTypes.STRING,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  );
  return Posts;
};
