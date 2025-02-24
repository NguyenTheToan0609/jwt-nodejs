import express from "express";
import homeController from "../controllers/HomeController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/home", homeController.getHomePage);
  router.get("/", homeController.handleUserPage);
  router.post("/create-new-user", homeController.handleCreateNewUser);
  router.post("/delete-user", homeController.handlDeleteUser);
  router.get("/edit-user/:id", homeController.handleEditUser);
  router.post("/update-user", homeController.handleUpdateUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
