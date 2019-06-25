const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose
  .connect(keys.DATABASE_URI, { useNewUrlParser: true }, () => {
    console.log("conectado a mongodb");
  })
  .catch(err => {
    console.error(err);
  });
