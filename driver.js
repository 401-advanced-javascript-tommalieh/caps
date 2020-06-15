'use strict';

// const events = require('./events.js');
require('dotenv').config();

const net = require('net');

const client = new net.Socket();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

client.connect(PORT, HOST, () => {
    console.log('connected to server from driver');

    client.on('data', (serverData) => {
        // console.log('What we got from the server', serverData, JSON.parse(serverData));
        const parsedServerData = JSON.parse(serverData.toString().trim());
        // console.log(`driver parsed ${parsedServerData.payload}`);
        if (parsedServerData.event === 'pickup') {
            setTimeout(function () {
                const payloadD = parsedServerData.payload;
                console.log(`picking up ${payloadD.orderId}`);
                const message = JSON.stringify({ event: "in-transit", time: new Date(), payload: payloadD });
                client.write(message);
                setTimeout(function () {
                    const message = JSON.stringify({ event: "delivered", time: new Date(), payload: parsedServerData.payload });
                    client.write(message);
                console.log(`delivered ${payloadD.orderId}`);
                }, 3000);
            }, 1000);
        }
    })

})



// events.on('pickup', (order) => {
//     setTimeout(function pickedToTransit() {
//         console.log(`DRIVER: picked up ${order.orderId}`);
//         events.emit('in-transit', order);
//         setTimeout(function delivered() {
//             // console.log('delivered');
//             events.emit('delivered', order);
//         }, 3000);
//     }, 1000);
// });



