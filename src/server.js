const express = require("express");

const app = express();

const mysql = require("mysql");

app.use(express.static("public"))

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: app,
    noCache: true
})


app.get("/", function (req, res) {

    return res.render("index.html", { bad: "funciona, please" })

})

app.get("/results", function (req, res) {

    connection.query("SELECT * FROM pessoa;", function (err, rows) {
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
    database: 'testando'

})


app.listen(3338, function () {
    console.log("rodando o servidor.")
})
