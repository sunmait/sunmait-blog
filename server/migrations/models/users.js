'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define(
    'Users',
    {
      id: DataTypes.INTEGER,
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      PhotoUrl: DataTypes.STRING,
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
  return Users;
};
