const mongoose = require("mongoose");
const { generalSchema } = require("./general");
const Joi = require("joi");
const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  generalId: {
    type: generalSchema,
    required: true,
  },
  numberInstock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});
const Movie = mongoose.model("Movie", movieSchema);
function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).required(),
    generalId: Joi.string().required(),
    numberInstock: Joi.string().min(0).required(),
    dailyRentalRate: Joi.string().min(0).required(),
  };
  return Joi.validate(movie, schema);
}
exports.Movie = Movie;
exports.validate = validateMovie;
