const express = require("express");
const app = express();

const morgan = require("morgan");
require("./models/v1");
require("./data/database");
require("./data/inicializador");

/*Configuramos el puerto en el que escuchará el servidor*/
app.set("PORT", process.env.PORT || 5000);
/************ */

/*Middlewares */
app.use(express.json());
// app.use(cors());
app.use(morgan("dev"));
/** */

/*Rutas*/
require("./routes/v1")(app);
/*Archivos estaticos*/
if (process.env.NODE_ENV == "production") {
  // app.use(express.static(path.join(__dirname, "public")));
  const path = require("path");
  // app.use(express.static("client/build"));
  app.use(express.static(path.resolve(__dirname, "./clientApp", "build")));

  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/*Montando el servidor */
app.listen(app.get("PORT"), () =>
  console.log(`Escuchando en el puerto ${app.get("PORT")}`)
);
