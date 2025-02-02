import { registerNewUser } from "../services/UserService";

let getApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

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

module.exports = {
  getApi,
  handleRegister,
};
