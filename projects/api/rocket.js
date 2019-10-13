const request = require("request");

const SCUD_LAUNCHER_ADDR = "http://192.168.1.44:9999";

module.exports = {
  launchRocket: (req, res) => {
    request
      .get(SCUD_LAUNCHER_ADDR + "/fire?length=1")
      .on("response", () => {
        res.status(200).end();
      })
      .on("error", () => res.status(500).end());
  }
};
