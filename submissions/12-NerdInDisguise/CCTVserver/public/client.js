const socket = io.connect("/");
var data,ts;
var loc = 'the vertical bangsar south cam 1';


  if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true})
    .then(function(stream) {
     // console.log(stream);
    setInterval( function(){
      var video = document.getElementById("videoElement").srcObject = stream;
      setTimeout(function(){
        var context = document.getElementById("canvas").getContext("2d").drawImage(document.getElementById("videoElement"), 0, 0, 500, 375);
        data =  document.getElementById("canvas").toDataURL('image/jpeg', 1.0);
        ts = Date();
        // console.log(img);
        dataFromClient = {
          'img': data,
          'loc': loc +'-'+ ts
        }

        socket.emit('fromClient',dataFromClient);
      },5)


    },20)

    })
    .catch(function(err0r) {
      console.log(err0r);
    });
  }
