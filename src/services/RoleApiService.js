import db from "../models/index";

const createNewRole = async (roles) => {
  try {
    // Fetch all existing roles in the database
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    // Filter out the roles that already exist in the database
    const persist = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );

    // If no new roles need to be created
    if (persist.length === 0) {
      return {
        EM: "Nothing to create ... ",
        EC: 0,
        DT: [],
      };
    } else {
      // Create the new roles in the database
      await db.Role.bulkCreate(persist);

      return {
        EM: `Create success: ${persist.length} roles ...`,
        EC: 0,
        DT: persist, // Returning the created roles as data
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

module.exports = {
  createNewRole,
};
