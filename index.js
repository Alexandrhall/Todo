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
    // let string = JSON.stringify(tasks);

    // string = JSON.parse("[" + string + "]");

    // console.log(string);
    // console.log(tasks);

    res.render("home", { tasks });
});

app.get("/checked/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.find((c) => c.id === id);

    taskIndex.done = !taskIndex.done;

    res.redirect("/");
});

app.get("/:id/del", (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((c) => c.id === id);

    tasks.splice(taskIndex, 1);

    res.redirect("/");
});

app.post("/", (req, res) => {
    const id = getNewId(tasks);
    let dateNow = JSON.stringify(new Date());

    if (req.body.description != "") {
        const newTask = {
            id: id,
            created: dateNow,
            description: req.body.description,
            done: false,
        };

        tasks.push(newTask);
    }

    res.redirect("/");
});

app.get("/show", (req, res) => {
    res.redirect(req.query.showDone);
});

app.get("/show/done", (req, res) => {
    res.render("done-list", { tasks });
});

app.get("/show/undone", (req, res) => {
    res.render("undone-list", { tasks });
});

app.get("/sort", (req, res) => {
    res.redirect(req.query.sortList);
});

app.get("/sort/name", (req, res) => {
    tasks.sort(function (a, b) {
        let nameA = a.description.toUpperCase();
        let nameB = b.description.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    res.redirect("/");
});

app.get("/sort/dateold", (req, res) => {
    tasks.sort(function (a, b) {
        let nameA = a.created;
        let nameB = b.created;
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    res.redirect("/");
});

app.get("/sort/datefirst", (req, res) => {
    tasks.sort(function (a, b) {
        let nameA = a.created;
        let nameB = b.created;
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        return 0;
    });
    res.redirect("/");
});

app.get("/:id/edit", (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.find((c) => c.id === id);

    res.render("edit-name", { tasks, taskIndex });
});

app.post("/:id/edit", (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.find((c) => c.id === id);

    console.log(req.body.description);

    if (req.body.description != "") {
        taskIndex.description = req.body.description;
    }

    res.redirect("/");
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
