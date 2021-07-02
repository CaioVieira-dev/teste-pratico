const express = require("express");
const routes = express.Router();
const authMiddleware = require("./middlewares/auth")


const ClassController = require("./controllers/ClassController.js")
const AuthController = require("./controllers/AuthController.js")

//routes.get('/api/modules-and-classes/admin', authMiddleware, ClassController.getData)
routes.get('/api/modules-and-classes', authMiddleware, ClassController.getData)

routes.put('/api/new-user', AuthController.newUser)

routes.post('/api/auth', AuthController.auth)

routes.get('/api/private', authMiddleware, AuthController.validateAuth)

module.exports = routes;