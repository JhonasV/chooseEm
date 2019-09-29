const mongoose = require("mongoose");
const partido = mongoose.model("Partido");

const seedParties = () => {
  new partido({
    nombre_partido: "Money Money",
    nombre_candidato: "Batman",
    avatar_candidato:
      "https://i.pinimg.com/originals/9f/95/1c/9f951c3b62fd23c4c7d051f768ef442e.jpg"
  }).save();

  new partido({
    nombre_partido: "Money Money x2",
    nombre_candidato: "Lex Luthor",
    avatar_candidato:
      "https://images-na.ssl-images-amazon.com/images/I/41%2BhWz5tZLL._SX319_BO1,204,203,200_.jpg"
  }).save();
};

partido
  .find()
  .then(res => {
    if (res.length === 0) seedParties();
  })
  .catch(err => console.error(err));
