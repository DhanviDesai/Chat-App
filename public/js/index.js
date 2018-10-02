  var socket = io();
  socket.on('connect',function(){
    console.log('Connected to the server');

    });

    socket.on('newMessage',function(data){
      console.log(data);

      var li = jQuery('<li></li>');
      li.text(`${data.from} : ${data.text}`);
      jQuery('#messages').append(li);
    });

    socket.on('newLocation',function(data){
      console.log(data);

      var li = jQuery('<li></li>');
      li.text(`${data.from}`);
      jQuery('#messages').append(li).append(`<a href="${data.link}" target="_blank">Location</a>`);
    });



    jQuery("#message-form").on('submit',function(e){
      e.preventDefault();

      socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=firstname]').val()
      },function(){

      });
    });

    function getLocation() {

      if(!navigator.geolocation){
        return alert('Navigation not supported');
      }
      navigator.geolocation.getCurrentPosition(function(location){
        console.log(`Longitude:${location.coords.longitude},
          Latitude:${location.coords.latitude}`);
          socket.emit('shareLocation',{
            from:'User',
            latitude:location.coords.latitude,
            longitude:location.coords.longitude
          },function(){

          });
      },function(e){
        alert('Unable to get location');
      });
    }
