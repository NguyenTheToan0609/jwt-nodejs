import { emit } from "nodemon";
import connection from "../configs/connectDB";
var bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

let hashPassWord = (password) => {
  let results = bcrypt.hashSync(password, salt);
  return results;
};

let createNewUser = async (email, password, username) => {
  let hashPassWordUser = hashPassWord(password);

  let [results, field] = await connection.execute(
    `insert into users (email , password , username) VALUES (? , ? , ?)`,
    [email, hashPassWordUser, username]
  );
  return results;
};

let getAllUser = async () => {
  let [results, field] = await connection.execute(`select *from users`);
  return results;
};

let deleteUser = async (userId) => {
  let [results, field] = await connection.execute(
    `delete from users where id = ? `,
    [userId]
  );
  return results;
};

let getEditUserId = async (userId) => {
  let [results, field] = await connection.execute(
    `select * from users where id = ? `,
    [userId]
  );
  let user = results && results.length > 0 ? results[0] : {};
  return user;
};

let postUpdateUser = async (email, username, userId) => {
  let [results, field] = await connection.execute(
    `update users set email = ? , username = ? where id = ? `,
    [email, username, userId]
  );
  return results;
};

module.exports = {
  createNewUser,
  getAllUser,
  deleteUser,
  getEditUserId,
  postUpdateUser,
};
