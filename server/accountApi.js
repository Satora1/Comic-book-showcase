const exprees= require("express")
const LOGS=exprees.Router()
const LogActions=require("./accountActions")


LOGS.get("/log/:id",LogActions.getOneAccount)//get to your 
LOGS.get("/log",LogActions.getAllAccounts)//see all
LOGS.post("/log",LogActions.saveAccount)//save



module.exports =LOGS