import express from "express";
import apiController from "../controllers/ApiController";
import userController from "../controllers/UserController";
import groupController from "../controllers/GroupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
let router = express.Router();

let initApiRoutes = (app) => {
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get(
    "/user/read",
    checkUserJWT,
    checkUserPermission,
    userController.readFunc
  );
  router.post(
    "/user/create",
    checkUserJWT,
    checkUserPermission,
    userController.createFunc
  );
  router.put(
    "/user/update",
    checkUserJWT,
    checkUserPermission,
    userController.updateFunc
  );
  router.delete(
    "/user/delete",
    checkUserJWT,
    checkUserPermission,
    userController.deleteFunc
  );

  router.get("/group/read", groupController.readFunc);

  return app.use("/api/v1/", router);
};

module.exports = initApiRoutes;
