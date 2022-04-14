import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: "asdf",
            price: 20
        });

};

it('returns a 404 if the provide id does not exist', async () => {
    const id = new mongoose.Types.ObjectId();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: "asdf",
            price: 20
        }).expect(404);

});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: "asdf",
            price: 20
        }).expect(401);

    // console.log(res);
});

it('returns a 401 if the user does not own the ticket', async () => {
    const res = await request(app)
        .post(`/api/tickets`)
        .set("Cookie", global.signin())
        .send({
            title: "asdfg",
            price: 20
        });



    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", global.signin())
        .send({
            title: "rewsdfsdfs",
            price: 10000
        }).expect(401);
});

it('returns a 400 if the user provide an invalid title or price', async () => {
    const cookie = global.signin();
    const res = await request(app)
        .post(`/api/tickets`)
        .set("Cookie", cookie)
        .send({
            title: "asdfg",
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "",
            price: 20
        }).expect(400);

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "122",
            price: -10
        }).expect(400);

});

it('update the ticket provide valid input', async () => {
    const cookie = global.signin();
    const res = await request(app)
        .post(`/api/tickets`)
        .set("Cookie", cookie)
        .send({
            title: "asdfg",
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "new title",
            price: 100
        }).expect(200);
    const ticketResponse = await request(app)
        .get(`/api/tickets/${res.body.id}`)
        .send({});

    expect(ticketResponse.body.title).toEqual('new title');
    expect(ticketResponse.body.price).toEqual(100);
});