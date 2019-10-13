'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostRating = sequelize.define(
    'PostRating',
    {
      id: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
      Value: DataTypes.INTEGER,
    },
    {}
  );
  PostRating.associate = function(models) {
    // associations can be defined here
  };
  return PostRating;
};
