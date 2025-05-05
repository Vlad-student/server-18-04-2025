const fs = require("fs/promises");
const path = require("path");
const createError = require("http-errors");
const Sport = require("../models/Sport");
const Athlete = require("../models/Athlete");
const CONSTANTS = require("../constants");

module.exports.createAthlete = async (req, res, next) => {
  try {
    const { name, country, birthYear, sportId } = req.body;
    const sport = await Sport.findById(sportId);
    if (!sport) {
      return next(createError(404, "sport not found"));
    }
    const avatar = req.file
      ? `/${CONSTANTS.UPLOAD_FOLDER}${req.file.filename}`
      : null;
    const newAthlete = await Athlete.create({
      name,
      country,
      birthYear,
      sportId,
      avatar,
    });
    res.status(201).send({ data: newAthlete });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.getAllAthletes = async (req, res, next) => {
  try {
    const { limit, skip } = req.pagination;
    const athletes = await Athlete.find(req.filter)
      .populate({
        path: "sportId",
        select: "name isOlimpic",
      })
      .skip(skip)
      .limit(limit);
    res.status(200).send({ data: athletes });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.getAthleteById = async (req, res, next) => {
  try {
    const athlete = await Athlete.findById(req.params.idAthlete).populate({
      path: "sportId",
      select: "name",
    });
    if (!athlete) {
      return res.status(400).send("athlete not found");
    }
    res.status(200).send({ data: athlete });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.updateAthleteById = async (req, res, next) => {
  try {
    const { idAthlete } = req.params;
    const { name, country, birthYear, sportId } = req.body;
    const athlete = await Athlete.findById(idAthlete);
    if (!athlete) {
      return next(createError(400, error.message));
    }
    if (sportId) {
      const sport = await Sport.findById(sportId);
      if (!sport) {
        return next(createError(400, "sport ID not found"));
      }
    }
    athlete.name = name || athlete.name;
    athlete.country = country || athlete.country;
    athlete.birthYear = birthYear || athlete.birthYear;
    athlete.sportId = sportId || athlete.sportId;
    const updateAthlete = await athlete.save();
    res.status(200).send({ data: updateAthlete });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteAthleteById = async (req, res, next) => {
  try {
    const { idAthlete } = req.params;
    const deletedAthlete = await Athlete.findByIdAndDelete(idAthlete);
    if (!deletedAthlete) {
      return next(createError(400, "athlete not found"));
    }
    if (deletedAthlete.avatar) {
      const avatarPath = path.join(__dirname, "..", deletedAthlete.avatar);
      await findSportById.unlink(avatarPath);
    }
    res.status(200).send({ data: deletedAthlete });
  } catch (error) {
    next(error);
  }
};
