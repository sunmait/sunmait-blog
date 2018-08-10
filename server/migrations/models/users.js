'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define(
    'Users',
    {
      id: DataTypes.INTEGER,
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      PhotoUrl: DataTypes.STRING,
      Login: DataTypes.STRING,
      PasswordHash: DataTypes.STRING,
      CreatedAt: DataTypes.DATE,
      UpdatedAt: DataTypes.DATE,
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
  return Users;
};
