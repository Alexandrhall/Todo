let dateNow = JSON.stringify(new Date());

const tasks = [
    { id: 1, created: dateNow, description: "Äta", done: false },
    { id: 2, created: dateNow, description: "Sova", done: false },
    { id: 3, created: dateNow, description: "Koda", done: true },
    { id: 4, created: dateNow, description: "Springa", done: false },
];

module.exports = tasks;
