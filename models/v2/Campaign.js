const mongoose = require("mongoose");
const { Schema } = mongoose;
const Partie = mongoose.model("Partie");
const Result = mongoose.model("Result");

let campaignSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    active: { type: Boolean, required: true },
    state: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    parties: { type: [Partie], required: true },
    results: { type: Result }
  },
  { timestamps }
);

mongoose.model("Campaign", campaignSchema);
