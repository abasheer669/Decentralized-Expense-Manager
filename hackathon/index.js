var express = require('express');
var socket = require('socket.io');
// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
const peers = {};
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    // Handle chat event
    socket.on('make-connection', function(data){
        peers[socket.id] = {"email": data.email, "key": data.key};
    });

    socket.on('share-data', function(data){
        for(const [key, value] of Object.entries(peers))
            if(key !== socket.id && value.email === data.email && value.key === data.key){
                io.to(key).emit('data', data.msg);
            }
    })

    socket.on('remove', function(data){
        delete peers[socket.id];        
    })

});