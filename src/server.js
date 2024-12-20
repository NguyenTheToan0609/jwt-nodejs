import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import webRoutes from "./routes/web";
require("dotenv").config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view Engine
viewEngine(app);

//config web routes
webRoutes(app);

let port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log("App is running at the port: " + port);
});
