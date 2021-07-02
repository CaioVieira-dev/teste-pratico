const express = require("express");
const server = express();
const routes = require("./routes.js");
const cors = require("cors");

server.use(cors());

//habilitar arquivos estaticos //statics
server.use(express.static("public"));

//habilitar o request.body
server.use(express.urlencoded({ extended: true }))
server.use(express.json());
//routes
server.use(routes)

server.listen(4000, () => console.log("rodando"));

// pro secret do token, pegar um texto aleatorio e gerar um hash em cima dele, o id do usuario é parametro pra gera token
