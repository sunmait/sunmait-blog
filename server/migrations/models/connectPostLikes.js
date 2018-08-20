'use strict';
module.exports = (sequelize, DataTypes) => {
  var Connect = sequelize.define(
    'Connect',
    {
      id: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
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
  return Connect;
};
