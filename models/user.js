"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      // define association here
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      profileImgUrl: {
        type: Sequelize.STRING(50),
        defaultValue: "S3 Default Img",
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "local",
      },
      location: {
        type: Sequelize.STRING(10),
        defaultValue: "seoul",
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return User;
};
