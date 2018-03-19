'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define(
    'Users',
    {
      idUser: DataTypes.INTEGER,
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      PhotoUrl: DataTypes.STRING,
      AccessToken: DataTypes.STRING,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  );
  return Users;
};
