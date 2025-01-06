"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project_user extends Model {
    static associate(models) {
      // define association here
    }
  }
  Project_user.init(
    {
      projectId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project_user",
    }
  );
  return Project_user;
};
