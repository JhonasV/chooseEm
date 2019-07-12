const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/api/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/voto/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/voto/cancel/*", { target: "http://localhost:5000/" }));
};
