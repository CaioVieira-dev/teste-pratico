const Database = require("./config")

const initDb = {
    async init() {   //sempre que for usar await, ele tem que estar dentro de uma 
        //função async (assincrona)
        const db = await Database()  //iniciar a conexão com o banco de dados
        //a cont db pega or resultado da inicialização(a conexão)
        //await para fazer o codigo esperar o banco de dados terminar de abrir
        //antes de continuar o codigo para nao bugar o resto do codigo
        await db.exec(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT
        )`)
        await db.close()
    }
}

initDb.init()