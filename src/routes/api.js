import express from "express";
import apiController from "../controllers/ApiController";
import userController from "../controllers/UserController";
import groupController from "../controllers/GroupController";
import roleController from "../controllers/RoleController";

import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
let router = express.Router();

let initApiRoutes = (app) => {
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogOut);

  router.all("*", checkUserJWT, checkUserPermission);
  router.get("/account", userController.getUserAccount);
  router.get("/user/read", userController.readFunc);
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  router.get("/group/read", groupController.readFunc);

  //roles routes
  router.get("/role/read", roleController.readFunc);
  router.post("/role/create", roleController.createFunc);
  // router.put("/role/update", roleController.updateFunc);
  router.delete("/role/delete", roleController.deleteFunc);
  router.get("/role/by-group/:groupId", roleController.getRoleByGroup);
  router.post("/role/assign-to-group", roleController.assignRoleToGroup);

  return app.use("/api/v1/", router);
};

module.exports = initApiRoutes;
