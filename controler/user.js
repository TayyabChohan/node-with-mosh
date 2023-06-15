const { User, validate } = require("../model/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
];
module.exports.getCourses = async (req, res) => {
  const { name, author, tags, isPublished, date } = req.body;
  try {
    const getUser = await User.find({ name: "tayyab" })
      .limit(8)
      .sort({ name: 1 })
      .select({ name: 1, tags: -1 });
    if (getUser) {
      res.status(201).send(getUser);
    }
    console.log(getUser);
  } catch (err) {
    res.status(500).send(Error.message);
  }
};

module.exports.saveCourses = async (req, res) => {
  const { name, author, tags, isPublished, date } = req.body;
  try {
    const course = new User({
      name: name,
      author: author,
      tags: tags,
      isPublished: isPublished,
      date,
    });
    const savedCourse = await course.save();
    res.status(201).send({ data: savedCourse });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password,isAdmin } = req.body;
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    let isUser = await User.findOne({ email: email });
    if (isUser)
      return res.status(400).send({ result: "User is already registered" });
    const salt = await bcrypt.genSalt(10);
    const user = new User({
      name: name,
      email: email,
      isAdmin:true,
      password: await bcrypt.hash(password, salt),
    });
    const token = user.generateAuthToken();
    const savedUser = await user.save();
    await res
      .status(200)
      .header("x-header-auth", token)
      .send({ result: savedUser, token: token });
  } catch (err) {
    res.status(500).send({ result: err.message });
  }
};
module.exports.loginUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    let isUser = await User.findOne({ email: email });
    if (!isUser)
      return res.status(400).send({ result: "Invalid userName or password" });

    const validPassword = await bcrypt.compare(password, isUser.password);
    if (!validPassword)
      return res.status(400).send({ result: "Password Does Not Match" });
    const token = isUser.generateAuthToken();
    res
      .status(200)
      .header("x-header-auth", token)
      .send({
        result: { name: isUser.name, email: isUser.email, token: token },
      });
  } catch (err) {
    res.status(500).send({ result: err.message });
  }
  function validateLogin(user) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(user, schema);
  }
};
