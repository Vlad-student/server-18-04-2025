const createError = require("http-errors");
const Sport = require("../models/Sport");
const CONSTANTS = require("../constants");

module.exports.createSport = async (req, res, next) => {
  try {
    const image = req.file
      ? `/${CONSTANTS.UPLOAD_FOLDER}${req.file.filename}`
      : null;
    const body = { ...req.body, image };
    console.log(body);
    const newSport = await Sport.create(body);
    res.status(201).send({ data: newSport });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.findAllSports = async (req, res, next) => {
  try {
    const { limit, skip } = req.pagination;
    const sports = await Sport.find(req.filter).skip(skip).limit(limit);
    res.status(200).send({ data: sports });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports.findSportById = async (req, res, next) => {
  try {
    const sport = await Sport.findById(req.params.idSport);
    if(!sport){
      return res.status(400).send('sport not found');
    };
    res.status(200).send({data: sport});
  } catch (error) {
  next(error);
  }
};
