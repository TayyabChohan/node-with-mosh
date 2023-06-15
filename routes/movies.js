const express = require("express");
const Route = express.Router();
const { saveMovie } = require("../controler/movies");
const { saveGeneral } = require("../controler/general");
const { getRentalList,postRentalPros } = require("../controler/rental");

Route.post("/createMovie", saveMovie);
Route.post("/createGeneral", saveGeneral);
Route.get("/getRentalList", getRentalList);
Route.post("/postRentalPros", postRentalPros);
module.exports = Route;
