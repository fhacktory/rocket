const express = require("express");
const app = require("express")();
const bodyParser = require("body-parser");
const request = require("request");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { Person, Meeting } = require("./model");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const FRONT_PATH = __dirname + "/../web";
const SCUD_LAUNCHER_ADDR = "http://192.168.1.44:9999";

// In memory Meeting
let currentMeeting;

app.use(express.static(FRONT_PATH, { maxAge: 0 }));

app.get("/", (req, res) => {
  res.sendFile(FRONT_PATH + "/index.html");
});

app.get("/costs", (req, res) => {
  costs = {
    total: currentMeeting.getTotalPrice().toFixed(0),
    costPerPerson: currentMeeting.persons.map(person => ({
      name: person.name,
      totalCost: person.getPrice(currentMeeting).toFixed(0),
    })),
    bullshitCounter: currentMeeting.bsCounter,
  };
  res.send(costs);
});

/**
 * res: { duration } in minutes
 */
app.post('/meeting', (req, res) => {
  currentMeeting = new Meeting({
    duration: req.body.duration * 1000 * 60
  });
  const persons = [
    new Person({ id: 1, name: 'Nicolas', salary: 60000 }),
    new Person({ id: 2, name: 'Adrien', salary: 88000 }),
    new Person({ id: 3, name: 'Edouard', salary: 70000 }),
  ];
  persons.forEach(person => currentMeeting.addPerson(person));
  res.status(200).end();
});

app.get('/persons', (req, res) => {
  res.send(currentMeeting.persons)
});

app.post("/meeting/join", (req, res) => {
  const person = currentMeeting.persons.find(person => person.id === req.body.id)
  io.emit("meeting:person-joined", person);
  res.status(200).end();
});

app.post("/meeting/start", (req, res) => {
  currentMeeting.start();
  io.emit("meeting:started", currentMeeting.startedAt);

  // 😈 broadcast every seconds the total price
  setInterval(() => {
    io.emit("meeting:state", {
      price: currentMeeting.getPercents(),
      percents: currentMeeting.getPercents(),
    });
  }, 1000);
  res.status(200).end();
});

app.post("/bs", (req, res) => {
  currentMeeting.incrementBsCounter();
  request
    .get(SCUD_LAUNCHER_ADDR + "/fire?length=1")
    .on("response", () => {
      res.status(200).end();
    })
    .on("error", () => res.status(500).end());
});

app.post("/fire", (req, res) => {
  request
    .get(SCUD_LAUNCHER_ADDR + "/fire?length=1")
    .on("response", () => {
      res.status(200).end();
    })
    .on("error", () => res.status(500).end());
});

io.on("connection", socket => {
  socket.emit("meeting", currentMeeting);
});

http.listen(process.env.PORT || 3000);
