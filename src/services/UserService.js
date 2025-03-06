import db from "../models/index";
var bcrypt = require("bcryptjs");
import { Op } from "sequelize";
const salt = bcrypt.genSaltSync(10);
import { getGroupWithRoles } from "../services/JWTService";
import { createJWT } from "../middleware/JWTAction";
require("dotenv").config();
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
      groupId: 4,
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

const checkPassword = (inputPassword, hashPassWord) => {
  return bcrypt.compareSync(inputPassword, hashPassWord);
};

const handleUserLogin = async (data) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: data.valueLogin }, { phone: data.valueLogin }],
      },
    });
    if (user) {
      let isCorrectPassrord = checkPassword(data.password, user.password);
      if (isCorrectPassrord === true) {
        let groupWithRoles = await getGroupWithRoles(user);

        let payload = {
          email: user.email,
          groupWithRoles,
          expiresIn: process.env.JWT_EXPIRESIN,
        };
        let token = createJWT(payload);
        return {
          EM: "Dang nhap thanh cong",
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles: groupWithRoles,
            email: user.email,
            username: user.username,
          },
        };
      }
    }
    return {
      EM: "email/Phone hoac mat khau khong chinh xac",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Loi Server",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
  checkEmail,
  checkPhone,
  checkPassword,
};
