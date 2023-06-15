const express = require("express");
const { getCourses, saveCourses } = require("../controler/user");
const {
  createCourse,
  createAuthor,
  listCourses,
} = require("../controler/course");
const { saveCustomer } = require("../controler/customer");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Route = express.Router();
Route.get("/getCourses", [auth, admin], getCourses);
Route.post("/saveCourses", saveCourses);
Route.post("/createCourse", createCourse);
Route.post("/createAuthor", createAuthor);
Route.get("/listCourses", listCourses);
Route.post("/saveCustomer", saveCustomer);
module.exports = Route;
// const courses = [
//   { id: 1, name: "course1" },
//   { id: 2, name: "course2" },
//   { id: 3, name: "course3" },
//   { id: 4, name: "course4" },
// ];

// // route.get("/", (req, res) => {
// //   res.send(courses);
// // });
// // route.get("/:id", (req, res) => {
// //   const course = courses.find((item) => item.id === parseInt(req.params.id));
// //   if (!course) return res.status(404).send("Course is not found at given Id");
// //   res.status(201).send(course);
// // });
// route.post("/", (req, res) => {
//   const userSchema = {
//     name: Joi.string().min(3).required(),
//   };
//   const result = Joi.validate(req.body, userSchema);
//   if (result.error) return res.status(400).send(result.error.message);

//   const course = {
//     id: courses.length + 1,
//     name: req.body.name,
//   };
//   courses.push(course);
//   res.send({
//     courses: courses,
//     course: course,
//   });
// });
// route.delete("/:id", (req, res) => {
//   const course = courses.find((item) => item.id === parseInt(req.params.id));
//   if (!course) return res.status(404).send("Course is not found at given Id");
//   const index = courses.indexOf(course);
//   courses.slice(index, 1);
//   res.status(201).send({
//     course: course,
//     courses: courses,
//   });
// });
// route.put("/:id", (req, res) => {
//   const course = courses.find((item) => item.id === parseInt(req.params.id));
//   if (!course) return res.status(404).send("Course is not found at given Id");
// });
