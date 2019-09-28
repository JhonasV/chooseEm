const mongoose = require("mongoose");
const { Schema } = mongoose;

let resultSchema = new Schema({
  votes: { type: Number, required: true },
  Campaign: { type: mongoose.Types.ObjectId, ref: "Campaign", required: true },
  Total: { type: Number, required: true },
  Winner: { type: mongoose.Types.ObjectId, ref: "Partie", required: true }
});

mongoose.model("Result", resultSchema);
