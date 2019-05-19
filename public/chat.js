//clientside javascript

var socket = io.connect('http://localhost:5000');

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    button = document.getElementById('send'),
    feedback =document.getElementById('feedback'),
    output = document.getElementById('output');

button.addEventListener('click', function(){
    socket.emit('chat',{
        handle: handle.value,
        message: message.value
    })
    message.value = '';
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})


//listening for events
socket.on("chat", function(data){
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function(data){
    feedback.innerHTML = "<p>" + data + " is typing a message</p>";
});