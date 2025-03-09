import req from "express/lib/request";
import { registerNewUser, handleUserLogin } from "../services/UserService";
require("dotenv").config();
const handleRegister = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.username ||
      !req.body.phone ||
      !req.body.password
    ) {
      return res.status(200).json({
        EM: "Chua dien day du thong tin",
        EC: 1,
      });
    }
    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Mat khau phai lon hin 4 ky tu",
        EC: 3,
      });
    }
    let data = await registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await handleUserLogin(req.body);
    if (data && data.DT && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console(error);
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
    });
  }
};

const handleLogOut = (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "ok",
      EC: 0,
      DT: "",
    });
  } catch (error) {
    console(error);
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
    });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogOut,
};
