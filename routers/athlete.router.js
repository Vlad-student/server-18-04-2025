const express = require("express");
const {
  createAthlete,
  getAllAthletes,
  getAthleteById,
} = require("../controllers/athlete.controller");
const upload = require("../middlewares/uploadImg");

const athleteRouter = express.Router();
athleteRouter.post("/", upload.single("avatar"), createAthlete);
athleteRouter.get("/", getAllAthletes);
athleteRouter.get("/:idAthlete", getAthleteById);

module.exports = athleteRouter;
