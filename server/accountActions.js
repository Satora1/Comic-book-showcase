const mongoose = require("mongoose");
const bcrypt =require("bcrypt")

const schema = new mongoose.Schema({
  email: String,
  nick: String,
  password: String
});

const LOGIN = mongoose.model("ActionsLog", schema);

class LogActions {
  async register(req, res) {
    console.log(req.body);
    const { email, nick, password } = req.body;
    const sameNick = await LOGIN.findOne({ nick: req.body.nick });
    const sameEmail = await LOGIN.findOne({ email: req.body.email });
    if (sameNick) { res.json("Nickname already in use"); }
    else if (sameEmail) { res.json("Email already in use"); }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const log = new LOGIN({ email, nick, password: hashedPassword });
      await log.save();
      res.json("user created");
    }
  }
  
  async login(req, res) {
    try {
      const { nick, password } = req.body;
      const user = await LOGIN.findOne({ nick });
      if (!user) {
        res.json("user not found");
        return;
      }
      const isMatch = bcrypt.compare(password, user.password);
      if (isMatch) {
        res.json(["user found", user]);
      } else {
        res.json("user not found");
      }
    } catch (error) {
      console.error(error);
      res.json("an error occurred");
    }
  }
  
  
  async deleteAccount(req, res) {
    console.log(req.body)
      await LOGIN.deleteOne({ nick: req.body.nick })
        .then(account => {
          res.json(account);
        })
        .catch(error => {
          console.error(error);
        });
    }


}



module.exports = new LogActions();