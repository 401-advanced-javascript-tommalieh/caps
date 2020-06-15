'use strict';

require('dotenv').config();

const net = require('net');
const uuidv4 = require('uuid').v4;

const PORT = process.env.PORT || 3000;
const server = net.createServer();

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

const socketPool = {};

server.on('connection', (socket) => {
    const socketID = `socket-${uuidv4()}`;
    socketPool[socketID] = socket;
    socket.on('data', (buffer) => dispatchEvent(buffer));

    socket.on('error', (err) => {
        console.log(`socket error ${err.message}`);
    });

    socket.on('end', (err) => {
        delete socketPool[socketID];
    })
});

function dispatchEvent(buffer){
    // console.log('Buffer', JSON.parse(buffer));
    const message = JSON.parse(buffer.toString().trim());
    if(message.event && message.payload){
    broadCast(message);
}
}

function broadCast(message){
    console.log('message', message);
    const payload = JSON.stringify(message);
    // console.log('payload', payload);
    for(let socket in socketPool){
        socketPool[socket].write(payload);
    }
}

server.on('error', (err) =>{
    console.log(`server error`, err.message)
})





// const events = require('./events.js');
// events.on('pickup', (order) => logEvent('pickup', order));
// events.on('in-transit', (order) => logEvent('in-transit', order));
// events.on('delivered', (order) => logEvent('delivered', order));

// function logEvent(event, order){
//     const eventData = {
//         event: event,
//         time: new Date(),
//         payload:{order}
//     }
//     console.log('Event', eventData);
// }

// require('./vendor.js');
// require('./driver.js');


