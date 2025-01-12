import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import webRoutes from "./routes/web";
import apiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 8081;

//config cors
configCors(app);

//config view Engine
viewEngine(app);

//config web routes
webRoutes(app);

//config api routes
apiRoutes(app);

app.listen(port, () => {
  console.log("App is running at the port: " + port);
});
