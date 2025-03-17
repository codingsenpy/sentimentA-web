const path=require("path")

exports.sendForm=(req,res)=>{
    console.log("forms controller")
    res.sendFile(path.join(__dirname,'../','views','form.html'))
}