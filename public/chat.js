//MAKE CONNECTION -  CLIENT TO SERVER

var socket = io.connect('/');

var message = document.getElementById('message'),
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');
	
//EMIT EVENTS
	
btn.addEventListener('click',function(){
	socket.emit('chat', {
		message : message.value,
		handle : handle.value
	});
	message.value="";
});

message.addEventListener('keydown' || 'keypress' || 'input' ,function(e){
	
	socket.emit('typing',handle.value);
	
	var key = e.which || e.keyCode;
    if (key === 13) { 
		socket.emit('chat', {
		message : message.value,
		handle : handle.value
	});
	message.value="";
    }
});

/*message.addEventListener('keypress',function(e){
	
	socket.emit('typing',handle.value);
	
	var key = e.which || e.keyCode;
    if (key === 13) { 
		socket.emit('chat', {
		message : message.value,
		handle : handle.value
	});
	message.value="";
    }
	
	
});
message.addEventListener('input',function(e){
	
	socket.emit('typing',handle.value);
	
	var key = e.which || e.keyCode;
    if (key === 13) { 
		socket.emit('chat', {
		message : message.value,
		handle : handle.value
	});
	message.value="";
    }
});*/

//LISTEN FOR EVENTS
socket.on('chat',function(data){
	feedback.innerHTML = '';
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing',function(data){
	feedback.innerHTML = '<p><em>' + data + ' is typing..... </em></p>';
}); 


