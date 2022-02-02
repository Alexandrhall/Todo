let dateNow = JSON.stringify(new Date());

const tasks = [
    { id: 1, name: "Äta", date: dateNow, done: false },
    { id: 2, name: "Sova", date: dateNow, done: false },
    { id: 3, name: "Koda", date: dateNow, done: true },
    { id: 4, name: "Springa", date: dateNow, done: false },
];

module.exports = tasks;
