require("dotenv").config();

const configCors = (app) => {
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    const allowedOrigin = process.env.REACT_URL || "http://localhost:3000"; // Fallback if REACT_URL is not set

    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Allow credentials (cookies, authorization headers)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // If the method is OPTIONS, respond with 200 OK
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // Pass to next layer of middleware
    next();
  });
};

export default configCors;
