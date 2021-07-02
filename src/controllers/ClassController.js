

const data = [
    {
        id: 1,
        module: "Introdução e Preparatório",
        classes: [
            {
                name: "Iniciando como um programador(a) Devaria",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 2",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 3",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 4",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 5",
                date: "21/06 às 19:30"
            },
        ],
    },
    {
        id: 2,
        module: "Conceito de Sistemas",
        classes: [
            {
                name: "Iniciando como um programador(a) Devaria",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 2",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 3",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 4",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 5",
                date: "21/06 às 19:30"
            },
        ],
    },
    {
        id: 3,
        module: "Infraestrutura",
        classes: [
            {
                name: "Iniciando como um programador(a) Devaria",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 2",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 3",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 4",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 5",
                date: "21/06 às 19:30"
            },
        ],
    },
    {
        id: 4,
        module: "Lógica de programação",
        classes: [{
            name: "Iniciando como um programador(a) Devaria",
            date: "21/06 às 19:30"
        }],
    },
    {
        id: 5,
        module: "Banco de Dados",
        classes: [
            {
                name: "Iniciando como um programador(a) Devaria",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 2",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 3",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 4",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 5",
                date: "21/06 às 19:30"
            },
        ],
    },
    {
        id: 6,
        module: "Projeto Frontend",
        classes: [{
            name: "Iniciando como um programador(a) Devaria",
            date: "21/06 às 19:30"
        }],
    },
    {
        id: 7,
        module: "Projeto Mobile",
        classes: [
            {
                name: "Iniciando como um programador(a) Devaria",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 2",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 3",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 4",
                date: "21/06 às 19:30"
            },
            {
                name: "Aula 5",
                date: "21/06 às 19:30"
            },
        ],
    },
    {
        id: 8,
        module: "Operação e Sustentação",
        classes: [{
            name: "Iniciando como um programador(a) Devaria",
            date: "21/06 às 19:30"
        }],
    },

]


module.exports = {
    getData(req, res) {
        // return res.send({ data, user: req.userId });
        return res.send(data);
    }
}