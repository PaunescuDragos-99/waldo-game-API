const mongoose = require("mongoose");
const { Schema } = mongoose;

const LeaderboardSchema = new Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
});

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
