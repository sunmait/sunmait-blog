'use strict';
module.exports = (sequelize, DataTypes) => {
  var Connect = sequelize.define(
    'Connect',
    {
      idConnect: DataTypes.INTEGER,
      idPost: DataTypes.INTEGER,
      idTag: DataTypes.INTEGER,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  );
  return Connect;
};
