const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.get("/", gameController.getGames);
router.get("/game/:id", gameController.getGame);
router.get("/game/:id/completedGame", gameController.completedGame);
router.get("/leaderboard/:id", gameController.getScore);
router.post("/game/:id/leaderboard", gameController.createScore);
module.exports = router;
