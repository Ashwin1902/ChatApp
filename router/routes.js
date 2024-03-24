const express = require('express');
const router=express.Router();
const {join}=require('node:path');
const {Server} = require("socket.io");

router.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'../home.html'))
})
let obj={
    "name":"",
    "topic":""
}
 router.post('/main',async (req,res)=>{
    console.log("page render");
    obj=req.body;
    res.render('../index.ejs',{
          obj
    });
 })
 function getObj(){
    return obj;
}
module.exports={
    router,
    getObj
}