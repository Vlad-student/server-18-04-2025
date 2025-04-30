const express = require("express");
const {
  createAthlete,
  getAllAthletes,
  getAthleteById,
} = require("../controllers/athlete.controller");
const upload = require("../middlewares/uploadImg");
const {
  buildAthleteFilter,
  validateAthlete,
} = require("../middlewares/athlete.ms");
const { paginate } = require("../middlewares/pagination.mv");
const { athleteSchemaPost } = require("../validations/athlete.validations");

const athleteRouter = express.Router();
athleteRouter.post(
  "/",
  upload.single("avatar"),
  validateAthlete(athleteSchemaPost),
  createAthlete
);
athleteRouter.get("/", paginate, buildAthleteFilter, getAllAthletes);
athleteRouter.get("/:idAthlete", getAthleteById);

module.exports = athleteRouter;
