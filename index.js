const express = require("express");
const exphbs = require("express-handlebars");
const tasks = require("./data/tasks.js");
const fs = require("fs");

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

function getNewId(list) {
    let maxId = 0;
    for (const line of list) {
        if (line.id > maxId) {
            maxId = line.id;
        }
    }

    return maxId + 1;
}

app.get("/", (req, res) => {
    res.render("home", { tasks });
});

app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((c) => c.id === id);

    if (tasks[taskIndex].done === true) {
        tasks[taskIndex].done = false;
    } else {
        tasks[taskIndex].done = true;
    }

    // console.log(tasks[id - 1]);

    res.redirect("/");
});

app.get("/:id/del", (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((c) => c.id === id);

    tasks.splice(tasks[taskIndex], 1);

    // console.log(tasks);

    res.redirect("/");
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
