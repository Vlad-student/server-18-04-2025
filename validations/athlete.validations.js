const yup = require("yup");
const CONSTANTS = require("../constants");

const athleteSchemaPost = yup.object({
  name: yup.string().trim().min(6).max(250).required(),
  country: yup.string().trim().oneOf(CONSTANTS.COUNTRIES),
  minYear: yup
    .number()
    .min(1985)
    .max(new Date().getFullYear() - 15)
    .required(),
  maxYear: yup.string().required(),
});

module.exports = {athleteSchemaPost};