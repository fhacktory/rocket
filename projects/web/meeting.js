export default {
  create({ duration }) {
    axios.post("/meeting", {
      duration,
    });
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
