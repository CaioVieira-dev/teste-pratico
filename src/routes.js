const express = require("express");
const routes = express.Router();
//const authMiddleware = require("./middlewares/auth")


const ClassController = require("./controllers/ClassController.js")
const AuthController = require("./controllers/AuthController.js")

//routes.get('/api/modules-and-classes/admin', authMiddleware, ClassController.getData)
routes.get('/api/modules-and-classes', ClassController.getData)

routes.put('/api/new-user', AuthController.newUser)

routes.post('/api/auth', AuthController.auth)

module.exports = routes;