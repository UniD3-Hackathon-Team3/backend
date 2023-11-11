const app = require('express')();
const { Server } = require('socket.io');

async function server(){
    const http = require('http').createServer(app);
    const io = new Server(http, {transports: ['websocket']});
    const roomName = 'p2p';

    io.on('connection', (socket) => {
        console.log('User connected');
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('join', () =>{
            console.log('join: ', socket.id);
            socket.join(roomName);
            socket.to(roomName).emit('joined');
        });
        socket.on('offer', (offer) => {
            console.log('Offer received:', socket.id);
            socket.to(roomName).emit('offer', offer);
        });
        socket.on('answer', (answer) => { // offer를 보낸 
            console.log('Answer received:', socket.id);
            socket.to(roomName).emit('answer', answer);
        });
        socket.on('ice', (ice) => {
            console.log('ICE candidate received:', socket.id);
            socket.to(roomName).emit('ice', ice);
        });

        socket.on('iceConnectionStateChange', () => {
            console.log('ICE Connection State:', socket.id, socket.conn.iceConnectionState);
        });
    

    });
    http.listen(3000, () => console.log('server open!'));
}

server();