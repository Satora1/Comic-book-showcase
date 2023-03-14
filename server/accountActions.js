const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  nick: String
});

const Model = mongoose.model("ActionsLog", schema);

class ActionsLog {
  async saveAccount(req, res) {
    const { name, surname, email, nick } = req.body;
    const log = new Model({ name, surname, email, nick });
    await log.save();
    res.json(log);
  }

  async getAllAccounts(req, res) {
    const logs = await Model.find({});
    console.log(logs);
    res.json(logs);
  }

  async getOneAccount(req, res) {
    const { nick } = req.params;
    const log = await Model.findOne({ nick });
    res.json(log);
  }
}

module.exports = new ActionsLog();