import { Message } from "node-nats-streaming";
import { Listener } from "../../../common/src/events/base-listener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketListeningClass extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = "payment-service";
    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log('event data!', data);
        msg.ack();
    }
}