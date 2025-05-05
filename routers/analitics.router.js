const express = require("express");
const {
  countAthletesBySport,
  countAthletesByCountry,
  averageAthletesBySport,
} = require("../controllers/analitics.controller");

const analiticsRouter = express.Router();

analiticsRouter.get("/amount-athletes-by-sport", countAthletesBySport);
analiticsRouter.get("/amount-athletes-by-country", countAthletesByCountry);
analiticsRouter.get("/average-athletes-by-country", averageAthletesBySport);

module.exports = analiticsRouter;
