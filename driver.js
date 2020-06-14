'use strict';

const events = require('./events.js');

events.on('pickup', (order) => {
    setTimeout(function pickedToTransit() {
        console.log(`DRIVER: picked up ${order.orderId}`);
        events.emit('in-transit', order);
        setTimeout(function delivered() {
            // console.log('delivered');
            events.emit('delivered', order);
        }, 3000);
    }, 1000);
});



