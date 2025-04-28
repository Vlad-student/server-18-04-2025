const createError = require("http-errors");
const Sport = require("../controllers/sport.controller");
const Athlete = require("../models/Athlete");

module.exports.createAthlete = async (req, res, next) => {
  try {
    const { name, country, birthYear } = req.body;
    const { idSport } = req.params;
    const sport = await Sport.findById(idSport);
    if (!sport) {
      return next(createError(404, "sport not found"));
    }
    const newAthlete = await Athlete.create({
      name,
      country,
      birthYear,
      sportId: idSport,
    });
    res.status(200).send({ data: newAthlete });
  } catch (error) {
    next(createError(400, error.message));
  }
};
