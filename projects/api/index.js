const express = require("express");
const app = require("express")();
const bodyParser = require("body-parser");
const request = require("request");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { Person, Meeting } = require("./model");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const FRONT_PATH = __dirname + "/../front";
const SCUD_LAUNCHER_ADDR = "http://192.168.1.44:9999";

// In memory Meeting
const currentMeeting = new Meeting({
  duration: 1000 * 60 * 3, // 3m
});

app.use(express.static(FRONT_PATH));

app.get("/", (req, res) => {
  res.sendFile(FRONT_PATH + "/index.html");
});

app.get("/costs", (req, res) => {
  console.log(currentMeeting)
  costs = {
    total : currentMeeting.getTotalPrice().toFixed(0),
    costPerPerson : currentMeeting.persons.map(person => ({
      name : person.name,
      totalCost : person.getPrice(currentMeeting).toFixed(0)
    }))
  }
  console.log(costs)
  res.send(costs);
});

app.post("/meeting/join", (req, res) => {
  const person = new Person({ ...req.body });
  currentMeeting.addPerson(person);
  io.emit("meeting:person-joined", person);
  res.status(200).end();
});

app.post("/meeting/start", (req, res) => {
  currentMeeting.start();
  io.emit("meeting:started", currentMeeting.startedAt);
  setInterval(() => {
    io.emit("meeting:total-price", currentMeeting.getTotalPrice());
  }, 1000);
  res.status(200).end();
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
