'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comments = sequelize.define(
    'Comments',
    {
      idComment: DataTypes.INTEGER,
      idPost: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
      BodyComment: DataTypes.STRING,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  );
  return Comments;
};
