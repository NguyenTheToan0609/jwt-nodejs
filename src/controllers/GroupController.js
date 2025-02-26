import { getGroup } from "../services/GroupService";

const readFunc = async (req, res) => {
  try {
    let data = await getGroup();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  readFunc,
};
