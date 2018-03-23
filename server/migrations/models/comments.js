'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comments = sequelize.define(
    'Comments',
    {
      id: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
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
