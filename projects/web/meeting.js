export default {
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
