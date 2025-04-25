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

const sportRouter = express.Router();

sportRouter.post(
  "/",
  validateSportBody(sportShemaCreate),
  upload.single("image"),
  createSport
);
sportRouter.get("/", paginate, buildSportFilter, findAllSports);
sportRouter.get("/:idSport", findSportById);
sportRouter.patch( "/:idSport", validateSportBody(sportShemaUpdate), upload.single("image"), updateSportById);
sportRouter.delete("/:idSport", deleteSportById);

module.exports = sportRouter;
