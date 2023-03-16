const exprees = require("express")
const LOGS = exprees.Router()
const LogActions = require("./accountActions")


LOGS.post("/login", LogActions.login)
LOGS.delete("/login", LogActions.deleteAccount)
LOGS.post("/register", LogActions.register)



module.exports = LOGS