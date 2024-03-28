const express = require("express");
const router = express.Router();

const Game = require("../models/Game");
const Leaderboard = require("../models/Leaderboard");
let starTime;

exports.getGames = async (req, res) => {
  const allGames = await Game.find().exec();

  if (!allGames) {
    res.status(404).json({ message: "Error: no games found" });
    return;
  }
  res.status(200).json(allGames);
};

exports.getGame = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Game.findById(id).exec();

  res.status(200).json(postDoc);
  startTime = performance.now();
};

exports.completedGame = async (req, res) => {
  const endTime = performance.now();
  const timeDiff = endTime - startTime;
  const timeInSeconds = timeDiff / 1000;

  const gametime = Math.round((timeInSeconds + Number.EPSILON) * 100) / 100;
  res.status(200).json({ gametime });
};

exports.createScore = async (req, res) => {
  const newScore = new Leaderboard({
    username: req.body.username,
    score: req.body.score,
    game: req.params.id,
  });

  await newScore.save();
  res.status(200).json({ message: "okey" });
};

exports.getScore = async (req, res) => {
  const { id } = req.params;

  try {
    const leaderboardScores = await Leaderboard.find({ game: id })
      .sort({ score: 1 })
      .exec();

    if (!leaderboardScores || leaderboardScores.length === 0) {
      return res.status(404).json({
        message: "Leaderboard scores not found for the specified game ID.",
      });
    }

    res.status(200).json(leaderboardScores);
  } catch (error) {
    console.error("Error fetching leaderboard scores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
