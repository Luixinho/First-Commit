const express = require("express");

const app = express();

const mysql = require("mysql");

app.use(express.static("public"))

const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: app,
    noCache: true
})


app.get("/", function (req, res) {

    return res.render("index.html", { bad: "funciona, please" })

})


app.listen(3338, function () {
    console.log("rodando o servidor.")
})
