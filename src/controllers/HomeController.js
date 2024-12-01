require("dotenv").config();
import {
  createNewUser,
  getAllUser,
  deleteUser,
  getEditUserId,
  postUpdateUser,
} from "../services/HomeService";

let getHomePage = (req, res) => {
  return res.render("homepage.ejs");
};

let handleUserPage = async (req, res) => {
  let results = await getAllUser();
  return res.render("users.ejs", { listUser: results });
};

let handleCreateNewUser = async (req, res) => {
  let { email, password, username } = req.body;
  await createNewUser(email, password, username);
  return res.redirect("/");
};

let handlDeleteUser = async (req, res) => {
  let userId = req.body.userId;
  await deleteUser(userId);
  return res.redirect("/");
};

let handleEditUser = async (req, res) => {
  let userId = req.params.id;
  let results = await getEditUserId(userId);
  return res.render("edit.ejs", { editUser: results });
};

let handleUpdateUser = async (req, res) => {
  let { email, username, userId } = req.body;
  await postUpdateUser(email, username, userId);
  return res.redirect("/");
};

module.exports = {
  getHomePage,
  handleUserPage,
  handleCreateNewUser,
  handlDeleteUser,
  handleEditUser,
  handleUpdateUser,
};
