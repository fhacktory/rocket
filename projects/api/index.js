const express = require("express");
const app = require("express")();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const Rocket = require('./rocket');

const { Person, Meeting } = require("./model");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const FRONT_PATH = __dirname + "/../web";

// In memory Meeting
let currentMeeting;
let broadcasting;

app.use(express.static(FRONT_PATH, { maxAge: 0 }));

app.get("/", (req, res) => {
  res.sendFile(FRONT_PATH + "/index.html");
});

app.get("/watch/state", (req, res) => {
  const watchState = {
    totalCost: currentMeeting.getTotalPrice().toFixed(2),
    persons: currentMeeting.persons.map(person => ({
      id: person.id,
      name: person.name,
      totalCost: person.getPrice(currentMeeting).toFixed(2),
    })),
    bullshitCounter: currentMeeting.bsCounter,
  };
  res.send(watchState);
});

/**
 * res: { duration } in minutes
 */
app.post('/meeting', (req, res) => {
  clearInterval(broadcasting);
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

// app.post("/meeting/join", (req, res) => {
//   const person = currentMeeting.persons.find(person => person.id === req.body.id)
//   io.emit("meeting:person-joined", person);
//   res.status(200).end();
// });

app.post("/meeting/start", (req, res) => {
  currentMeeting.start();
  io.emit("meeting:started", currentMeeting.startedAt);

  // broadcast every seconds 😈
  broadcasting = setInterval(() => {
    io.emit("meeting:state", {
      remaining: currentMeeting.getRemainingTime(),
      price: currentMeeting.getTotalPrice(),
    });
    if (currentMeeting.getRemainingTime() <= 0) {
      Rocket.launchRocket(req, res);
      clearInterval(broadcasting);
    }
  }, 1000);
  res.status(200).end();
});

app.post("/bs", (req, res) => {
  currentMeeting.incrementBsCounter();
  Rocket.launchRocket(req, res);
});

app.post("/fire", Rocket.launchRocket);

// io.on("connection", socket => {
//   socket.emit("meeting", currentMeeting);
// });

http.listen(process.env.PORT || 3000);
