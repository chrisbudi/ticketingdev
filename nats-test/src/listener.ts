import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

console.clear();


stan.on('connect', () => {
    console.log('Listener connected to NATS');


    const subscription = stan.subscribe('ticket:created');

    subscription.on('message', (msg: Message) => {
        // console.log(msg);

        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Receive event #${msg.getSequence()} with data: ${data}`);
        }
    });
});