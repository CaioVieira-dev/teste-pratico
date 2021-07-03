const express = require("express");
const routes = express.Router();
const authMiddleware = require("./middlewares/auth")


const ClassController = require("./controllers/ClassController.js")
const AuthController = require("./controllers/AuthController.js")

//routes.get('/api/modules-and-classes/admin', authMiddleware, ClassController.getData)
routes.get('/api/modules-and-classes', ClassController.getModulesAndClasses)

routes.put('/api/new-user', AuthController.newUser)

routes.post('/api/auth', AuthController.auth)

routes.get('/api/private', authMiddleware, AuthController.validateAuth)

routes.post('/api/new-module', authMiddleware, ClassController.addModule)
routes.post('/api/new-class', authMiddleware, ClassController.addClass)
routes.post('/api/update-module', authMiddleware, ClassController.updateModule)
routes.post('/api/update-class', authMiddleware, ClassController.updateClass)
routes.delete('/api/delete-module', authMiddleware, ClassController.deleteModule)
routes.delete('/api/delete-class', authMiddleware, ClassController.deleteClass)

module.exports = routes;