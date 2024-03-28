const mongoose = require("mongoose");

const { Schema } = mongoose;

const GameSchema = new Schema({
  title: String,
  imageURL: String,
  character: [
    {
      name: { type: String, required: true },
      locationX: { type: Number, required: true },
      locationY: { type: Number, requiired: true },
    },
  ],
  Score: String,
});

module.exports = mongoose.model("Game", GameSchema);
