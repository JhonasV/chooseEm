module.exports = app => {
  const controller = require("../../controllers/v1/partido.controller");
  app.get("/api/partido", controller.getAllPartidos);
};
