const Course = require("../model/course");
const Author = require("../model/author");
module.exports.createCourse = async (req, res) => {
  try {
    const { name, author } = req.body;
    const course = new Course({
      name,
      author,
    });
    const savedCourse = await course.save();
    res.status(201).send({ data: savedCourse, message: "course saved" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.createAuthor = async (req, res) => {
  try {
    const { name, bio, website } = req.body;
    const savedAuthor = new Author({
      name,
      bio,
      website,
    });
    const result = await savedAuthor.save();
    res.status(201).send({ result: result });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
module.exports.listCourses = async (req, res) => {
  try {
    const listCourse = await Course.find().select("name author").populate("author");
    res.status(201).send({ data: listCourse });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
