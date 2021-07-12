const express = require("express");
const routes = express.Router();
const authMiddleware = require("./backend/middlewares/auth")


const ClassController = require("./backend/controllers/ClassController.js")
const AuthController = require("./backend/controllers/AuthController.js")


routes.get('/api/modules-and-classes', ClassController.getModulesAndClasses)

routes.put('/api/new-user', AuthController.newUser)
routes.put('/api/new-admin', authMiddleware, AuthController.newAdmin)

routes.post('/api/auth', AuthController.auth)

routes.get('/api/validate-admin', authMiddleware, AuthController.validateAuth)

routes.put('/api/new-module', authMiddleware, ClassController.addModule)
routes.put('/api/new-class', authMiddleware, ClassController.addClass)
routes.post('/api/update-module', authMiddleware, ClassController.updateModule)
routes.post('/api/update-class', authMiddleware, ClassController.updateClass)
routes.delete('/api/delete-module', authMiddleware, ClassController.deleteModule)
routes.delete('/api/delete-class', authMiddleware, ClassController.deleteClass)

module.exports = routes;