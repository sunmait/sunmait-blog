'use strict';
module.exports = (sequelize, DataTypes) => {
  var Connect = sequelize.define(
    'Connect',
    {
      id: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
      TagId: DataTypes.INTEGER,
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
  return Connect;
};
