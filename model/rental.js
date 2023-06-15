const mongoose = require("mongoose");
const Joi = require("joi");
const { customerSchema } = require("./customer");
const rentalSchema = mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      customerName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },

      phone: {
        type: String,
        required: true,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      //   generalId: {
      //     type: generalSchema,
      //     required: true,
      //   },
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
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateRentered: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});
const Rental = mongoose.model("Rental", rentalSchema);
function validateRental(rental) {
  const schema = {
    customerId: Joi.string().min(5).required(),
    movieId: Joi.string().min(5).required(),
  };
  return Joi.validate(rental, schema,);
}
exports.Rental = Rental;
exports.validate = validateRental;
exports.rentalSchema = rentalSchema;
