import { createNewRole } from "../services/RoleApiService";

const createFunc = async (req, res) => {
  try {
    let data = await createNewRole(req.body);
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
  createFunc,
};
