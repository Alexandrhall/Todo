const express = require("express");
const exphbs = require("express-handlebars");
const tasks = require("./data/tasks.js");

const app = express();

app.engine(
    "hbs",
    exphbs.engine({
        defaultLayout: "main",
        extname: ".hbs",
    })
);

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home", { tasks });
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
