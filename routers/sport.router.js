const express = require("express");
const {
  createSport,
  findAllSports,
  findSportById,
} = require("../controllers/sport.controller");
const upload = require("../middlewares/uploadImg");
const {
  validateSportBody,
  buildSportFilter,
} = require("../middlewares/sport.mv");
const { sportShemaCreate } = require("../validations/sport.validation");
const { paginate } = require("../middlewares/pagination.mv");

const sportRouter = express.Router();

sportRouter.post(
  "/",
  validateSportBody(sportShemaCreate),
  upload.single("image"),
  createSport
);
sportRouter.get("/",paginate ,buildSportFilter, findAllSports);
sportRouter.get('/:idSport', findSportById);

module.exports = sportRouter;
