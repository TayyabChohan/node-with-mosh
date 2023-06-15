// const mongoose = require("mongoose");
// const userSchema = new mongoose.Schema({
//   name: String,
//   author: String,
//   tags: {
//     type: Array,
//     validate: {
//       validator: function (v) {
//         return v.length > 0;
//       },
//       message: "The Tag is required",
//     },
//   },
//   date: { type: Date, default: Date.now },
//   isPublished: Boolean,
// });
// const user = mongoose.model("User", userSchema);
// module.exports = user;

const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlenth: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlenth: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlenth: 255,
  },
  isAdmin:Boolean
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id,isAdmin:this.isAdmin }, config.get("jwtPrivateKey"));
  return token;
};
const User = mongoose.model("User", userSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
}
module.exports.User = User;
module.exports.validate = validateUser;
