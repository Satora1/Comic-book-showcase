const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  nick: String,
  password: String
});

const LOGIN = mongoose.model("ActionsLog", schema);

class ActionsLog {
  async saveAccount(req, res) {
    const { name, surname, email, nick, password } = req.body;
    const log = new LOGIN({ name, surname, email, nick, password });
    await log.save();
    res.json(log);
  }

  /* async getAllAccounts(req, res) {
    const logs = await LOGIN.find({});
    console.log(logs);
    res.json(logs);
  } */

  async getYourAccount(req, res) {
    try {
      const user = await LOGIN.findOne({ nick: req.body.nick })
      if (!user) {
        res.status(404).json({ error: "user not found" })
      }
      if (user.password === req.body.password) {
        res.status(200).json(user)
      }
      else {
        res.status(403).json({ error: "forbiden" })
      }

    } catch {
      res.send("wrong details")
    }
  }
}

module.exports = new ActionsLog();