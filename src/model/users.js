const Database = require('../database/config');
const bcrypt = require('bcryptjs')

module.exports = {
    async getUsers() {
        const db = await Database();

        const users = await db.all(`SELECT * FROM users`)

        await db.close();

        return users.map(user => ({
            id: user.id,
            email: user.email,
            password: user.password,
            role: user.role
        }))
    },
    async findUser(email) {
        const db = await Database();
        let user;
        try {
            user = await db.get(`SELECT * FROM users WHERE email = "${email}"`);
        } catch (e) {
            throw new Error(e)
        }
        if (user === undefined) { throw new Error("User not found") }

        return {
            id: user.id,
            email: user.email,
            password: user.password,
            role: user.role,
        }
    },

    async createUser(newUser) {

        const { email, password, role } = newUser;

        const hash = await bcrypt.hash(password, 10);


        const db = await Database();

        try {
            await db.run(`INSERT INTO users(
                email,
                password,
                role        
            ) VALUES (
                "${email}",
                "${hash}",
                "${role}"
            )`)
        } catch (error) {
            throw new Error({ message: "database error" })
        }

        const user = await db.get(`SELECT * FROM users WHERE email = "${email}"`);

        await db.close()

        return user
    },

}