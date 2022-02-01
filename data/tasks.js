let date = new Date().toISOString();

const tasks = [
    { id: 1, created: date, disc: "Äta", done: false },
    { id: 2, created: date, disc: "Sova", done: false },
    { id: 3, created: date, disc: "Koda", done: false },
    { id: 4, created: date, disc: "Springa", done: false },
];

exports.module = tasks;
