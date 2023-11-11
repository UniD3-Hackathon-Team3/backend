const app = require('express')();
const { Server } = require('socket.io');

async function server(){
    const http = require('http').createServer(app);
    const io = new Server(http, {transports: ['websocket']});
    const roomName = 'dogfoot';
    io.on('connection', (socket) => {
        console.log('User connected');
        socket.on('disconnect', () => {
            console.log('User disconnected');
          });
          
        socket.on('join', () =>{
            socket.join(roomName);
            socket.to(roomName).emit('joined');
        });
        socket.on('offer', (offer) => {
            console.log('Offer received:', offer);
            socket.to(roomName).emit('offer', offer);
        });
        socket.on('answer', (answer) => {
            console.log('Answer received:', answer);
            socket.to(roomName).emit('answer', answer);
        });
        socket.on('ice', (ice) => {
            console.log('ICE candidate received:', candidate);
            socket.to(roomName).emit('ice', ice);
        });

    });
    http.listen(3000, () => console.log('server open !!'));
}

server();