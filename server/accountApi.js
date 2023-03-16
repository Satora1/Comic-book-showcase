const exprees = require("express")
const LOGS = exprees.Router()
const LogActions = require("./accountActions")


LOGS.post("/login", LogActions.login)//get to your 
//LOGS.get("/log",LogActions.getAllAccounts)//see all
LOGS.post("/register", LogActions.register)//save



module.exports = LOGS