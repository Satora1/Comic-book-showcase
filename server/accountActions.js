const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  nick: String,
  password: String
});

const LOGIN = mongoose.model("ActionsLog", schema);

class LogActions {
  async register(req, res) {
    const { email, nick, password } = req.body;
    const log = new LOGIN({ email, nick, password });
    await log.save();
    res.json(log);
  }

  async login(req, res) {
    try {
      const user = await LOGIN.findOne({ nick: req.body.nick, password: req.body.password })
      console.log(user)
      if (!user) {
        res.json("user not found")
      }
      if (user) {
        res.json(["user found", user])
      }
    } catch {
      console.error()
    }
  }
}

module.exports = new LogActions();