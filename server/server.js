const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');

const publicPath = path.join(__dirname,'../public');
console.log(publicPath);
var app = express();
var server = http.createServer(app);
const port = process.env.PORT || 3000;

var io = socketIo(server);

io.on('connection',(socket)=>{
  console.log(`Connected to client ${socket}`);

    socket.emit('newMessage',{
      from:'Admin',
      text:'Welcome to chat app'
    });

  socket.broadcast.emit('newMessage',{
    from:'Admin',
    text:'New user joined'
  });

  socket.on('createMessage',(data,callback)=>{
    io.emit('newMessage',{
      from:data.from,
      text:data.text,
      createdAt:new Date().getTime()
    });
    callback();
  });

});

app.use(express.static(publicPath));


server.listen(port,()=>{
  console.log(`Server is up and running in ${port}`);
});
