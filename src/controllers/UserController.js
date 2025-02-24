import { getAllUser } from "../services/userApiService";

const readFunc = async (req, res) => {
  try {
    let data = await getAllUser();

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
      DT: "",
    });
  }
};

const createFunc = async (req, res) => {
  try {
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
      DT: "",
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
      DT: "",
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
