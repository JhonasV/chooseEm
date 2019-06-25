const mongoose = require("mongoose");
const Voto = mongoose.model("Voto");
const Votante = mongoose.model("Votante");
const Partido = mongoose.model("Partido");

exports.getAllVotos = async (req, res, next) => {
  try {
    //Creamos una instancia de Voto
    let voto = new Voto();
    //Buscamos todos los votos
    let votos = await voto.find();
    //Los retornamos al cliente
    res.json(votos);
    next();
  } catch (err) {
    //Retornamos un json con el error 500 "Error del servidor"
    console.log(err);
    return res
      .json({
        voto: false,
        message: err
      })
      .status(500);
  }
};

exports.voterRegister = async (req, res, next) => {
  try {
    //Buscamos el votante con el DNI ingresado
    let votanteInfo = await Votante.findOne({
      dni: req.body.dni
    });
    //Creamos un objeto con el ID del partido y el ID de votante
    console.log(votanteInfo);
    let voto = {
      _partidoId: req.body.candidateId,
      _votanteId: votanteInfo.id
    };
    //Guardmos el objeto Voto en la coleccion de Voto para procesarlo
    let confirmaacionVoto = await new Voto(voto).save();
    //Comprobamos si el voto se procesó correctamente
    if (confirmaacionVoto) {
      //Si el objeto retorna "true" es porque se agregó correctamente
      res.json({
        voto: true
      });
      // res.redirect("/charts");
    } else {
      //Si el objeto retorna "false" es porque no se agregó correctamente
      res.json({
        voto: false
      });
    }
    next();
  } catch (err) {
    //Retornamos un json con el error 500 "Error del servidor"
    console.log(err);
    return res
      .json({
        voto: false,
        message: err
      })
      .status(500);
  }
};

exports.vote = async (req, res, next) => {
  //Obtenemos los datos del votando envias desde el navegador y creamos un objeto
  let data = {
    nombre: req.body.name,
    dni: req.body.dni,
    fnaciminiento: req.body.birthdate,
    sexo: req.body.sex
  };

  console.log(data);
  try {
    //Buscamos en la colección de votantes si ese DNI ya existe
    let voteExists = await Votante.findOne({
      dni: data.dni
    });
    if (voteExists) {
      //Si existe ese usuario ya ha votado y se lo informamos
      res.json({
        voto: true,
        alreadyVote: true,
        message: "Ya ha votado"
      });
    } else {
      //De lo contario se agrega el voto y le permitimos al usuario continuar
      //con el proceso de votación
      let votante = new Votante(data);
      let newVotante = await votante.save();
      res.json({
        voto: false,
        alreadyVote: false,
        message: "Continue al voto",
        dni: newVotante.dni
      });
    }

    next();
  } catch (err) {
    //Retornamos un json con el error 500 "Error del servidor"
    console.log(err);
    res
      .json({
        voto: false,
        message: err
      })
      .status(500);
  }
};

exports.stactistics = async (req, res, next) => {
  try {
    //Buscamos todos los partidos
    let partidos = await Partido.find();
    //Buscamos todos los votos
    let votos = await Voto.find();
    //Creamos array vacío que se rellenará con las estadísticas
    let estadisticas = [];
    //Recorremos los partidos
    for (let i = 0; i < partidos.length; i++) {
      const partido = partidos[i];
      //Contador que suma cada voto que tenga el id de un candidato
      let cont = 0;
      //Recorremos los partidos
      for (let p = 0; p < votos.length; p++) {
        const infoVoto = votos[p];
        //Comprobabos, si un voto tiene el id de un partido, se suma 1 al
        //contador, por cada vez que se cumple esta condición significa un voto
        //para dicho candidato
        if (infoVoto._partidoId === partido._id.toString()) {
          cont = cont + 1;
        }
      }
      //Llenamos el array con las estadisticas
      let percent = (cont / votos.length) * 100;
      estadisticas.push({
        partido,
        partidoId: partido._id.toString(), //ID del partido
        total_votos: cont, //Los votos de ese partido
        porcentaje: percent.toFixed(2), //Sacamos el porcentaje de votos de ese candidato
        total: votos.length //La cantidad de votos total de todos los partidos
      });
    }
    //Retornamos el array estadísticas

    estadisticas.sort((a, b) => b.total_votos - a.total_votos);

    res.json(estadisticas);
    next();
  } catch (err) {
    //Retornamos un json con el error 500 "Error del servidor"
    console.log(err);
    res
      .json({
        voto: false,
        message: err
      })
      .status(500);
  }
};

exports.cancelVote = async (req, res, next) => {
  const { dni } = req.params;

  try {
    let votante = await Votante.findOneAndRemove({ dni });
    res.json({ isCanceled: votante ? true : false });
    next();
  } catch (error) {
    return res.json(error);
  }
};
