const mongoose = require("mongoose");

const { Schema } = mongoose;

const partieSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    logo: { type: String }
  },
  { timestamps }
);

mongoose.model("Partie", partieSchema);
