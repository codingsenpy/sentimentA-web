const path=require("path")

exports.getVidDetails=(req,res)=>{
    console.log("main js running")
    res.sendFile(path.join(__dirname,'../','views','index.html'))
}