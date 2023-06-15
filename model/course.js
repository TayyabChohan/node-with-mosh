const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

const course = mongoose.model("Course", courseSchema);
module.exports = course;
