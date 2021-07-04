const express = require("express");
const routes = express.Router();
const authMiddleware = require("./middlewares/auth")


const ClassController = require("./controllers/ClassController.js")
const AuthController = require("./controllers/AuthController.js")

//routes.get('/api/modules-and-classes/admin', authMiddleware, ClassController.getData)
routes.get('/api/modules-and-classes', ClassController.getModulesAndClasses)

routes.put('/api/new-user', AuthController.newUser)

routes.post('/api/auth', AuthController.auth) //valida se está autenticado como usuario ou administrador

routes.get('/api/validate-admin', authMiddleware, AuthController.validateAuth) //valida se está autenticado como administrador

routes.put('/api/new-module', authMiddleware, ClassController.addModule)
routes.put('/api/new-class', authMiddleware, ClassController.addClass)
routes.post('/api/update-module', authMiddleware, ClassController.updateModule)
routes.post('/api/update-class', authMiddleware, ClassController.updateClass)
routes.delete('/api/delete-module', authMiddleware, ClassController.deleteModule)
routes.delete('/api/delete-class', authMiddleware, ClassController.deleteClass)

module.exports = routes;