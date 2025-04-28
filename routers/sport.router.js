const express = require("express");
const {
  createSport,
  findAllSports,
  findSportById,
  deleteSportById,
  updateSportById,
} = require("../controllers/sport.controller");
const upload = require("../middlewares/uploadImg");
const {
  validateSportBody,
  buildSportFilter,
} = require("../middlewares/sport.mv");
const {
  sportShemaCreate,
  sportShemaUpdate,
} = require("../validations/sport.validation");
const { paginate } = require("../middlewares/pagination.mv");
const { createAthlete } = require("../controllers/athlete.controller");

const sportRouter = express.Router();

sportRouter.post(
  "/",
  upload.single("image"),
  validateSportBody(sportShemaCreate),
  createSport
);
sportRouter.get("/", paginate, buildSportFilter, findAllSports);
sportRouter.get("/:idSport", findSportById);
sportRouter.patch( "/:idSport",upload.single("image"), validateSportBody(sportShemaUpdate),  updateSportById);
sportRouter.delete("/:idSport", deleteSportById);

sportRouter.post('/:idSport/athletes', createAthlete)
module.exports = sportRouter;
