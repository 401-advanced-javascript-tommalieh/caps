'use strict';

const events = require('./events.js');
events.on('pickup', (order) => logEvent('pickup', order));
events.on('in-transit', (order) => logEvent('in-transit', order));
events.on('delivered', (order) => logEvent('delivered', order));

function logEvent(event, order){
    const eventData = {
        event: event,
        time: new Date(),
        payload:{order}
    }
    console.log('Event', eventData);
}

require('./vendor.js');
require('./driver.js');


