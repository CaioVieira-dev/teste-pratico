const Module = require('../model/module')
const Users = require("../model/users");

async function validateUserRole(id) {
    const user = await Users.findUserById(id);
    if (user.role === 'admin') {
        return "admin"
    } else if (user.role === 'user') {
        return "user"
    } else {
        throw new Error({ message: "database error" })
    }

}

module.exports = {
    async addModule(req, res) {
        let userRole;
        try {
            userRole = await validateUserRole(req.userId)
        } catch (err) {
            console.error(err)
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }

        if (userRole !== 'admin') {
            return res.status(403).send({ message: "Invalid request. You do not have permission to use this function" })
        }

        const { name } = req.body;

        if (!name) { return res.status(400).send({ message: "Invalid request. Some of required data is missing." }) }
        try {
            await Module.createModule({ name });
        } catch (e) {
            console.error(e)
            return res.status(500).send({ message: "Database Error" })
        }

        return res.status(201).send({ message: "New module added successfully" })
    },
    async addClass(req, res) {

        let userRole;
        try {
            userRole = await validateUserRole(req.userId)
        } catch (err) {
            console.error(err)
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }

        if (userRole !== 'admin') {
            return res.status(403).send({ message: "Invalid request. You do not have permission to use this function" })
        }

        let { classData, moduleId } = req.body;


        if (!classData ||
            !moduleId ||
            !classData.name ||
            !classData.date) {
            return res.status(400).send({ message: "Invalid request. Some of required data is missing." })
        }



        classData.id = await Module.getNextClassId(moduleId);

        try {
            await Module.createClass({ classData, moduleId })
        } catch (error) {
            console.error(err)
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }

        return res.status(201).send({ message: "New class added successfully" })
    },
    async updateModule(req, res) {
        let userRole;
        try {
            userRole = await validateUserRole(req.userId)
        } catch (err) {
            console.error(err)
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }
        if (userRole !== 'admin') {
            return res.status(403).send({ message: "Invalid request. You do not have permission to use this function" })
        }


        const { name, moduleId } = req.body;
        if (!name || !moduleId) {
            return res.status(400).send({ message: "Invalid request. Some of required data is missing." })
        }
        try {
            await Module.updateModule({ name, moduleId });
        } catch (e) {
            console.error(e)
            return res.status(500).send({ message: "Database Error" })
        }

        return res.status(200).send({ message: "Module updated successfully" })

    },
    async updateClass(req, res) {
        let userRole;
        try {
            userRole = await validateUserRole(req.userId)
        } catch (err) {
            console.error(err)
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }

        if (userRole !== 'admin') {
            return res.status(403).send({ message: "Invalid request. You do not have permission to use this function" })
        }

        let { classData, moduleId } = req.body;

        if (!classData ||
            !moduleId ||
            !classData.name ||
            !classData.date ||
            !classData.id) {
            return res.status(400).send({ message: "Invalid request. Some of required data is missing." })
        }


        try {
            await Module.updateClass({
                name: classData.name,
                id: classData.id,
                date: classData.date,
                moduleId: moduleId
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }

        return res.status(200).send({ message: "Class updated successfully" })

    },
    async deleteModule(req, res) {
        let userRole;
        try {
            userRole = await validateUserRole(req.userId)
        } catch (err) {
            console.error(err)
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }

        if (userRole !== 'admin') {
            return res.status(403).send({ message: "Invalid request. You do not have permission to use this function" })
        }

        const { moduleId } = req.body;

        if (!moduleId) {
            return res.status(400).send({ message: "Invalid request. Some of required data is missing." })
        }

        try {
            await Module.deleteModule(moduleId);
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }

        return res.status(200).send({ message: "Module deleted successfully" })

    },
    async deleteClass(req, res) {
        let userRole;
        try {
            userRole = await validateUserRole(req.userId)
        } catch (err) {
            console.error(err)
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }

        if (userRole !== 'admin') {
            return res.status(403).send({ message: "Invalid request. You do not have permission to use this function" })
        }

        const { moduleId, id } = req.body;

        if (!moduleId || !id) {
            return res.status(400).send({ message: "Invalid request. Some of required data is missing." })
        }

        try {
            await Module.deleteClass({ classId: id, moduleId: moduleId })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }

        return res.status(200).send({ message: "Class deleted successfully" })

    },
    async getModulesAndClasses(req, res) {
        let modulesAndClasses;
        try {
            modulesAndClasses = await Module.getModulesAndClasses();
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }

        if (!modulesAndClasses) {
            return res.status(500).send({ message: "Something went wrong. Please try again" })
        }

        return res.status(200).send(modulesAndClasses)
    }
}