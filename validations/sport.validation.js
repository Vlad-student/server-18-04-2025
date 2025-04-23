const yup = require("yup");

const sportShemaCreate = yup.object({
  name: yup
    .string()
    .trim()
    .matches(/^[A-z][a-z]{2,63}$/)
    .required(),
  isOlimpic: yup.boolean(),
});

const sportShemaUpdate = yup.object({
  name: yup
    .string()
    .trim()
    .matches(/^[A-z][a-z]{2,63}$/),
  isOlimpic: yup.boolean(),
});

module.exports = { sportShemaCreate, sportShemaUpdate };
