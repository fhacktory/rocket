// 200 = working days per year
// 7 = working hours per day
const getPricePerSecond = salary => salary / 200 / 7 / 60 / 60;

class Person {
  constructor({ id, name, salary }) {
    this.id = id;
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

  getRemainingTime() {
    const startDate = new Date(this.startedAt).getTime() / 1000
    const now = new Date().getTime() / 1000
    const endDate = startDate + (this.duration / 1000)
    const remaining = (endDate - now) / 60
    return {
      floatMin: remaining, 
      minutes: (''+remaining).split('.')[0],
      seconds: (''+(+(''+remaining).split('.')[1].substr(0,2) * 60 / 100)).split('.')[0]
    }
  }
}

module.exports = {
  Meeting,
  Person,
};
