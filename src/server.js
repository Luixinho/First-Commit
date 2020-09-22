const express = require("express");

const app = express();

const mysql = require("mysql");

app.use(express.static("public"))

//habilitar o uso do req.body
app.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: app,
    noCache: true
})


app.get("/", function (req, res) {

    // console.log(req.query) pegar dados das urls no get 

    return res.render("index.html", { bad: "funciona, please" })

})

// cadastrando dados do formulário no banco de dados
app.post("/savepoint", (req, res) => {

    // req.body: corpo do formulário

    console.log(req.body)

    const query = `
        INSERT INTO gafanhotos (
            nome,
            profissao,
            nascimento,
            sexo,
            peso,
            altura,
            nacionalidade
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.name,
        req.body.profession,
        req.body.birth,
        req.body.sex,
        req.body.weight,
        req.body.height,
        req.body.nationality
    ]

    function afterInsertData(err) {

        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")

        return res.render("index.html")
    }

    connection.query(query, values, afterInsertData)

})

app.get("/results", function (req, res) {

    connection.query("SELECT * FROM gafanhotos;", function (err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log("Conexão bem sucedída")

        return res.render("results.html", { results: rows })
    })

})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadastro'

})


app.listen(3338, function () {
    console.log("rodando o servidor.")
})
