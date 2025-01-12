let getApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

const handleRegister = (req, res) => {
  console.log("check data ", req.body);
};

module.exports = {
  getApi,
  handleRegister,
};
