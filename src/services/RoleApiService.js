import { where } from "sequelize/lib/sequelize";
import db from "../models/index";

const createNewRole = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    const persist = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );

    if (persist.length === 0) {
      return {
        EM: "Nothing to create ... ",
        EC: 0,
        DT: [],
      };
    } else {
      await db.Role.bulkCreate(persist);

      return {
        EM: `Create success: ${persist.length} roles ...`,
        EC: 0,
        DT: persist,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from Server",
      EC: 1,
      DT: [],
    };
  }
};

const getAllRole = async () => {
  try {
    let roles = await db.Role.findAll({
      order: [["id", "DESC"]],
    });
    if (roles) {
      return {
        EM: "get data role success",
        EC: 0,
        DT: roles,
      };
    } else {
      return {
        EM: "get data role success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from Server",
      EC: 1,
      DT: [],
    };
  }
};

const deleteRole = async (id) => {
  try {
    let roles = await db.Role.findOne({
      where: { id: id },
    });
    if (roles) {
      await roles.destroy();
    }
    return {
      EM: "Delete role success",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from Server",
      EC: 1,
      DT: [],
    };
  }
};

const getRolesByGroup = async (groupId) => {
  try {
    if (!groupId) {
      return {
        EM: "not found groupId",
        EC: 1,
        DT: [],
      };
    }
    let roles = await db.Group.findOne({
      where: { id: groupId },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });
    return {
      EM: "get all role success",
      EC: 0,
      DT: roles,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from Server",
      EC: 2,
      DT: [],
    };
  }
};

module.exports = {
  createNewRole,
  getAllRole,
  deleteRole,
  getRolesByGroup,
};
