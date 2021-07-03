const Database = require('../database/config');

module.exports = {
    async createModule(newModule) {
        const { name } = newModule;

        const db = await Database();

        try {
            await db.run(`INSERT INTO modules (name) VALUES ("${name}")`);
        } catch (e) {
            console.error(e)
            await db.close();
            throw new Error({ message: "database error" })
        }
        await db.close()
    },
    async createClass(newClass) {
        const { classData, moduleId } = newClass;
        const db = await Database();
        try {
            let currentClasses = await db.get(`SELECT classes FROM modules WHERE id=${moduleId}`);

            if (currentClasses.classes === null) {
                currentClasses.classes = "[]";
            }

            let classes = JSON.parse(currentClasses.classes);
            classes.push(classData);

            classes = JSON.stringify(classes);

            await db.run(`UPDATE modules 
            SET classes = '${classes}' 
            WHERE id=${moduleId}`);
        } catch (e) {
            console.error(e)
            await db.close();
            throw new Error({ message: "database error" })
        }
        await db.close();
    },
    async updateModule(updatedModule) {
        const { name, moduleId } = updatedModule;

        const db = await Database();
        try {
            await db.run(`UPDATE modules SET name ='${name}' WHERE id=${moduleId}`)
        } catch (e) {
            console.error(e)
            await db.close();
            throw new Error({ message: "database error" })
        }
        await db.close();
    },
    async updateClass(updatedClass) {
        const { name, id, date, moduleId } = updatedClass;
        const db = await Database();
        try {
            let currentClasses = await db.all(`SELECT classes FROM modules
                            WHERE id=${moduleId}`)
            if (currentClasses.classes === null) {
                currentClasses.classes = "[]";
            }

            let classes = JSON.parse(currentClasses[0].classes);
            classes = classes.map((item) => {
                if (item.id === id) {
                    return {
                        id: item.id,
                        name: name,
                        date: date
                    }
                }
                return item;
            });
            classes = JSON.stringify(classes);

            await db.run(`UPDATE modules SET classes='${classes}' WHERE id=${moduleId}`)


        } catch (error) {
            console.error(error)
            await db.close();
            throw new Error({ message: "database error" })
        }
        await db.close();
    },
    async deleteModule(moduleId) {
        const db = await Database();
        db.run(`DELETE FROM modules WHERE id=${moduleId}`)
        await db.close()
    },
    async deleteClass(classInfo) {
        const { classId, moduleId } = classInfo;
        const db = await Database();
        try {
            let currentClasses = await db.get(`SELECT classes FROM modules
                            WHERE id=${moduleId}`)
            if (currentClasses.classes === null &&
                currentClasses[0].classes === null) {
                await db.close();
                return;
            }

            let classes = JSON.parse(currentClasses.classes);

            classes = classes.filter(item => item.id !== classId);
            classes = JSON.stringify(classes);

            await db.run(`UPDATE modules SET classes='${classes}' WHERE id=${moduleId}`)

        } catch (error) {
            console.error(error)
            await db.close();
            throw new Error({ message: "database error" })
        }
        await db.close();
    },
    async getModulesAndClasses() {
        const db = await Database();
        const modulesAnClasses = await db.all(`SELECT * FROM modules`);
        await db.close();
        return modulesAnClasses.map(item => {
            if (item.classes === null) {
                return {
                    id: item.id,
                    name: item.name,
                    classes: []
                }
            }
            return {
                id: item.id,
                name: item.name,
                classes: JSON.parse(item.classes)
            }
        })
    },
    async getNextClassId(moduleId) {
        const db = await Database();
        let classes;
        try {
            let currentClasses = await db.get(`SELECT classes FROM modules
                            WHERE id=${moduleId}`)

            if (currentClasses.classes === null) {

                currentClasses.classes = "[]";

            }
            classes = JSON.parse(currentClasses.classes);
        } catch (error) {
            // console.error(error)
            await db.close()
            throw new Error({ message: "database error" })
        }
        await db.close();

        return classes[classes.length - 1].id + 1;
    }
}