import { where } from "sequelize/lib/sequelize";
import db from "../models/index";
var bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const checkEmail = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }

  return false;
};

const checkPhone = async (userPhone) => {
  let phone = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (phone) {
    return true;
  }

  return false;
};

const registerNewUser = async (userData) => {
  try {
    //kiem tra email va phone da ton tai Chua
    let isCheckEmail = await checkEmail(userData.email);
    if (isCheckEmail === true) {
      return {
        EM: "email da ton tai",
        EC: 1,
      };
    }

    let isCheckPhone = await checkPhone(userData.phone);
    if (isCheckPhone === true) {
      return {
        EM: "So dien thoai da ton tai",
        EC: 2,
      };
    }
    //hash password
    let hashPassWord = (password) => {
      let results = bcrypt.hashSync(password, salt);
      return results;
    };
    let hashPassWordUser = hashPassWord(userData.password);

    //create user
    await db.User.create({
      email: userData.email,
      username: userData.username,
      phone: userData.phone,
      password: hashPassWordUser,
    });

    return {
      EM: "Dang ky nguoi dung thanh cong",
      EC: 0,
    };
  } catch (error) {
    return {
      EM: "Loi Server",
      EC: -2,
    };
  }
};

module.exports = {
  registerNewUser,
};
