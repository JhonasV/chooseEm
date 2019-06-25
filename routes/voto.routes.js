module.exports = app => {
  const controller = require("../controllers/voto.controller");
  app.get("/api/voto", controller.getAllVotos);

  app.post("/api/voto/seleccion", controller.voterRegister);

  app.post("/api/voto", controller.vote);

  app.get("/api/voto/estadisticas", controller.stactistics);

  app.delete("/api/voto/cancel/:dni", controller.cancelVote);
};
