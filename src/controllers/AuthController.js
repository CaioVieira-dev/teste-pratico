const Users = require("../model/users");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 60 * 60 * 24 //1 dia
    });
}

module.exports = {
    async newUser(req, res) {
        const { email, password, role } = req.body;
        if (!email || !password || !role) { return res.status(400).send({ error: "Invalid request. Some of required data is missing." }) }

        let user;
        try {
            user = await Users.createUser({
                email: email,
                password: password,
                role: role
            })
        } catch (error) {
            return res.status(400).send({ error: "Registration failed" })
        }

        user.password = undefined;

        return res.status(200).send(
            {
                user,
                token: generateToken({ id: user.id })
            }
        )
    },
    async users(req, res) {

        const users = await Users.getUsers();

        return res.send(users)
    },
    async auth(req, res) {
        const { email, password } = req.body;

        if (!email || !password) { return res.status(400).send({ message: "Invalid request. Some of required data is missing." }) };
        let user;
        try {
            user = await Users.findUser(email)
        }
        catch (e) {
            return res.status(400).send({ message: `Database error. ${e}` })
        };

        if (! await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ message: "Invalid password" })
        }

        user.password = undefined;


        return res.status(200).send({
            user,
            token: generateToken({ id: user.id })
        });
    }

}