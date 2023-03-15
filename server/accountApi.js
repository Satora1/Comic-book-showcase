const exprees = require("express")
const LOGS = exprees.Router()
const LogActions = require("./accountActions")


LOGS.post("/login", LogActions.getYourAccount)//get to your 
//LOGS.get("/log",LogActions.getAllAccounts)//see all
LOGS.post("/log", LogActions.saveAccount)//save



module.exports = LOGS