"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group_role extends Model {
    static associate(models) {
      // define association here
    }
  }
  Group_role.init(
    {
      groupId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Group_role",
    }
  );
  return Group_Group_role;
};
