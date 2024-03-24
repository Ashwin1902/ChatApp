const exp = require('constants');
const express = require('express');
const app=express();
const {Server} = require("socket.io");
const { router, getObj} = require('./router/routes.js');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs')

app.get('/sockett.js', function(req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(__dirname + '/sockett.js');
  });
  

const server=app.listen(3000,()=>{
    console.log("server is up");
})
const io=new Server(server,{
    connectionStateRecovery: {}
});
//module.exports=io;
app.use('/',router);

io.on('connection',async (socket)=>{
    console.log("io ka connection");
    //console.log("a user connected");
    //const {obj}=require('./router/routes.js');
    const obj=getObj();
    console.log(obj);
    socket.join(obj.topic);
    io.to(obj.topic).emit('chat message ', `welcome, ${obj.name}`)
    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })
    socket.on('chat message ',async (msg)=>{
      io.to(obj.topic).emit('chat message ',msg)
    })
})

// io.on('connection',(socket)=>{
//     socket.on('chat message ',(msg)=>{
//         console.log(msg);
//     })
// })



