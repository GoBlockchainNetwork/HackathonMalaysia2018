var express = require('express');
var app = express();
var path = require('path')
var server = require('http').Server(app);
// var https = require('https');
var bodyParser     =        require("body-parser");
var fs = require('fs');

// const port = 443;

// var certOptions = {
//   key: fs.readFileSync(path.resolve('cert/server.key')),
//   cert: fs.readFileSync(path.resolve('cert/server.crt'))
// }

// var server = https.createServer(certOptions,app)
var io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dataFromServer = {
 msg: 'You are connected!'

}

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log("App is running on port " + port);
});

// WARNING: app.listen(80) will NOT work her
app.use(express.static(__dirname + '/public'));


var lol,loc,ts;


io.on('connection', function (socket) {
  console.log('Client '+ socket.id + ' is connected');

  socket.emit('fromServer', dataFromServer);

  socket.on('fromClient', function (data) {
    lol = data.img
    loc = data.loc

  });
});

app.get('/fetch', function(request, response){
  console.log( request.ip +' fetching footage from server...');   // your JSON
  response.send(lol+'*'+loc);    // echo the result back
  // response.send(loc);
});
