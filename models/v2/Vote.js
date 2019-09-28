const mongoose = require("mongoose");
const { Schema } = mongoose;

let voteSchema = new Schema(
  {
    campaign: {
      type: mongoose.Types.ObjectId,
      ref: "Campaign",
      required: true
    },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    partie: { type: mongoose.Types.ObjectId, ref: "Partie", required: true }
  },
  { timestamps }
);

mongoose.model("Vote", voteSchema);
