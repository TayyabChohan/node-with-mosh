const express = require("express");
const Route = express.Router();
const { registerUser, loginUser } = require("../controler/user");
Route.post("/registerUser", registerUser);
Route.post("/loginUser", loginUser);
module.exports = Route;
