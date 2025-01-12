import express from "express";
import apiController from "../controllers/ApiController";
let router = express.Router();

let initApiRoutes = (app) => {
  router.get("/test-api", apiController.getApi);
  router.post("/register", apiController.handleRegister);

  return app.use("/api/v1/", router);
};

module.exports = initApiRoutes;
