const mongoose = require("mongoose");
const authorSchema = mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});
const author = mongoose.model("Author", authorSchema);
module.exports = author;
