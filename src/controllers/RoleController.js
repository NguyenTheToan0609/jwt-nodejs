import {
  createNewRole,
  getAllRole,
  deleteRole,
  getRolesByGroup,
  assignRolesToGroup,
} from "../services/RoleApiService";

const readFunc = async (req, res) => {
  try {
    let data = await getAllRole();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
      DT: "",
    });
  }
};

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

const deleteFunc = async (req, res) => {
  try {
    let data = await deleteRole(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
      DT: "",
    });
  }
};

const getRoleByGroup = async (req, res) => {
  try {
    let id = req.params.groupId;
    let data = await getRolesByGroup(id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
      DT: "",
    });
  }
};

const assignRoleToGroup = async (req, res) => {
  try {
    let data = await assignRolesToGroup(req.body.data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "Lỗi Server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  createFunc,
  readFunc,
  deleteFunc,
  getRoleByGroup,
  assignRoleToGroup,
};
