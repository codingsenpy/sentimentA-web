const express=require("express")
const path=require("path")
const homepage=require("../controllers/homepage")

const router=express.Router()

router.get("",homepage.getVidDetails)

module.exports=router