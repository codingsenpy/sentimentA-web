const express=require("express")
const path=require("path")
const router=express.Router()

const formpage=require("../controllers/forminfo")

router.use("",formpage.sendForm)


module.exports=router