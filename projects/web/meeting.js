export default {
  create({ duration }) {
    axios.post("/meeting", {
      duration,
    });
  },
  getPersons() {
    return axios.get('/persons').then(response => response.data)
  },
  join({name, salary}) {
    axios
      .post("/meeting/join", {
        name,
        salary,
      });
  },
  start() {
    axios.post("/meeting/start");
  },
};
