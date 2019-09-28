module.exports = app => {
  require("./partido.routes")(app);
  require("./voto.routes")(app);
};
