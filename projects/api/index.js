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
  const remaining = currentMeeting.getRemainingTime()
  const watchState = {
    remainingTime: remaining.minutes + ':' + remaining.seconds,
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
    new Person({ id: 1, name: 'Aglaé Bernard', salary: 40000 }),
    new Person({ id: 2, name: 'Anthony Roani', salary: 40000 }),
    new Person({ id: 3, name: 'Benoit Caron', salary: 40000 }),
    new Person({ id: 4, name: 'Bilal Benlarbi', salary: 40000 }),
    new Person({ id: 5, name: 'Clément Nonn', salary: 40000 }),
    new Person({ id: 6, name: 'David Liodenot', salary: 40000 }),
    new Person({ id: 6, name: 'Donovan Fournier', salary: 40000 }),
    new Person({ id: 7, name: 'Ghita Laoud', salary: 40000 }),
    new Person({ id: 8, name: 'Julien Hennet', salary: 40000 }),
    new Person({ id: 9, name: 'Loic Billaud', salary: 40000 }),
    new Person({ id: 10, name: 'Marie-Sophie Pascal', salary: 40000 }),
    new Person({ id: 11, name: 'Mattthias Lao', salary: 40000 }),
    new Person({ id: 12, name: 'Nicolas Lebrun', salary: 40000 }),
    new Person({ id: 13, name: 'Nicolas Rivière', salary: 40000 }),
    new Person({ id: 14, name: 'Pauline Montchau', salary: 40000 }),
    new Person({ id: 15, name: 'Sylvain Laure', salary: 40000 }),
    new Person({ id: 16, name: 'Vincent Pradeilles', salary: 40000 })
  ];
  persons.forEach(person => currentMeeting.addPerson(person));
  res.status(200).end();
});

app.get('/persons', (req, res) => {
  res.send(currentMeeting.persons)
});

app.post("/meeting/start", (req, res) => {
  currentMeeting.start();
  io.emit("meeting:started", currentMeeting.startedAt);

  // broadcast every seconds 😈
  broadcasting = setInterval(() => {
    io.emit("meeting:state", {
      remaining: currentMeeting.getRemainingTime(),
      price: currentMeeting.getTotalPrice(),
    });
  }, 1000);
  res.status(200).end();
});

app.post("/bs", (req, res) => {
  currentMeeting.incrementBsCounter();
  Rocket.launchRocket(req, res);
});

app.post("/fire", Rocket.launchRocket);

http.listen(process.env.PORT || 3000);
