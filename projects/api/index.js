const app = require("express")();
const bodyParser = require('body-parser')
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { spawn } = require('child_process');

const { Person, Meeting } = require('./model');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const currentMeeting = new Meeting({
  duration: 1000 * 60 * 3 // 3m
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/meeting/join', (req, res) => {
  const person = new Person({ ...req.body });
  currentMeeting.addPerson(person);
  io.emit('meeting:person-joined', person);
  res.status(200).end();
});

app.post('/meeting/start', (req, res) => {
  currentMeeting.start();
  io.emit('meeting:started', currentMeeting.startedAt);
  res.status(200).end();
});

app.post('/fire', (req, res) => {
  const process = spawn(__dirname + '/bin/missilelauncher');
  process.on('')
  process.on('data', data => console.log(data));
  process.on('error', () => res.status(500));
  process.on('close', () => res.status(200));

});

io.on("connection", socket => {
  socket.emit('meeting', currentMeeting);
});

http.listen(process.env.PORT || 3000);
