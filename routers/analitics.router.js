const express = require("express");
const {
  countAthletesBySport,
  countAthletesByCountry,
  averageAthletesBySport,
  countSportsByCountry,
} = require("../controllers/analitics.controller");

const analiticsRouter = express.Router();

analiticsRouter.get("/amount-athletes-by-sport", countAthletesBySport);
analiticsRouter.get("/amount-athletes-by-country", countAthletesByCountry);
analiticsRouter.get("/average-athletes-by-country", averageAthletesBySport);
analiticsRouter.get("/amount-sports-by-country", countSportsByCountry);

module.exports = analiticsRouter;
