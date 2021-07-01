const express = require("express");
const routes = express.Router();

const ClassController = require("./controllers/ClassController.js")

routes.get('/api/modules-and-classes', ClassController.getData)


module.exports = routes;