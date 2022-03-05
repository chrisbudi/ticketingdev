import request from "supertest";
import { app } from "../../app";

it("fails when a email does not exist is supplied", async () => {
    await request(app).post("/api/users/signin")
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(400);
});

it("fails when an incorrect a password is supplied", async () => {
    await request(app).post("/api/users/signup")
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(201);

    await request(app).post("/api/users/signin")
        .send({
            email: 'test@test.com',
            password: '12345'
        })
        .expect(400);
});


it("response with a cookie when given valid credential", async () => {
    await request(app).post("/api/users/signup")
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(201);

    const response = await request(app).post("/api/users/signin")
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();

});