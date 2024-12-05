import { where } from "sequelize/lib/sequelize";
import connection from "../config/connectDB";
import db from "../models/index";
import user from "../models/user";
import { raw } from "body-parser";

var bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

let hashPassWord = (password) => {
  let results = bcrypt.hashSync(password, salt);
  return results;
};

let createNewUser = async (email, password, username) => {
  let hashPassWordUser = hashPassWord(password);
  try {
    await db.User.create({
      email: email,
      password: hashPassWordUser,
      username: username,
    });
  } catch (err) {
    console.log(err);
  }
};

let getAllUser = async () => {
  let results = await db.User.findAll();
  return results;
};

let deleteUser = async (userId) => {
  // let [results, field] = await connection.execute(
  //   `delete from user where id = ? `,
  //   [userId]
  // );
  await db.User.destroy({
    where: {
      id: userId,
    },
  });
  // return results;
};

let getEditUserId = async (userId) => {
  // let [results, field] = await connection.execute(
  //   `select * from user where id = ? `,
  //   [userId]
  // );
  let user = {};
  user = await db.User.findOne({
    where: {
      id: userId,
    },
    raw: true,
  });
  return user;
};

let postUpdateUser = async (email, username, userId) => {
  // let [results, field] = await connection.execute(
  //   `update user set email = ? , username = ? where id = ? `,
  //   [email, username, userId]
  // );
  // return results;

  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: userId,
      },
    }
  );
};

module.exports = {
  createNewUser,
  getAllUser,
  deleteUser,
  getEditUserId,
  postUpdateUser,
};
