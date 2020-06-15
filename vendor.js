'use strict';

require('dotenv').config();
// const events = require('./events.js');
const faker = require('faker');
const net = require('net');

const client = new net.Socket();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

client.connect(PORT, HOST, () => {
    console.log('connected to server from vendor');

    client.on('data', (serverData) => {
        // console.log('What we got from the server', serverData, JSON.parse(serverData));
        const parsedServerData = JSON.parse(serverData);
        // console.log(`vendor parsed ${parsedServerData}`);
        if(parsedServerData.event === 'delivered'){
            console.log(`thank you for delivering ${parsedServerData.payload.orderId}`);
        }

    });
});

setInterval(createOrder, 5000);

function createOrder(){

    const order = {
        storeName: process.env.STORE_NAME,
        orderId: faker.random.uuid(),
        customerName: faker.name.findName(),
        address: faker.address.city()
    }
    const message = JSON.stringify({event: "pickup", time:new Date(), payload: order});
    // console.log(message);
    client.write(message);
}









// events.on('delivered', (order) => console.log(`VENDOR: Thank you for delivering ${order.orderId}`));

// setInterval(function() {
    
//     const order = {
//         storeName: process.env.STORE_NAME,
//         orderId: faker.random.uuid(),
//         customerName: faker.name.findName(),
//         address: faker.address.city()
//     }
//     events.emit('pickup', order);

// }, 5000);
