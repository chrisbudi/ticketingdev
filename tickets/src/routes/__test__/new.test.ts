import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";


it('has a route handler listening to /api/tickets to post a request', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user sign in', async () => {
    // const response =
    await request(app)
        .post('/api/tickets')
        .send({}).expect(401);
    // expect(response.status).toEqual(401);
});


it('returns a status other than 401 when signed in', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({});

    // console.log(response.status, "status code");
    expect(response.status).not.toEqual(401);
});

it('return error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set("Cookie", global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set("Cookie", global.signin())
        .send({
            price: 10
        })
        .expect(400);

});

it('return error if an invalid price is provided', async () => {

    await request(app)
        .post('/api/tickets')
        .set("Cookie", global.signin())
        .send({
            title: '123124',
            price: -10
        })
        .expect(400);


    await request(app)
        .post('/api/tickets')
        .set("Cookie", global.signin())
        .send({
            title: '123123'
        })
        .expect(400);
});

it('create a ticket with valid inputs', async () => {
    // add in a check to make sure a ticket was saved
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'asdasdas';
    await request(app)
        .post('/api/tickets')
        .set("Cookie", global.signin())
        .send({
            title,
            price: 20
        });

    tickets = await Ticket.find({});
    // console.log(tickets);
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);


});
