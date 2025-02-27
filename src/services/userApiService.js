import { where } from "sequelize/dist/index.js";
import db from "../models/index";
var bcrypt = require("bcryptjs");
import { checkEmail, checkPhone, checkPassword } from "./UserService";
const salt = bcrypt.genSaltSync(10);

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });

    if (users) {
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "get data wrong",
      EC: -1,
      DT: "",
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };

    return {
      EM: "Ok",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "wrongs with services",
      EC: 1,
      DT: [],
    };
  }
};

const createNewUser = async (data) => {
  try {
    let isCheckEmail = await checkEmail(data.email);
    if (isCheckEmail === true) {
      return {
        EM: "email da ton tai",
        EC: 1,
        DT: "email",
      };
    }

    let isCheckPhone = await checkPhone(data.phone);
    if (isCheckPhone === true) {
      return {
        EM: "So dien thoai da ton tai",
        EC: 2,
        DT: "email",
      };
    }

    let hashPassWord = (password) => {
      let results = bcrypt.hashSync(password, salt);
      return results;
    };
    let hashPassWordUser = hashPassWord(data.password);

    await db.User.create({ ...data, password: hashPassWordUser });
    return {
      EM: " create new user success",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "error from Server",
      EC: 1,
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      //update
      user.save();
    } else {
      //not found
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });

    if (user) {
      await user.destroy();
      return {
        EM: " Delete user success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not exist",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "error from Server",
      EC: 2,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
