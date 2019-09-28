const mongoose = require("mongoose");
const { Schema } = mongoose;

let userSchema = new Schema(
  {
    nickname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps }
);

mongoose.model("User", userSchema);
