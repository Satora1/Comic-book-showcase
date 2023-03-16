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
        return res.status(404).json({ error: "user not found" })
        //TODO pop-up - wprowadzono błędne dane
      }
      if (user) {
        return res.status(200).json(user)
      }
      else {
        return res.status(403).json({ error: "forbiden" })
      }
    } catch {
      console.log(error)
    }
  }
}

module.exports = new LogActions();