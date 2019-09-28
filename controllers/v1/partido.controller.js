const mongoose = require("mongoose");
const Partido = mongoose.model("Partido");

exports.getAllPartidos = async (req, res, next) => {
  try {
    let partidos = await Partido.find();
    res.json(partidos);
    next();
  } catch (err) {
    console.log(err);
    return res
      .json({
        voto: false,
        message: err
      })
      .status(500);
  }
};
