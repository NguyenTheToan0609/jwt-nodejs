import db from "../models/index";
const getGroup = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "ASC"]],
    });

    if (data) {
      return {
        EM: "get data success",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: "get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "get data wrong",
      EC: 0,
      DT: "",
    };
  }
};

module.exports = {
  getGroup,
};
