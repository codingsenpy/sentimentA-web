const express=require("express")
const path=require("path")
const app=express()
const mainroutes=require('./routes/main')
const formroutes=require('./routes/form')

app.use("/main",mainroutes)
app.use("/form",formroutes)
app.use(express.static(path.join(__dirname,"public")))

app.listen(5000,console.log("Server running from port 5000"))