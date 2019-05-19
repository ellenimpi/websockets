//server side javascript
var express = require('express'); //express is a function
var socket = require('socket.io');

var app = express(); //express app setup
var server = app.listen(5000, function(){
    console.log("listening to request on 5000");
});

app.use(express.static("public"));

//this file is like the "server" and the files in public folder are the clientside
//use websockets on both the serverside and the clientside

//socket setup
var io = socket(server); //socket.io works with the server

io.on('connection', function(socket){
    console.log("made socket connection", socket.id);

    socket.on("chat", function(data){
        io.sockets.emit("chat", data);
    })

    socket.on("typing", function(data){
        //broadcasted by this singular socket
        socket.broadcast.emit("typing", data);
        //only other sockets will get this
    })
});