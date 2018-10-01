  var socket = io();
  socket.on('connect',function(){
    console.log('Connected to the server');
    });

    socket.on('newUser',function(data){
      console.log(data);
    });
