const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// 200 = working days per year
// 7 = working hours per day
const getPricePerSecond = salary => salary / 200 / 7 / 60 / 60;

class Person {
  constructor({ name, salary }) {
    this.name = name;
    this.salary = salary;
  }

  getPrice(meeting) {
    const now = new Date().getTime();
    const elapsed = now - meeting.startedAt.getTime();
    return getPricePerSecond(this.salary) * (elapsed / 1000);
  }
}

class Meeting {
  constructor({ duration, persons }) {
    this.startedAt = null;
    this.duration = duration;
    this.persons = persons;
  }

  start() {
    this.startedAt = new Date();
  }

  getTotalPrice() {
    return this.persons.reduce((acc, person) => person.getPrice(this) + acc, 0);
  }
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  const person = new Person({ id: 0, name: "Chirac", salary: 60000 });
  const currentMeeting = new Meeting({
    duration: 1000 * 60 * 60, // 1h
    persons: [person],
  });

  console.log(currentMeeting);

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

http.listen(process.env.PORT || 3000);
