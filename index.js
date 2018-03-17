var express = require('express');
var socket = require('socket.io');

// APP SETUP
var app = express();

const port= process.env.PORT || 8080;

var server = app.listen(port,function(){
	console.log('listening to requests on port 8080');
});

// STATIC FILES
app.use(express.static('public'));

//SOCKET SETUP & PASS SERVER

var io = socket(server);

io.on('connection',(socket)=>{
	console.log('made socket connection',socket.id);
	
	//HANDLE CHAT EVENTS
	socket.on('chat',function(data){
		//console.log(data);
		io.sockets.emit('chat',data);
	});	
	//HANDLE TYPING EVENTS
	socket.on('typing',function(data){
		socket.broadcast.emit('typing',data)
	});
});


