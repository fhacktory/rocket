const app = require("express")();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { execSync } = require("child_process");

const { Person, Meeting } = require("./model");

const missileLauncher = command =>
  execSync("sudo " + __dirname + "/bin/missilelauncher " + command);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const currentMeeting = new Meeting({
  duration: 1000 * 60 * 3, // 3m
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
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
  res.status(200).end();
});

app.post("/fire", (req, res) => {
  missileLauncher('fire');
  res.end();
});

io.on("connection", socket => {
  socket.emit("meeting", currentMeeting);
});

http.listen(process.env.PORT || 3000);
