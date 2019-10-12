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
  constructor({ duration }) {
    this.startedAt = null;
    this.duration = duration;
    this.persons = [];
    this.bsCounter = 0;
  }

  start() {
    this.startedAt = new Date();
  }

  addPerson(person) {
    this.persons.push(person);
  }

  incrementBsCounter() {
    this.bsCounter++;
  }

  getTotalPrice() {
    return this.persons.reduce((acc, person) => person.getPrice(this) + acc, 0);
  }
}

module.exports = {
  Meeting,
  Person,
};
