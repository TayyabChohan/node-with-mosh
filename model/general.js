const mongoose = require("mongoose");
const Joi = require("joi");
const generalSchema =  mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});
const General = mongoose.model("General", generalSchema);
function validateGeneral(genre) {
  const schema = {
    name: Joi.string().min(5).required(),
  };
  return Joi.validate(genre, schema);
}
exports.General = General;
exports.generalSchema = generalSchema;
exports.validate = validateGeneral;
