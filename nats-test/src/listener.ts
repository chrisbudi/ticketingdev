import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketListeningClass } from './events/ticket-created-listener';

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

console.clear();


stan.on('connect', () => {
    console.log('Listener connected to NATS');


    stan.on('close', () => {
        console.log("NATS Connection closed !");
        process.exit();
    });

    new TicketListeningClass(stan).listen();
});


process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
