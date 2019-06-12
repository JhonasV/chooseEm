const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
require("./models");
require("./data/database");
require("./data/inicializador");

/*Configuramos el puerto en el que escuchará el servidor*/
app.set("PORT", process.env.PORT || 5000);
/************ */

/*Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
/** */

/*Rutas*/
require("./routes/partido.routes")(app);
require("./routes/voto.routes")(app);
/*Archivos estaticos*/
app.use(express.static(path.join(__dirname, "public")));

/*Montando el servidor */
app.listen(app.get("PORT"), () =>
  console.log(`Escuchando en el puerto ${app.get("PORT")}`)
);
